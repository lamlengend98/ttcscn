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

    function getClasses(response, accesskey) {
        var data = response.data;
        var classesTable = '<thead>\
                                    <th>ID</th>\
                                    <th style="display: none">SchoolID</th>\
                                    <th>School Name</th>\
                                    <th>Class Name</th>\
                                    <th>Grade</th>\
                                    <th>Teacher</th>\
                                    <th>Number of Students</th>\
                                    <th>Date</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var schoolId = data[i].schoolId;
            var class_name = data[i].class_name;
            var date = data[i].createdAt.substr(0, 10);
            var updatedAt = data[i].updatedAt.substr(0, 10);
            var grade = data[i].grade;
            var id = data[i].id;
            var homeroom_teacher = data[i].homeroom_teacher;
            var number_student = data[i].number_student;
            var teacherData = baseAjax("GET", "teacher/" + homeroom_teacher, "", accesskey);
            var schoolData = baseAjax("GET", "school/"+schoolId, "", accesskey);
            var schoolName = '';
            if (teacherData.data) {
                var teacherName = teacherData.data.first_name + ' ' + teacherData.data.last_name;
                if(schoolData.data){
                    schoolName = schoolData.data.school_name;
                    if($.cookie("userRole") == 10) {
                        if (schoolData.data.id == $.cookie("userId")) {
                            classesTable += '<tr style="text-align: center">\
                                <td class="id">' + id + '</td> \
                                <td class="schoolId" style="display: none">' + schoolId + '</td>\
                                <td class="schoolName">' + schoolName + '</td>\
                                <td class="class_name">' + class_name + '</td>\
                                <td class="grade">' + grade + '</td>\
                                <td class="teacherName">' + teacherName + '</td>\
                                <td class="numberStudents">' + number_student + '</td>\
                                <td>' + date + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
                        }
                    } else {
                        classesTable += '<tr style="text-align: center">\
                                <td class="id">'+id+'</td> \
                                <td class="schoolId" style="display: none">' + schoolId + '</td>\
                                <td class="schoolName">' + schoolName + '</td>\
                                <td class="class_name">' + class_name + '</td>\
                                <td class="grade">' + grade + '</td>\
                                <td class="teacherName">' + teacherName + '</td>\
                                <td class="numberStudents">' + number_student + '</td>\
                                <td>' + date + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
                    }
                }
            }


        }
        classesTable += '</tbody>';

        $("#classesTable").html(classesTable);
        $("#classesTable").DataTable({})
    }

    var param = {};
    var accesskey = $.cookie('accessKey');
    var response = baseAjax("GET", "class", '', accesskey);
    getClasses(response, accesskey);

    $(".btn-delete").on("click", function () {
        var id = $(this).closest("tr").find(".id").text();
        console.log(id)
        var response = baseAjax("DELETE", "class/" + id, "", accesskey);
        if(response.status == "success"){
            location.reload();
        } else {
            alert('Xóa thất bại!');
        }
    });

    $("#btn-add").on("click", function () {
        var teacherData = baseAjax("GET", "teacher/", "", accesskey);
        var option = '<select class="form-control" id="optionTeacher">';
        for (var i = 0; i < teacherData.data.length; i++) {
            var id = teacherData.data[i].id;
            var name = teacherData.data[i].first_name + ' ' + teacherData.data[i].last_name;
            option += '<option value=' + id + '>' + name + '</option>';
        }
        option += '</select>';

        var option1 = '<select class="form-control" id="optionSchool">';
        var schoolData = baseAjax("GET", "school/", "", accesskey);
        for (var i = 0;i < schoolData.data.length; i++) {
            var id = schoolData.data[i].id;
            var name = schoolData.data[i].school_name;
            option1 += '<option value="'+id+'">'+name+'</option>'
        }
        option1 += '</select>';
        var template = '<div class="form-group"><label>Class Name</label>\
                        <input class="form-control" type="text" id="class_name"></div>\
                        <div class="form-group"><label>Grade</label>\
                        <input class="form-control" type="text" id="grade"></div>\
                        <div class="form-group"><label>Teacher</label>\
                          ' + option + '</div>\
                        <div class="form-group"><label>Number of Students</label>\
                        <input class="form-control" id="numberStudents" type="number"></div>\
                        <div class="form-group"><label>School</label>\
                          ' + option1 + '</div>\
                        <button class="btn btn-info" id="submitClass">Submit</button>\
                        </div>';
        $("#classesTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputClass").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitClass").on("click", function () {
            var class_name = $("#class_name").val();
            var grade = $("#grade").val();
            var teacher_id = $("#optionTeacher").val();
            var number_student = $("#numberStudents").val();
            var schoolId = $("#optionSchool").val();

            var param = {};
            param["class_name"] = class_name;
            param["grade"] = grade;
            param["homeroom_teacher"] = teacher_id;
            param["number_student"] = number_student;
            param["schoolId"] = schoolId;
            console.log(param)

            var response = baseAjax("POST", "class/", param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });


    $("#classesTable").on("click",".btn-edit", function () {
        console.log(1);
        var id = $(this).closest("tr").find(".id").text();
        var teacherName = $(this).closest("tr").find(".teacherName").text();
        var class_name = $(this).closest("tr").find(".class_name").text();
        var school_name = $(this).closest("tr").find(".schoolName").text();
        var schoolId = $(this).closest("tr").find(".schoolId").text();
        var grade = $(this).closest("tr").find(".grade").text();
        var numberStudents = $(this).closest("tr").find(".numberStudents").text();
        var option = '<select class="form-control" id="optionTeacher">';
        var teacherData = baseAjax("GET", "teacher/", "", accesskey);
        for (var i = 0; i < teacherData.data.length; i++) {
            var teacherId = teacherData.data[i].id;
            var name = teacherData.data[i].first_name + ' ' + teacherData.data[i].last_name;
            option += '<option value=' + teacherId + '>' + name + '</option>';
        }
        option += '</select>';
        $("#optionTeacher").val(teacherName);
        param["id"] = parseInt(id);
        var response = baseAjax("GET", "class/" + id, "", accesskey);
        var data = response.data[0];
        var template = ' <div class="form-group"><label>School Name</label>\
                        <div>'+school_name+'</div></div>\
                        <div class="form-group"><label>Class Name</label>\
                        <input class="form-control" type="text" id="class_name" value="'+class_name+'"></div>\
                        <div class="form-group"><label>Grade</label>\
                        <input class="form-control" type="text" id="grade" value="'+grade+'"></div>\
                        <div class="form-group"><label>Teacher</label>\
                          ' + option + '</div>\
                        <div class="form-group"><label>Number of Students</label>\
                        <input class="form-control" id="numberStudents" type="number" value="'+numberStudents+'"></div>\
                        <button class="btn btn-info" id="submitClass">Submit</button>\
                        </div>';
        $("#classesTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputClass").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitClass").on("click", function () {
            var class_name = $("#class_name").val();
            var grade = $("#grade").val();
            var homeroom_teacher = $("#optionTeacher").val();
            var number_student = $("#numberStudents").val();
            var param = {};
            param["id"]=id;
            param["class_name"] = class_name;
            param["grade"] = grade;
            param["homeroom_teacher"] = homeroom_teacher;
            param["number_student"] = number_student;
            param["schoolId"] = schoolId;
            console.log(param)

            var response = baseAjax("PUT", "class/"+id, param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })
});