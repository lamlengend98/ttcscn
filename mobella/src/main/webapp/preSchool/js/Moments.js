$(document).ready(function () {
    function baseAjax(method, url, param, accesskey) {
        var urlAjax = "http://localhost:8080/api/" + url;
        var response;
        $.ajax({
            method: method,
            // cache: false,
            // contentType: false,
            // processData:false,
            url: urlAjax,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+accesskey)
            },
            // dataType: false,
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
    };
    function baseAjaxImg(method, url, param, accesskey) {
        var urlAjax = "http://localhost:8080/api/" + url;
        var response;
        $.ajax({
            method: method,
            cache: false,
            contentType: false,
            processData:false,
            url: urlAjax,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+accesskey)
            },
            // dataType: false,
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

    function getMoments(response, accesskey) {
        var data = response.data;
        console.log($.cookie("userId"));
        var momentsTable = '<thead>\
                                    <th>ID</th>\
                                    <th>Author</th>\
                                    <th>Content</th>\
                                    <th>Likes</th>\
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
            var id = data[i].id;
            var likes = data[i].likes;
            var teacherData = baseAjax("GET", "teacher/" + author_id, "", accesskey);
            var teacherName = "";
            if (teacherData.data) {
                teacherName = teacherData.data.first_name + ' ' + teacherData.data.last_name;
                if($.cookie("userRole") == 10){
                    var schoolData = baseAjax("GET","school/"+teacherData.data.schoolID, "", accesskey);
                    if(schoolData.data){
                        console.log(schoolData.data.userID)
                        if(schoolData.data.userID == $.cookie("userId")){
                            console.log(1)
                            momentsTable += '<tr>\
                                <td class="momentId">' + id + '</td>\
                                <td class="teacherName">' + teacherName + '</td>\
                                <td style="width:50%" class="content">' + content + '</td>\
                                <td>' + likes + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
                        }
                    }
                } else {
                    momentsTable += '<tr>\
                                <td class="momentId">' + id + '</td>\
                                <td class="teacherName">' + teacherName + '</td>\
                                <td style="width:50%" class="content">' + content + '</td>\
                                <td>' + likes + '</td>\
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
        momentsTable += '</tbody>';

        $("#momentsTable").html(momentsTable);
        $("#momentsTable").DataTable({})
    }

    var param = {};
    var accesskey = $.cookie('accessKey');
    var response = baseAjax("GET", "moment", '', accesskey);
    getMoments(response, accesskey);

    $("#momentsTable").on("click",".btn-delete", function ()  {
        var id = $(this).closest("tr").find(".momentId").text();
        var response = baseAjax("DELETE", "moment/" + id, "", accesskey);
        if(response.status == "success"){
            location.reload();
        } else {
            alert('Xóa thất bại!');
        }
    });

    $("#btn-add-moment").on("click", function () {
        var teacherData = baseAjax("GET", "teacher/", "", accesskey);
        var imgurl = [];
        $("#submitMoment").removeClass("disable_moment");
        var option = '<select class="form-control" id="optionAuthor">';
        for (var i = 0; i < teacherData.data.length; i++) {
            var id = teacherData.data[i].id;
            var name = teacherData.data[i].first_name + ' ' + teacherData.data[i].last_name;
            option += '<option value=' + id + '>' + name + '</option>';
        }
        option += '</select>';
        var template = '<div class="form-group"><label>Author</label>\
                          ' + option + '</div>\
                        <div class="form-group"><label>Content</label>\
                        <textarea class="form-control" id="mytextarea"></textarea></div>\
                        <div class="form-group"><label>Status Accept</label>\
                        <select id="statusAccept"><option value="0">0</option><option value="1">1</option></select></div>\
                        <button class="btn btn-info" id="submitMoment">Submit</button>\
                        </div>';
        $("#momentsTable_wrapper").hide();
        $("#btn-add-moment").hide();
        $("#inputMoment").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitMoment").on("click", function () {
            var content = tinyMCE.activeEditor.getContent();
            var like = 0;
            var statusAccept = $("#statusAccept").val();
            var param = {};
            param["author_id"] = $("#optionAuthor").val();
            param["content"] = content;
            param["likes"] = like;
            param["status_accept"] = parseInt(statusAccept);
            console.log(param)

            var response = baseAjax("POST", "moment/", param, accesskey);
            console.log(response)
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });


    $("#momentsTable").on("click",".btn-edit", function () {
        var id = $(this).closest("tr").find(".momentId").text();
        $("#submitMoment").removeClass("disable_moment");
        param["id"] = parseInt(id);
        var response = baseAjax("GET", "moment/" + id, "", accesskey);
        var data = response.data[0];
        var teacherData = baseAjax("GET", "teacher/" + data.author_id, "", accesskey);
        if (teacherData.data) {
            var teacherName = teacherData.data.first_name + ' ' + teacherData.data.last_name;
        }
        var template = '<div class="form-group"><label>Author</label>\
                          <div>' + teacherName + '</div></div>\
                        <div class="form-group"><label>Content</label>\
                        <textarea class="form-control" id="mytextarea">' + data.content + '</textarea>\
                        <input class="form-control" type="file" id="uploadFileMoments">\
                        <div class="form-group"><label>Status Accept</label>\
                        <div>' + data.status_accept + '</div></div>\
                        <button class="btn btn-info" id="submitMoment">Submit</button>\
                        </div>';
        $("#momentsTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputMoment").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitMoment").on("click", function () {
            var content = tinyMCE.activeEditor.getContent();
            var like = 0;
            var img = "";
            var statusAccept = data.status_accept
            var param = {};
            param["id"]=id;
            param["author_id"] = data.author_id;
            param["content"] = content;
            param["likes"] = like;
            param["status_accept"] = statusAccept;
            console.log(param)

            var response = baseAjax("PUT", "moment/"+id, param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })
});