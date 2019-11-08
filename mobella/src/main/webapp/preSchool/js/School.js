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

    function getSchool(response, accesskey) {
        var data = response.data;
        var schoolTable = '<thead>\
                                    <th>ID</th>\
                                    <th style="display: none">UserID</th>\
                                    <th>School Name</th>\
                                    <th>School Year</th>\
                                    <th>Address</th>\
                                    <th>Description</th>\
                                    <th>Email</th>\
                                    <th>Phone</th>\
                                    <th>Website</th>\
                                    <th>Date</th>\
                                    <th>Update date</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var schoolId = data[i].id;
            var school_name = data[i].school_name;
            var school_year = data[i].school_year;
            var email = data[i].email;
            var description = data[i].description;
            var address = data[i].address;
            var phone = data[i].phone;
            var id = data[i].userID;
            var website = data[i].website;
            var date = data[i].createdAt.substr(0, 10);
            var updatedAt = data[i].updatedAt.substr(0, 10);

            schoolTable += '<tr style="text-align: center">\
                                <td class="id">'+schoolId+'</td> \
                                <td class="userID" style="display: none">' + id + '</td>\
                                <td class="school_name">' + school_name + '</td>\
                                <td class="school_year">' + school_year + '</td>\
                                <td class="address">' + address + '</td>\
                                <td class="description">' + description + '</td>\
                                <td class="email">' + email + '</td>\
                                <td class="phone">' + phone + '</td>\
                                <td class="website">' + website + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
        }
        schoolTable += '</tbody>';

        $("#schoolTable").html(schoolTable);
        $("#schoolTable").DataTable({})
    }

    var param = {};
    var accesskey = $.cookie('accessKey');
    var response = baseAjax("GET", "school", '', accesskey);
    console.log(response)
    getSchool(response, accesskey);

    $("#schoolTable").on("click",".btn-delete", function ()  {
        var id = $(this).closest("tr").find(".id").text();
        console.log(id)
        var response = baseAjax("DELETE", "school/" + id, "", accesskey);
        if(response.status == "success"){
            location.reload();
        } else {
            alert('Xóa thất bại!');
        }
    });

    $("#btn-add").on("click", function () {
        var template = '<div class="form-group"><label>School Name</label>\
                        <input class="form-control" type="text" id="school_name"></div>\
                        <div class="form-group"><label>Username</label>\
                        <input class="form-control" type="text" id="username"></div>\
                        <div class="form-group"><label>School Year</label>\
                        <input class="form-control" type="number" id="school_year"></div>\
                        <div class="form-group"><label>Phone</label>\
                        <input class="form-control" type="text" id="phone"></div>\
                        <div class="form-group"><label>Email</label>\
                        <input class="form-control" type="text" id="email"></div>\
                        <div class="form-group"><label>Website</label>\
                        <input class="form-control" type="text" id="website"></div>\
                        <div class="form-group"><label>Address</label>\
                        <input class="form-control" type="text" id="address"></div>\
                        <div class="form-group"><label>Description</label>\
                        <input class="form-control" type="text" id="description"></div>\
                        <button class="btn btn-info" id="submitClass">Submit</button>\
                        </div>';
        $("#schoolTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputSchool").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitClass").on("click", function () {
            var school_name = $("#school_name").val();
            var username = $("#username").val();
            var school_year = $("#school_year").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            var website = $("#website").val();
            var address = $("#address").val();
            var description = $("#description").val();

            var param = {};
            param["school_name"] = school_name;
            param["username"] = username;
            param["school_year"] = school_year;
            param["phone"] = phone;
            param["email"] = email;
            param["website"] = website;
            param["address"] = address;
            param["description"] = description;

            var response = baseAjax("POST", "school/", param, accesskey);
            console.log(response)
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });


    $("#schoolTable").on("click",".btn-edit", function () {
        console.log(1);
        var id = $(this).closest("tr").find(".id").text();
        var school_name = $(this).closest("tr").find(".school_name").text();
        var school_year = $(this).closest("tr").find(".school_year").text();
        var phone = $(this).closest("tr").find(".phone").text();
        var email = $(this).closest("tr").find(".email").text();
        var website = $(this).closest("tr").find(".website").text();
        var address = $(this).closest("tr").find(".address").text();
        var description = $(this).closest("tr").find(".description").text();
        var template = '<div class="form-group"><label>School Name</label>\
                        <input class="form-control" type="text" id="school_name" value="'+school_name+'"></div>\
                        <div class="form-group"><label>School Year</label>\
                        <input class="form-control" type="number" id="school_year" value="'+school_year+'"></div>\
                        <div class="form-group"><label>Phone</label>\
                        <input class="form-control" type="text" id="phone" value="'+phone+'"></div>\
                        <div class="form-group"><label>Email</label>\
                        <input class="form-control" type="text" id="email" value="'+email+'"></div>\
                        <div class="form-group"><label>Website</label>\
                        <input class="form-control" type="text" id="website" value="'+website+'"></div>\
                        <div class="form-group"><label>Address</label>\
                        <input class="form-control" type="text" id="address" value="'+address+'"></div>\
                        <div class="form-group"><label>Description</label>\
                        <input class="form-control" type="text" id="description" value="'+description+'"></div>\
                        <button class="btn btn-info" id="submitStudent">Submit</button>\
                        </div>';
        $("#schoolTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputSchool").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitStudent").on("click", function () {
            var school_name = $("#school_name").val();
            var school_year = $("#school_year").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            var website = $("#website").val();
            var address = $("#address").val();
            var description = $("#description").val();
            var param = {};
            param["school_name"] = school_name;
            param["school_year"] = school_year;
            param["phone"] = phone;
            param["email"] = email;
            param["website"] = website;
            param["address"] = address;
            param["description"] = description;
            console.log(param)

            var response = baseAjax("PUT", "school/"+id, param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })
});