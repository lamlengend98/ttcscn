$(document).ready(function () {
    function baseAjax(method, url, param, accesskey) {
        var urlAjax = "http://localhost:8080/api/" + url;
        var response;
        $.ajax({
            method: method,
            url: urlAjax,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + accesskey)
            },
            data: param,
            async: false,
            success: function (success) {
                response = success;
            },
            error: function () {
                response = "error";
            }
        })

        return response;
    }

    function getActivities(response, accesskey) {
        var data = response.data;
        console.log(response)
        var activitiesTable = '<thead>\
                                    <th>ID</th>\
                                    <th>Title</th>\
                                    <th>Content</th>\
                                    <th>Activity time</th>\
                                    <th>Registry time</th>\
                                    <th>Date</th>\
                                    <th>Update Date</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var content = data[i].content;
            var author_id = data[i].author_id;
            var date = data[i].createdAt.substr(0, 10);
            var updatedAt = data[i].updatedAt.substr(0, 10);
            var title = data[i].title
            var regis_status = data[i].regis_status;
            var acti_time = data[i].acti_time_from.substr(0, 10).replace() + " - " + data[i].acti_time_to.substr(0, 10);
            var regis_time = data[i].regis_time_from.substr(0, 10) + " - " + data[i].regis_time_to.substr(0, 10);
            var id = data[i].id;
            var teacherData = baseAjax("GET", "teacher/" + author_id, "", accesskey);
            if (teacherData.data) {
                var teacherName = teacherData.data.first_name + ' ' + teacherData.data.last_name;
            }

            activitiesTable += '<tr>\
                                <td class="activityId">' + id + '</td>\
                                <td style="width: 15%" class="title">' + title + '</td>\
                                <td style="width:40%" class="content">' + content + '</td>\
                                <td>' + acti_time + '</td>\
                                <td>' + regis_time + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
        }
        activitiesTable += '</tbody>';

        $("#activitiesTable").html(activitiesTable);
        $("#activitiesTable").DataTable({})
    }

    var param = {};
    var accesskey = $.cookie('accessKey');
    var response = baseAjax("GET", "activity", '', accesskey);
    getActivities(response, accesskey);

    $(".btn-delete").on("click", function () {
        var id = $(this).closest("tr").find(".activityId").text();
        console.log(id)
        baseAjax("DELETE", "activity/" + id, "", accesskey);
        location.reload();
    });

    $("#btn-add").on("click", function () {
        var teacherData = baseAjax("GET", "teacher/", "", accesskey);
        var option = '<select class="form-control" id="optionAuthor">';
        for (var i = 0; i < teacherData.data.length; i++) {
            var id = teacherData.data[i].id;
            var name = teacherData.data[i].first_name + ' ' + teacherData.data[i].last_name;
            option += '<option value=' + id + '>' + name + '</option>';
        }
        option += '</select>';
        var template = '<div class="form-group"><label>Author</label>\
                          ' + option + '</div>\
                        <div class="form-group"><label>Title</label>\
                        <input type="text" class="form-control" id="title"></div>\
                        <div class="form-group"><label>Content</label>\
                        <textarea class="form-control" id="mytextarea"></textarea></div>\
                        <div class="form-group"><label>Activity Time</label>\
                        <div><input type="date" class="form-control" id="acti_time_from"> ~ <input class="form-control" type="date" id="acti_time_to"></div>\
                        <div class="form-group"><label>Registry Time</label>\
                        <input type="date" class="form-control" id="regis_time_from"> ~ <input class="form-control" type="date" id="regis_time_to"></div>\
                        <button class="btn btn-info" id="submitActivity">Submit</button>\
                        </div>';
        $("#activitiesTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputActivity").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        var imgurl = '';
        $("#upload").on("click", function () {
            var formData = new FormData();
            formData.append('file', $("#uploadAvatar")[0].files[0]);
            var response = baseAjaxImg("POST","uploadImage", formData, accesskey);
            imgurl = (response.data[0].Location);
            console.log(imgurl)
        })

        $("#submitActivity").on("click", function () {
            var acti_time_from = $("#acti_time_from").val();
            var acti_time_to = $("#acti_time_to").val();
            var regis_time_from = $("#regis_time_from").val();
            var regis_time_to = $("#regis_time_to").val();
            var title = $("#title").val();
            var content = tinyMCE.activeEditor.getContent();
            var param = {};
            var regis_status = 0;
            param["title"] = title;
            param["content"] = content;
            param["acti_time_from"] = acti_time_from;
            param["acti_time_to"] = acti_time_to;
            param["regis_time_from"] = regis_time_from;
            param["regis_time_to"] = regis_time_to;
            param["regis_status"] = regis_status;
            console.log(param)

            var response = baseAjax("POST", "activity/", param, accesskey);
            console.log(response)
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });


    $("#activitiesTable").on("click",".btn-edit", function () {
        var id = $(this).closest("tr").find(".activityId").text();
        param["id"] = parseInt(id);
        var response = baseAjax("GET", "activity/" + id, "", accesskey);
        var data = response.data[0];
        console.log(data);
        var acti_time_from = data.acti_time_from.substr(0, 10).replace();
        var acti_time_to = data.acti_time_to.substr(0, 10).replace();
        var content= data.content;
        var id = data.id;
        var regis_status = data.regis_status;
        var regis_time_from = data.regis_time_from.substr(0, 10).replace();
        var regis_time_to = data.regis_time_to.substr(0, 10).replace();
        var title = data.title;
        var teacherData = baseAjax("GET", "teacher/" + data.author_id, "", accesskey);
        if (teacherData.data) {
            var teacherName = teacherData.data.first_name + ' ' + teacherData.data.last_name;
        }
        var template = '<div class="form-group"><label>Author: </label>\
                          ' + teacherName + '</div>\
                        <div class="form-group"><label>Title</label>\
                        <input type="text" class="form-control" id="title" value="'+title+'"></div>\
                        <div class="form-group"><label>Content</label>\
                        <textarea class="form-control" id="mytextarea">'+content+'</textarea></div>\
                        <input class="form-control" type="file" id="uploadFileMoments">\
                        <div class="form-group"><label>Activity Time</label>\
                        <input type="date" class="form-control" id="acti_time_from" value="'+acti_time_from+'"> ~ <input class="form-control" type="date" id="acti_time_to" value="'+acti_time_to+'"></div>\
                        <div class="form-group"><label>Registry Time</label>\
                        <input type="date" class="form-control" id="regis_time_from"  value="'+regis_time_from+'"> ~ <input class="form-control" type="date" id="regis_time_to"  value="'+regis_time_to+'"></div>\
                        <button class="btn btn-info" id="submitActivity">Submit</button>\
                        </div>';
        $("#activitiesTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputActivity").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitActivity").on("click", function () {
            var acti_time_from = $("#acti_time_from").val();
            var acti_time_to = $("#acti_time_to").val();
            var regis_time_from = $("#regis_time_from").val();
            var regis_time_to = $("#regis_time_to").val();
            var title = $("#title").val();
            var content = tinyMCE.activeEditor.getContent();
            var param = {};
            var regis_status = 0;
            param["title"] = title;
            param["content"] = content;
            param["acti_time_from"] = acti_time_from;
            param["acti_time_to"] = acti_time_to;
            param["regis_time_from"] = regis_time_from;
            param["regis_time_to"] = regis_time_to;
            param["regis_status"] = regis_status;
            console.log(param)

            var response = baseAjax("PUT", "activity/"+id, param, accesskey);
            console.log(response)
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })
});