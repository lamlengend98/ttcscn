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
        console.log(response);

        return response;
    }

    function getTuitition(response, accesskey) {
        var data = response.data;
        var tuititionTable = '<thead>\
                                    <th>ID</th>\
                                    <th style="display: none">std_id</th>\
                                    <th>Student</th>\
                                    <th>Semester</th>\
                                    <th>Fee</th>\
                                    <th style="display: none">Is Paid</th>\
                                    <th>Is Paid</th>\
                                    <th>Date</th>\
                                    <th>Update Date</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var semester = data[i].semester;
            var isPaid = "";
            if(data[i].isPaid == 0){
                isPaid = "Chưa đóng";
            } else {
                isPaid = "Đã đóng"
            }
            var schFee = data[i].schFee;
            var std_id = data[i].stdID;
            var date = data[i].createdAt.substr(0, 10);
            var updatedAt = data[i].updatedAt.substr(0, 10);
            var id = data[i].id;
            var stdData = baseAjax("GET", "student/" + std_id, "", accesskey);
            if (stdData.data) {
                console.log(stdData.data)
                var studentName = stdData.data.first_name + ' ' + stdData.data.last_name;
            }

            tuititionTable += '<tr>\
                                <td class="tuititionId">' + id + '</td>\
                                <td class="std_id" style="display: none">'+std_id+'</td>\
                                <td class="studentName">' + studentName + '</td>\
                                <td class="semester">' + semester + '</td>\
                                <td class="schFee">' + schFee + '</td>\
                                <td class="isPaidStatus" style="display: none">' + data[i].isPaid+ '</td>\
                                <td class="isPaid">' + isPaid + '</td>\
                                <td>' + date + '</td>\
                                <td>' + updatedAt + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
        }
        tuititionTable += '</tbody>';

        $("#tuititionTable").html(tuititionTable);
        $("#tuititionTable").DataTable({})
    }

    var param = {};
    var accesskey = $.cookie('accessKey');
    var response = baseAjax("GET", "tuition/", '', accesskey);
    getTuitition(response, accesskey);

    $("#tuititionTable").on("click",".btn-delete", function () {
        var id = $(this).closest("tr").find(".tuititionId").text();
        var response = baseAjax("DELETE", "tuition/" + id, "", accesskey);
        if(response.status == "success"){
            location.reload();
        } else {
            alert('Xóa thất bại!');
        }
    });

    $("#btn-add").on("click", function () {
        var stdData = baseAjax("GET", "student/", "", accesskey);ơ
        var option = '<select class="form-control" id="optionStd">';
        for (var i = 0; i < stdData.data.length; i++) {
            var id = stdData.data[i].id;
            var name = stdData.data[i].first_name + ' ' + stdData.data[i].last_name;
            option += '<option value=' + id + '>' + name + '</option>';
        }
        option += '</select>';
        var template = '<div class="form-group"><label>Student</label>\
                          ' + option + '</div>\
                        <div class="form-group"><label>Semester</label>\
                        <select id="semester"><option value="1">1</option><option value="2">2</option></select></div>\
                        <div class="form-group"><label>Fee</label>\
                        <input class="form-control" type="number" id="schFee"></div>\
                        <div class="form-group"><label>Is Paid</label>\
                        <select id="isPaid"><option value="0">Chưa đóng</option><option value="1">Đã đóng</option></select></div>\
                        <button class="btn btn-info" id="submitTuitition">Submit</button>\
                        </div>';
        $("#tuititionTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputTuitition").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitTuitition").on("click", function () {
            var stdID = $("#optionStd").val();
            var semester = $("#semester").val();
            var schFee = $("#schFee").val();
            var isPaid = $("#isPaid").val();
            param["stdID"] = stdID;
            param["semester"] = semester;
            param["schFee"] = schFee;
            param["isPaid"] = isPaid;
            console.log(param)

            var response = baseAjax("POST", "tuition/", param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });


    $("#tuititionTable").on("click",".btn-edit", function () {
        var stdData = baseAjax("GET", "student/", "", accesskey);
        var option = '<select class="form-control" id="optionStd">';
        for (var i = 0; i < stdData.data.length; i++) {
            var id = stdData.data[i].id;
            var name = stdData.data[i].first_name + ' ' + stdData.data[i].last_name;
            option += '<option value=' + id + '>' + name + '</option>';
        }
        option += '</select>';
        var id = $(this).closest("tr").find(".tuititionId").text();
        var schFee = $(this).closest("tr").find(".schFee").text();
        $("#submitTuitition").removeClass("disable_tuitition");
        var template = '<div class="form-group"><label>Student</label>\
                          <div>' + option + '</div></div>\
                          <div class="form-group"><label>Semester</label>\
                          <select id="semester"><option value="1">1</option><option value="2">2</option></select></div>\
                        <div class="form-group"><label>Fee</label>\
                        <input class="form-control" type="number" id="schFee" value="'+schFee+'"></div>\
                        <div class="form-group"><label>Is Paid</label>\
                        <select id="isPaid"><option value="0">Chưa đóng</option><option value="1">Đã đóng</option></select></div>\
                        <button class="btn btn-info" id="submitTuitition">Submit</button>\
                        </div>';
        $("#tuititionTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputTuitition").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitTuitition").on("click", function () {
            var stdID = $("#optionStd").val();
            var semester = $("#semester").val();
            var schFee = $("#schFee").val();
            var isPaid = $("#isPaid").val();
            param["id"] = id;
            param["stdID"] = stdID;
            param["semester"] = semester;
            param["schFee"] = schFee;
            param["isPaid"] = isPaid;
            console.log(param)

            var response = baseAjax("PUT", "tuition/"+id, param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })
});