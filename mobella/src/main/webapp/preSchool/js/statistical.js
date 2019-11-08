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

    function getStudyResult(response, accesskey) {
        var data = response.data;
        var studyResultTable = '<thead>\
                                    <th>ID</th>\
                                    <th style="display: none">StdID</th>\
                                    <th style="display: none">ClassID</th>\
                                    <th style="display: none">Rate</th>\
                                    <th>Class</th>\
                                    <th>Student</th>\
                                    <th>Rate</th>\
                                    <th>Semester</th>\
                                    <th>Review</th>\
                                    <th>Date</th>\
                                    <th>Update date</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            var stdID = data[i].stdID;
            var classID = data[i].classID;
            var rate = '';
            if (data[i].rate == 1) {
                rate = "Xuất sắc";
            } else if (data[i].rate == 2) {
                rate = "Giỏi";
            } else if (data[i].rate == 3) {
                rate = "Khá";
            } else if (data[i].rate == 4) {
                rate = "Trung Bình";
            } else if (data[i].rate == 5) {
                rate = "Yếu";
            }
            var semester = data[i].semester;
            var review = data[i].review;
            var className = '';
            var studentName = '';
            var studentData = baseAjax("GET", "student/" + stdID, "", accesskey);
            var classData = baseAjax("GET", "class/" + classID, "", accesskey);

            var date = data[i].createdAt.substr(0, 10);
            var updatedAt = data[i].updatedAt.substr(0, 10);
            if (classData.data) {
                className = classData.data.class_name;
                if (studentData.data) {
                    studentName = studentData.data.first_name + ' ' + studentData.data.last_name;
                    if ($.cookie("userRole") == 10) {
                        if ($.cookie("userId") == classData.data.schoolId) {
                            studyResultTable += '<tr style="text-align: center">\
                                <td class="id">' + id + '</td> \
                                <td class="stdID" style="display: none">' + stdID + '</td>\
                                <td class="classID" style="display: none">' + classID + '</td>\
                                <td class="rate" style="display: none">' + data[i].rate + '</td>\
                                <td class="className">' + className + '</td>\
                                <td class="studentName">' + studentName + '</td>\
                                <td>' + rate + '</td>\
                                <td class="semester">' + semester + '</td>\
                                <td class="review">' + review + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
                        }
                    } else {
                        studyResultTable += '<tr style="text-align: center">\
                                <td class="id">'+id+'</td> \
                                <td class="stdID" style="display: none">' + stdID + '</td>\
                                <td class="classID" style="display: none">' + classID + '</td>\
                                <td class="rate" style="display: none">' + data[i].rate + '</td>\
                                <td class="className">' + className + '</td>\
                                <td class="studentName">' + studentName + '</td>\
                                <td>' + rate + '</td>\
                                <td class="semester">' + semester + '</td>\
                                <td class="review">' + review + '</td>\
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


        }
        studyResultTable += '</tbody>';

        $("#statisticalTable").html(studyResultTable);
        $("#statisticalTable").DataTable({})
    }

    var param = {};
    var accesskey = $.cookie('accessKey');
    var response = baseAjax("GET", "studyResult", '', accesskey);
    console.log(response)
    getStudyResult(response, accesskey);

    $("#statisticalTable").on("click", ".btn-delete", function () {
        var id = $(this).closest("tr").find(".id").text();
        var response = baseAjax("DELETE", "studyResult/" + id, "", accesskey);
        if (response.status == "success") {
            location.reload();
        } else {
            alert('Xóa thất bại!');
        }
    });

    $("#btn-add").on("click", function () {
        var classData = baseAjax("GET", "class", "", accesskey);
        var option = '<select class="form-control" id="optionClass"><option></option>';
        for (var i = 0; i < classData.data.length; i++) {
            var name = classData.data[i].class_name;
            var id = classData.data[i].id;
            if($.cookie("userRole") == 10){
                if($.cookie("userId") == classData.data[i].schoolId){
                    option += '<option value="' + id + '">' + name + '</option>'
                }
            } else {
                option += '<option value="' + id + '">' + name + '</option>'
            }
        }
        option += '</select>';
        var template = '<div class="form-group"><label>Class</label>\
                        ' + option + '</div>\
                        <div class="form-group" id="student"></div>\
                        <div class="form-group"><label>Semester</label>\
                        <select id="semester"><option></option><option value="1">Học kỳ 1</option><option value="2">Học kỳ 2</option></select></div>\
                        <div class="form-group"><label>Rate</label>\
                        <select id="rate">\
                            <option value="1">Xuất sắc</option>\
                            <option value="2">Giỏi</option>\
                            <option value="3">Khá</option>\
                            <option value="4">Trung bình</option>\
                            <option value="5">Yếu</option>\
                        </select></div>\
                        <div class="form-group"><label>Review</label>\
                        <textarea id="mytextarea" class="form-control" ></textarea></div>\
                        <button class="btn btn-info" id="submitResult">Submit</button>\
                        </div>';
        $("#statisticalTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputStatistical").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#optionClass").on("change", function () {
            var classId = $(this).val();
            var studentData = baseAjax("GET", "student", "", accesskey);
            console.log(studentData)
            var option1 = '<label>Student</label><select class="form-control" id="optionStudent">';
            for (var i = 0; i < studentData.data.length; i++) {
                if (studentData.data[i].class_id == classId) {
                    var name = studentData.data[i].first_name + ' ' + studentData.data[i].last_name;
                    var id = studentData.data[i].id;
                    option1 += '<option value="' + id + '">' + name + '</option>';
                }
            }
            option1 += '</select>';
            $("#student").html(option1);
        })

        $("#submitResult").on("click", function () {
            var classID = $("#optionClass").val();
            var stdID = $("#optionStudent").val();
            var rate = $("#rate").val();
            var review = tinyMCE.activeEditor.getContent();
            var semester = $("#semester").val();

            var param = {};
            param["classID"] = classID;
            param["stdID"] = stdID;
            param["rate"] = rate;
            param["review"] = review;
            param["semester"] = semester;

            var response = baseAjax("POST", "studyResult/", param, accesskey);
            console.log(response)
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });


    $("#statisticalTable").on("click", ".btn-edit", function () {
        var id = $(this).closest("tr").find(".id").text();
        var review = $(this).closest("tr").find(".review").text();
        var classData = baseAjax("GET", "class", "", accesskey);
        var option = '<select class="form-control" id="optionClass"><option></option>';
        for (var i = 0; i < classData.data.length; i++) {
            var name = classData.data[i].class_name;
            var id = classData.data[i].id;
            option += '<option value="' + id + '">' + name + '</option>'
        }
        option += '</select>';
        var template = '<div class="form-group"><label>Class</label>\
                        ' + option + '</div>\
                        <div class="form-group" id="student"></div>\
                        <div class="form-group"><label>Semester</label>\
                        <select id="semester"><option></option><option value="1">Học kỳ 1</option><option value="2">Học kỳ 2</option></select></div>\
                        <div class="form-group"><label>Rate</label>\
                        <select id="rate">\
                            <option value="1">Xuất sắc</option>\
                            <option value="2">Giỏi</option>\
                            <option value="3">Khá</option>\
                            <option value="4">Trung bình</option>\
                            <option value="5">Yếu</option>\
                        </select></div>\
                        <div class="form-group"><label>Review</label>\
                        <textarea id="mytextarea" class="form-control">' + review + '</textarea></div>\
                        <button class="btn btn-info" id="submitResult">Submit</button>\
                        </div>';
        $("#statisticalTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputStatistical").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#optionClass").on("change", function () {
            var classId = $(this).val();
            var studentData = baseAjax("GET", "student", "", accesskey);
            console.log(studentData)
            var option1 = '<label>Student</label><select class="form-control" id="optionStudent">';
            for (var i = 0; i < studentData.data.length; i++) {
                if (studentData.data[i].class_id == classId) {
                    var name = studentData.data[i].first_name + ' ' + studentData.data[i].last_name;
                    var id = studentData.data[i].id;
                    if($.cookie("userRole") == 10){
                        if($.cookie("userId") == classData.data[i].schoolId){
                            option += '<option value="' + id + '">' + name + '</option>'
                        }
                    } else {
                        option += '<option value="' + id + '">' + name + '</option>'
                    }
                }
            }
            option1 += '</select>';
            $("#student").html(option1);
        })

        $("#submitResult").on("click", function () {
            var classID = $("#optionClass").val();
            var stdID = $("#optionStudent").val();
            var rate = $("#rate").val();
            var review = tinyMCE.activeEditor.getContent();
            var semester = $("#semester").val();

            var param = {};
            // param["id"] = id;
            param["classID"] = classID;
            param["stdID"] = stdID;
            param["rate"] = rate;
            param["review"] = review;
            param["semester"] = semester;
            console.log(param)

            var response = baseAjax("PUT", "studyResult/" + id, param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })
});