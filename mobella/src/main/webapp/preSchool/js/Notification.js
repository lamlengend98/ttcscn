$(document).ready(function () {
    function baseAjax(method, url, param, accesskey) {
        var urlAjax = "http://localhost:8080/api/" + url;
        var response;
        $.ajax({
            method: method,
            url: urlAjax,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+accesskey)
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

    function getNotify(response, accesskey) {
        var data = response.data;
        var notifyTable = '<thead>\
                                    <th>ID</th>\
                                    <th style="display: none">TeacherID</th>\
                                    <th>Title</th>\
                                    <th>Content</th>\
                                    <th>Author</th>\
                                    <th>Date</th>\
                                    <th>Update Date</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var content = data[i].content;
            var author = data[i].author;
            var date = data[i].createdAt.substr(0, 10);
            var updatedAt = data[i].updatedAt.substr(0, 10);
            var title = data[i].title;
            var id = data[i].id;
            var teacherData = baseAjax("GET", "teacher/" + author, "", accesskey);
            if (teacherData.data) {
                var teacherName = teacherData.data.first_name + ' ' + teacherData.data.last_name;
                if($.cookie("userRole") == 10){
                    if($.cookie("userId") == teacherData.data.schoolID){
                        notifyTable += '<tr>\
                                <td class="notifyId">' + id+ + '</td>\
                                <td class="author" style="display: none">'+author+'</td>\
                                <td class="title">' + title + '</td>\
                                <td style="width:50%" class="content">' + content + '</td>\
                                <td class="teacherName">' + teacherName + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
                    }
                } else {
                    notifyTable += '<tr>\
                                <td class="notifyId">' + id + '</td>\
                                <td class="author" style="display: none">'+author+'</td>\
                                <td class="title">' + title + '</td>\
                                <td style="width:50%" class="content">' + content + '</td>\
                                <td class="teacherName">' + teacherName + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
                }
            }


        }
        notifyTable += '</tbody>';

        $("#notifyTable").html(notifyTable);
        $("#notifyTable").DataTable({})
    }

    var param = {};
    var accesskey = $.cookie('accessKey');
    var response = baseAjax("GET", "notify/", '', accesskey);
    getNotify(response, accesskey);

    $(".btn-delete").on("click", function () {
        var id = $(this).closest("tr").find(".notifyId").text();
        var response = baseAjax("DELETE", "notify/" + id, "", accesskey);
        if(response.status == "success"){
            location.reload();
        } else {
            alert('Xóa thất bại!');
        }
    });

    $("#btn-add").on("click", function () {
        var teacherData = baseAjax("GET", "teacher/", "", accesskey);
        $("#submitNotify").removeClass("disable_notify");
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
                        <input type="text" id="title" class="form-control">\
                        <div class="form-group"><label>Content</label>\
                        <textarea class="form-control" id="mytextarea"></textarea></div>\
                        <button class="btn btn-info" id="submitNotify">Submit</button>\
                        </div>';
        $("#notifyTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputNotify").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitNotify").on("click", function () {
            var content = tinyMCE.activeEditor.getContent();
            var title = $("#title").val();
            var author = $("#optionAuthor").val();
            var param = {};
            param["author"] = author;
            param["content"] = content;
            param["title"] = title;
            console.log(param)

            var response = baseAjax("POST", "notify/", param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });


    $("#notifyTable").on("click",".btn-edit", function () {
        var id = $(this).closest("tr").find(".notifyId").text();
        var teacherName = $(this).closest("tr").find(".teacherName").text();
        var content = $(this).closest("tr").find(".content").text();
        var author = $(this).closest("tr").find(".author").text();
        var title = $(this).closest("tr").find(".title").text();
        $("#submitNotify").removeClass("disable_notify");
        var template = '<div class="form-group"><label>Author</label>\
                          <div>' + teacherName + '</div></div>\
                          <div class="form-group"><label>Title</label>\
                          <input class="form-control" type="text" id="title" value="'+title+'"></div> \
                        <div class="form-group"><label>Content</label>\
                        <textarea class="form-control" id="mytextarea">' + content + '</textarea>\
                        <input class="form-control" type="file" id="uploadFileNotify">\
                        <button class="btn btn-info" id="submitNotify">Submit</button>\
                        </div>';
        $("#notifyTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputNotify").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitNotify").on("click", function () {
            var content = tinyMCE.activeEditor.getContent();
            var title = $("#title").val();
            var param = {};
            param["author"] = parseInt(author);
            param["content"] = content;
            param["title"] = title;
            console.log(param)

            var response = baseAjax("PUT", "notify/"+id, param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })
});