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
        });

        return response;
    }

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


    var accesskey = $.cookie('accessKey');
    var response = baseAjax("GET", "teacher", '', accesskey);
    getTeachers(response, accesskey);
    var response1 = baseAjax("GET", "parent", '', accesskey);
    getParents(response1, accesskey);
    var response2 = baseAjax("GET", "student", '', accesskey);
    getStudents(response2, accesskey);
    $("#parentTable_wrapper").hide();
    $("#studentTable_wrapper").hide();
    $("#addParent").hide();
    $("#addStudent").hide();

    $("#userOption").on("change", function () {
        var user = $("#userOption").val();
        if(user == 2){
            $("#usersTable_wrapper").show();
            $("#parentTable_wrapper").hide();
            $("#studentTable_wrapper").hide();
            $("#addParent").hide();
            $("#addStudent").hide();
            $("#addUser").show();
        } else if(user == 3){
            $("#studentTable_wrapper").hide();
            $("#usersTable_wrapper").hide();
            $("#parentTable_wrapper").show();
            $("#addParent").show();
            $("#addStudent").hide();
            $("#addUser").hide();
        } else {
            $("#studentTable_wrapper").show();
            $("#usersTable_wrapper").hide();
            $("#parentTable_wrapper").hide();
            $("#addParent").hide();
            $("#addStudent").show();
            $("#addUser").hide();
        }
    });


    function getTeachers(response, accesskey) {
        var data = response.data;
        console.log($.cookie("userId"))
        console.log($.cookie("userRole"))
        var usersTable = '<thead>\
                                    <th>ID</th>\
                                    <th>Name</th>\
                                    <th>Address</th>\
                                    <th>Email</th>\
                                    <th>Phone</th>\
                                    <th>School</th>\
                                    <th style="display: none">SchoolId</th>\
                                    <th>Date</th>\
                                    <th>Update date</th>\
                                    <th>Is deleted</th>\
                                    <th>User ID</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var name = data[i].first_name + ' ' +data[i].last_name;
            var address = data[i].address;
            var email = data[i].email;
            var phone = data[i].phone;
            var schoolID = data[i].schoolID;
            var isDelete = data[i].isDelete;
            var date = data[i].createdAt.substr(0, 10);
            var updatedAt = data[i].updatedAt.substr(0, 10);
            var userID = data[i].userID;
            var id = data[i].id;;
            var school = baseAjax("GET", "school/" + schoolID, "", accesskey);
            if (school.data) {
                if ($.cookie("userRole") == 10) {
                    if (school.data.id == $.cookie("userId")) {
                        var schoolName = school.data.school_name;
                        usersTable += '<tr>\
                                <td class="id">' + id + '</td>\
                                <td class="name">' + name + '</td>\
                                <td class="address">' + address + '</td>\
                                <td class="email">' + email + '</td>\
                                <td class="phone">' + phone + '</td>\
                                <td class="schoolName">' + schoolName + '</td>\
                                <td style="display: none" class="schoolID">' + schoolID + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td>' + isDelete + '</td>\
                                <td class="userID">' + userID + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit-user"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete-user"></i>\
                                </td>\
                            </tr>';
                    }
                } else {
                    var schoolName = school.data.school_name;
                    usersTable += '<tr>\
                                <td class="id">' + id + '</td>\
                                <td class="name">' + name + '</td>\
                                <td class="address">' + address + '</td>\
                                <td class="email">' + email + '</td>\
                                <td class="phone">' + phone + '</td>\
                                <td class="schoolName">' + schoolName + '</td>\
                                <td style="display: none" class="schoolID">' + schoolID + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td>' + isDelete + '</td>\
                                <td class="userID">' + userID + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit-user"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete-user"></i>\
                                </td>\
                            </tr>';
                }

            }
        }
        usersTable += '</tbody>';

        $("#usersTable").html(usersTable);
        $("#usersTable").DataTable({})
    }
    function getParents(response, accesskey) {
        var data = response.data;
        var usersTable = '<thead>\
                                    <th>ID</th>\
                                    <th>Name</th>\
                                    <th>Relationship</th>\
                                    <th>Emergency Contact</th>\
                                    <th>Phone</th>\
                                    <th>Avatar</th>\
                                    <th>Date</th>\
                                    <th>Update date</th>\
                                    <th>Is Deleted</th>\
                                    <th>User ID</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var name = data[i].first_name + ' ' +data[i].last_name;
            var relationship = data[i].relationship;
            var emergency_contact = data[i].emergency_contact;
            var phone = data[i].phone;
            var avatar = data[i].avatar;
            var isDelete = data[i].is_delete;
            var date = data[i].createdAt.substr(0, 10);
            var updatedAt = data[i].updatedAt.substr(0, 10);
            var userID = data[i].userID;
            var id = data[i].id;
            usersTable += '<tr>\
                                <td class="id">' + id + '</td>\
                                <td class="name">' + name + '</td>\
                                <td class="relationship">' + relationship + '</td>\
                                <td class="emergency_contact">' + emergency_contact + '</td>\
                                <td class="phone">' + phone + '</td>\
                                <td class="avatar">' + avatar + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td>' + isDelete + '</td>\
                                <td class="userID">' + userID + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit-parent"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete-parent"></i>\
                                </td>\
                            </tr>';
        }
        usersTable += '</tbody>';

        $("#parentTable").html(usersTable);
        $("#parentTable").DataTable({})
    }
    function getStudents(response, accesskey) {
        var data = response.data;
        var usersTable = '<thead>\
                                    <th>ID</th>\
                                    <th>Name</th>\
                                    <th>Address</th>\
                                    <th>Birthday</th>\
                                    <th>Gender</th>\
                                    <th>School</th>\
                                    <th>Parent</th>\
                                    <th>Weight</th>\
                                    <th style="display: none">SchoolId</th>\
                                    <th style="display: none">ParentID</th>\
                                    <th>Date</th>\
                                    <th>Update date</th>\
                                    <th>Is deleted</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var name = data[i].first_name + ' ' +data[i].last_name;
            var address = data[i].address;
            var gender;
            var birthday = data[i].birthday.substr(0, 10);
            var schoolID = data[i].school_id;
            var isDelete = data[i].is_delete;
            var parentID = data[i].parent_id;
            var date = data[i].createdAt.substr(0, 10);
            var updatedAt = data[i].updatedAt.substr(0, 10);
            var userID = data[i].user_id;
            var id = data[i].id;
            var school = baseAjax("GET", "school/" + schoolID, "", accesskey);
            if (school.data) {
                var parent = baseAjax("GET", "parent/" + parentID, "", accesskey);
                if (parent.data) {
                    var parentName = parent.data.first_name + ' ' + parent.data.last_name;
                }
                if(data[i].gender == 0){
                    gender = "Nam";
                } else {
                    gender = "Nữ";
                }
                if ($.cookie("userRole") == 10) {
                    if (school.data.id == $.cookie("userId")) {
                        var schoolName = school.data.school_name;
                        usersTable += '<tr>\
                                <td class="id">' + id + '</td>\
                                <td class="name">' + name + '</td>\
                                <td class="address">' + address + '</td>\
                                <td class="email">' + birthday + '</td>\
                                <td class="phone">' + gender + '</td>\
                                <td class="schoolName">' + schoolName + '</td>\
                                <td class="parent">' + parentName + '</td>\
                                <td class="schoolName">' + schoolName + '</td>\
                                <td style="display: none" class="schoolID">' + schoolID + '</td>\
                                <td style="display: none" class="parentID">' + parentID + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td>' + isDelete + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit-student"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete-student"></i>\
                                </td>\
                            </tr>';
                    }
                } else {
                    var schoolName = school.data.school_name;
                    usersTable += '<tr>\
                                <td class="id">' + id + '</td>\
                                <td class="name">' + name + '</td>\
                                <td class="address">' + address + '</td>\
                                <td class="email">' + birthday + '</td>\
                                <td class="phone">' + gender + '</td>\
                                <td class="schoolName">' + schoolName + '</td>\
                                <td class="parent">' + parentName + '</td>\
                                <td class="schoolName">' + schoolName + '</td>\
                                <td style="display: none" class="schoolID">' + schoolID + '</td>\
                                <td style="display: none" class="parentID">' + parentID + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td>' + isDelete + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit-student"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete-student"></i>\
                                </td>\
                            </tr>';
                }
            }
        }
        usersTable += '</tbody>';

        $("#studentTable").html(usersTable);
        $("#studentTable").DataTable({})
    }

    function onClickDelete(url){
        var response = baseAjax("DELETE", url, "", accesskey);
        console.log(response)
        if(response.status == "success"){
            location.reload();
        } else {
            alert('Xóa thất bại!');
        }
    }

    $(".btn-delete-user").on("click", function () {
        var id = $(this).closest("tr").find(".id").text();
        onClickDelete("teacher/" + id);
    });
    $(".btn-delete-parent").on("click", function () {
        var id = $(this).closest("tr").find(".id").text();
        onClickDelete("parent/" + id);
    });
    $(".btn-delete-student").on("click", function () {
        var id = $(this).closest("tr").find(".id").text();
        onClickDelete("student/" + id);
    });

    $("#addUser").on("click", function () {
        $("#userOption").hide()
        var teacherData = baseAjax("GET", "teacher/", "", accesskey);
        var schoolData = baseAjax("GET", "school/", "", accesskey);
        var option1 = '<select class="form-control" id="optionSchool">';
        console.log(teacherData)
        for(var i = 0; i < schoolData.data.length; i++){
            var id = schoolData.data[i].id;
            option1 += '<option value='+id+'>'+schoolData.data[i].school_name+'</option>';
        }
        option1 += '</select>';
        var template = '<div class="form-group"><label>First name</label>\
                        <input type="text" class="form-control" id="firstName"></div>\
                        <div class="form-group"><label>Last name</label>\
                        <input type="text" class="form-control" id="lastName"></div>\
                        <div class="form-group"><label>Email</label>\
                        <input type="text" class="form-control" id="email"></div>\
                        <div class="form-group"><label>Address</label>\
                        <input type="text" class="form-control" id="address"></div>\
                        <div class="form-group"><label>Phone</label>\
                        <input type="text" class="form-control" id="phone"></div>\
                        <div class="form-group" id="schoolOption"><label>School</label>\
                        '+option1+'</div>\
                        <div class="form-group"><label>Avatar</label>\
                        <input class="form-control" type="file" id="uploadAvatar">\
                        <button id="upload">Upload</button></div>\
                        <button class="btn btn-info" id="submitUser">Submit</button>';
        $("#usersTable_wrapper").hide();
        $("#addUser").hide();
        $("#inputUser").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        if($.cookie("userRole") == 10){
            $("#schoolOption").hide();
        }
        var imgurl = '';
        $("#upload").on("click", function () {
            var formData = new FormData();
            formData.append('file', $("#uploadAvatar")[0].files[0]);
            var response = baseAjaxImg("POST","uploadImage", formData, accesskey);
            imgurl = (response.data[0].Location);
            console.log(imgurl)
        })

        $("#submitUser").on("click", function () {
            var first_name = $("#firstName").val();
            var last_name = $("#lastName").val();
            var email = $("#email").val();
            var address = $("#address").val();
            var phone = $("#phone").val();
            var school = $("#optionSchool").val();
            var isDelete = $("#isDeleted").val();
            var param = {};
            param["first_name"] = first_name;
            param["last_name"] = last_name;
            param["email"] = email;
            param["address"] = address;
            param["phone"] = phone;
            param["schoolID"] = $.cookie("userId");
            param["avatar"] = imgurl;
            console.log(param)

            var response = baseAjax("POST", "teacher/", param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });

    $("#addStudent").on("click", function () {
        var classData = baseAjax("GET", "class/", "", accesskey);
        var schoolData = baseAjax("GET", "school/", "", accesskey);
        var parentData = baseAjax("GET", "parent/", "", accesskey);
        var option1 = '<select class="form-control" id="optionSchool">';
        var option = '<select class="form-control" id="optionParent">';
        var option2 = '<select class="form-control" id="optionClass">';
        for(var i = 0; i < schoolData.data.length; i++){
            var id = schoolData.data[i].id;
            option1 += '<option value='+id+'>'+schoolData.data[i].school_name+'</option>';
        }
        for(var i = 0; i < classData.data.length; i++){
            var id = classData.data[i].id;
            option2 += '<option value='+id+'>'+classData.data[i].class_name+'</option>';
        }
        for(var i = 0; i < parentData.data.length; i++){
            var id = parentData.data[i].id;
            option += '<option value='+id+'>'+parentData.data[i].first_name + ' ' + parentData.data[i].last_name +'</option>';
        }
        option += '</select>';
        option2 += '</select>';
        option1 += '</select>';
        var template = '<div class="form-group"><label>First name</label>\
                        <input type="text" id="firstName" class="form-control"></div>\
                        <div class="form-group"><label>Last name</label>\
                        <input type="text" id="lastName" class="form-control"></div>\
                        <div class="form-group"><label>Address</label>\
                        <input type="text" id="address" class="form-control"></div>\
                        <div class="form-group"><label>Gender</label>\
                        <select class="form-control" id="gender"><option value="0">Nam</option><option value="1">Nữ</option></select></div>\
                        <div class="form-group"><label>Birthday</label>\
                        <input type="date" class="form-control" id="birthday"></div>\
                        <div class="form-group"><label>Weight</label>\
                        <input type="number" class="form-control" id="weight"></div>\
                        <div class="form-group"><label>Height</label>\
                        <input type="number" class="form-control" id="height"></div>\
                        <div class="form-group" id="schoolOption"><label>School</label>\
                        '+option1+'</div>\
                        <div class="form-group"><label>Class</label>\
                        '+option2+'</div>\
                        <div class="form-group"><label>Parent</label>\
                        '+option+'</div>\
                        <div class="form-group"><label>Avatar</label>\
                        <input class="form-control" type="file" id="uploadAvatar">\
                        <button id="upload">Upload</button></div>\
                        <button class="btn btn-info" id="submitStudent">Submit</button>';
        $("#studentTable_wrapper").hide();
        $("#addStudent").hide();
        $("#userOption").hide();
        $("#inputStudent").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");
        if($.cookie("userRole") == 10){

            $("#schoolOption").hide();
        }

        var imgurl = '';
        $("#upload").on("click", function () {
            var formData = new FormData();
            formData.append('file', $("#uploadAvatar")[0].files[0]);
            var response = baseAjaxImg("POST","uploadImage", formData, accesskey);
            imgurl = (response.data[0].Location);
            console.log(imgurl)
        })

        $("#submitStudent").on("click", function () {
            var first_name = $("#firstName").val();
            var last_name = $("#lastName").val();
            var gender = $("#gender").val();
            var birthday = $("#birthday").val();
            var address = $("#address").val();
            var weight = $("#weight").val();
            var height = $("#height").val();
            var school_id = $("#optionSchool").val();
            var parent_id = $("#optionParent").val();
            var class_id = $("#optionClass").val();
            var avatar = "";
            var param = {};
            param["first_name"] = first_name;
            param["last_name"] = last_name;
            param["gender"] = gender;
            param["address"] = address;
            param["birthday"] = birthday;
            param["weight"] = weight;
            param["height"] = height;
            param["school_id"] = $.cookie("userId");
            param["parent_id"] = parent_id;
            param["class_id"] = class_id;
            param["avatar"] = imgurl;
            console.log(param)

            var response = baseAjax("POST", "student/", param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });

    $("#addParent").on("click", function () {
        var template = '<div class="form-group"><label>First name</label>\
                        <input type="text" class="form-control" id="firstName"></div>\
                        <div class="form-group"><label>Last name</label>\
                        <input type="text" id="lastName" class="form-control"></div>\
                        <div class="form-group"><label>Phone</label>\
                        <input type="text" id="phone" class="form-control"></div>\
                        <div class="form-group"><label>Relationship</label>\
                        <input type="text" class="form-control" id="relationship"></div>\
                        <div class="form-group"><label>Emergency Contact</label>\
                        <input type="text" class="form-control" id="emergency_contact"></div>\
                        <div class="form-group"><label>Avatar</label>\
                        <input class="form-control" type="file" id="uploadAvatar">\
                        <button id="upload">Upload</button></div>\
                        <button class="btn btn-info" id="submitParent">Submit</button>';
        $("#parentTable_wrapper").hide();
        $("#userOption").hide();
        $("#addParent").hide();
        $("#inputParent").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        var imgurl = '';
        $("#upload").on("click", function () {
            var formData = new FormData();
            formData.append('file', $("#uploadAvatar")[0].files[0]);
            var response = baseAjaxImg("POST","uploadImage", formData, accesskey);
            imgurl = (response.data[0].Location);
            console.log(imgurl)
        })

        $("#submitParent").on("click", function () {
            var first_name = $("#firstName").val();
            var last_name = $("#lastName").val();
            var relationship = $("#relationship").val();
            var emergency_contact = $("#emergency_contact").val();
            var phone = $("#phone").val();
            var avatar = $("#avatar").val();
            var param = {};
            param["first_name"] = first_name;
            param["last_name"] = last_name;
            param["relationship"] = relationship;
            param["emergency_contact"] = emergency_contact;
            param["phone"] = phone;
            param["avatar"] = imgurl;
            console.log(param);

            var response = baseAjax("POST", "parent/", param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });


    $("#usersTable_wrapper").on("click",".btn-edit-user", function () {
        var id = $(this).closest("tr").find(".id").text();
        var response = baseAjax("GET", "teacher/" + id, "", accesskey);
        console.log(response)
        var schoolData = baseAjax("GET", "school/", "", accesskey);
        var option1 = '<select class="form-control" id="optionSchool">';
        for(var i = 0; i < schoolData.data.length; i++){
            var id = schoolData.data[i].id;
            option1 += '<option value='+id+'>'+schoolData.data[i].school_name+'</option>';
        }
        option1 += '</select>';
        var template = '<div class="form-group"><label>First Name</label>\
                        <input type="text" class="form-control" id="firstName" value="'+response.data.first_name+'"></div>\
                        <div class="form-group"><label>Last Name</label>\
                        <input type="text" class="form-control" id="lastName" value="'+response.data.last_name+'"></div>\
                        <div class="form-group"><label>Address</label>\
                        <input type="text" id="address" class="form-control" value="'+response.data.address+'"></div>\
                        <div class="form-group"><label>Phone</label>\
                        <input type="text" id="phone" class="form-control" value="'+response.data.phone+'"></div>\
                        <div class="form-group"><label>Email</label>\
                        <input type="text" id="email" class="form-control" value="'+response.data.email+'"></div>\
                        <div class="form-group" id="schoolOption"><label>School</label>\
                        '+option1+'\
                        <div class="form-group"><label>Is Delete</label>\
                        <select id="is_delete" class="form-control"><option value="0">0</option><option value="1">1</option></select>\
                        <div class="form-group"><label>Avatar</label>\
                        <input class="form-control" type="file" id="uploadAvatar"></div>\
                        <button class="btn btn-info" id="submitUser">Submit</button>';
        $("#usersTable_wrapper").hide();
        $("#addUser").hide();
        $("#userOption").hide();
        $("#inputUser").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        if($.cookie("userRole") == 10){
            $("#schoolOption").hide();
        }
        var imgurl = '';
        $("#upload").on("click", function () {
            var formData = new FormData();
            formData.append('file', $("#uploadAvatar")[0].files[0]);
            var response = baseAjaxImg("POST","uploadImage", formData, accesskey);
            imgurl = (response.data[0].Location);
            console.log(imgurl)
        })

        $("#submitUser").on("click", function () {
            var first_name = $("#firstName").val();
            var last_name = $("#lastName").val();
            var address = $("#address").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            var avatar = "";
            var schoolID = $("#optionSchool").val();
            var param = {};
            param["id"]=id;
            param["first_name"]=first_name;
            param["last_name"]=last_name;
            param["address"]=address;
            param["phone"]=phone;
            param["email"]=email;
            param["schoolID"]=$.cookie("userId");
            param["avatar"]=imgurl;
            console.log(param)

            var response = baseAjax("PUT", "teacher/"+id, param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })


    $("#parentTable_wrapper").on("click",".btn-edit-parent", function () {
        var id = $(this).closest("tr").find(".id").text();
        var response = baseAjax("GET", "parent/" + id, "", accesskey);
        var template = '<div class="form-group"><label>First Name</label>\
                        <input type="text" class="form-control" id="firstName" value="'+response.data.first_name+'"></div>\
                        <div class="form-group"><label>Last Name</label>\
                        <input type="text" class="form-control" id="lastName" value="'+response.data.last_name+'"></div>\
                        <div class="form-group"><label>Relationship</label>\
                        <input type="text" id="relationship" class="form-control" value="'+response.data.relationship+'"></div>\
                        <div class="form-group"><label>Phone</label>\
                        <input type="text" id="phone" class="form-control" value="'+response.data.phone+'"></div>\
                        <div class="form-group"><label>Emergency Contact</label>\
                        <input type="text" id="emergency_contact" class="form-control" value="'+response.data.emergency_contact+'"></div>\
                        <div class="form-group"><label>Is Delete</label>\
                        <select id="is_delete" class="form-control"><option value="0">0</option><option value="1">1</option></select>\
                        <div class="form-group"><label>Avatar</label>\
                        <input class="form-control" type="file" id="uploadAvatar"></div>\
                        <button class="btn btn-info" id="submitParent">Submit</button>';
        $("#parentTable_wrapper").hide();
        $("#addParent").hide();
        $("#userOption").hide();
        $("#inputParent").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        var imgurl = '';
        $("#upload").on("click", function () {
            var formData = new FormData();
            formData.append('file', $("#uploadAvatar")[0].files[0]);
            var response = baseAjaxImg("POST","uploadImage", formData, accesskey);
            imgurl = (response.data[0].Location);
            console.log(imgurl)
        })

        $("#submitParent").on("click", function () {
            var first_name = $("#firstName").val();
            var last_name = $("#lastName").val();
            var relationship = $("#relationship").val();
            var phone = $("#phone").val();
            var emergency_contact = $("#emergency_contact").val();
            var avatar = "";
            var param = {};
            param["id"]=id;
            param["first_name"]=first_name;
            param["last_name"]=last_name;
            param["emergency_contact"]=emergency_contact;
            param["phone"]=phone;
            param["relationship"]=relationship;
            param["avatar"]=imgurl;

            var response = baseAjax("PUT", "parent/"+id, param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })

    $("#studentTable_wrapper").on("click",".btn-edit-student", function () {
        var classData = baseAjax("GET", "class/", "", accesskey);
        var schoolData = baseAjax("GET", "school/", "", accesskey);
        var parentData = baseAjax("GET", "parent/", "", accesskey);
        var option1 = '<select class="form-control" id="optionSchool">';
        var option = '<select class="form-control" id="optionParent">';
        var option2 = '<select class="form-control" id="optionClass">';
        for(var i = 0; i < schoolData.data.length; i++){
            var id = schoolData.data[i].id;
            option1 += '<option value='+id+'>'+schoolData.data[i].school_name+'</option>';
        }
        for(var i = 0; i < classData.data.length; i++){
            var id = classData.data[i].id;
            option2 += '<option value='+id+'>'+classData.data[i].class_name+'</option>';
        }
        for(var i = 0; i < parentData.data.length; i++){
            var id = parentData.data[i].id;
            option += '<option value='+id+'>'+parentData.data[i].first_name + ' ' + parentData.data[i].last_name +'</option>';
        }
        option += '</select>';
        option2 += '</select>';
        option1 += '</select>';
        var id = $(this).closest("tr").find(".id").text();
        var response = baseAjax("GET", "student/" + id, "", accesskey);
        console.log(response)
        var template = '<div class="form-group"><label>First Name</label>\
                        <input type="text" class="form-control" id="firstName" value="'+response.data.first_name+'"></div>\
                        <div class="form-group"><label>Last Name</label>\
                        <input type="text" class="form-control" id="lastName" value="'+response.data.last_name+'"></div>\
                        <div class="form-group"><label>Gender</label>\
                        <select class="form-control" id="gender"><option value="0">Nam</option><option value="1">Nữ</option></select></div>\
                        <div class="form-group"><label>Birthday</label>\
                        <input type="text" id="birthday" class="form-control" value="'+response.data.birthday.substr(0,10)+'"></div>\
                        <div class="form-group"><label>Address</label>\
                        <input type="text" id="address" class="form-control" value="'+response.data.address+'"></div>\
                        <div class="form-group" id="schoolOption"><label>School</label>\
                        '+option1+'</div>\
                        <div class="form-group"><label>Class</label>\
                        '+option2+'</div>\
                        <div class="form-group"><label>Parent</label>\
                        '+option+'</div>\
                        <div class="form-group"><label>Is Delete</label>\
                        <select id="is_delete" class="form-control"><option value="0">0</option><option value="1">1</option></select>\
                        <div class="form-group"><label>Avatar</label>\
                        <input class="form-control" type="file" id="uploadAvatar"></div>\
                        <button class="btn btn-info" id="submitStudent">Submit</button>';
        $("#studentTable_wrapper").hide();
        $("#addStudent").hide();
        $("#userOption").hide();
        $("#inputStudent").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        if($.cookie("userRole") == 10){
            $("#schoolOption").hide();
        }
        var imgurl = '';
        $("#upload").on("click", function () {
            var formData = new FormData();
            formData.append('file', $("#uploadAvatar")[0].files[0]);
            var response = baseAjaxImg("POST","uploadImage", formData, accesskey);
            imgurl = (response.data[0].Location);
            console.log(imgurl)
        })

        $("#submitStudent").on("click", function () {
            var first_name = $("#firstName").val();
            var last_name = $("#lastName").val();
            var gender = $("#gender").val();
            var birthday = $("#birthday").val();
            var address = $("#address").val();
            var school_id = $("#optionSchool").val();
            var parent_id = $("#optionParent").val();
            var class_id = $("#optionClass").val();
            var avatar = "";
            var param = {};
            param["id"]=id;
            param["first_name"]=first_name;
            param["last_name"]=last_name;
            param["gender"]=gender;
            param["birthday"]=birthday;
            param["address"]=address;
            param["school_id"]=$.cookie("userId");
            param["parent_id"]=parent_id;
            param["class_id"]=class_id;
            param["avatar"]=imgurl;
            console.log(param)

            var response = baseAjax("PUT", "student/"+id, param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })
});