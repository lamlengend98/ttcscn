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

    function getAbsense(response, accesskey) {
        var data = response.data;
        var absenseTable = '<thead>\
                                    <th>ID</th>\
                                    <th style="display:none;">StdID</th>\
                                    <th>Student</th>\
                                    <th>Absense Date</th>\
                                    <th>Reason</th>\
                                    <th>Status Accept</th>\
                                    <th style="display: none">Status Accept</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var std_id = data[i].std_id;
            console.log(data[i])
            var date = data[i].date.substr(0, 10);
            var reason = data[i].reason;
            var status_acceptData = data[i].status_accept;
            var status_accept;
            if(status_acceptData == 0){
                status_accept = "Decline";
            } else {
                status_accept = "Accept";
            }
            var id = data[i].id;
            var studentData = baseAjax("GET", "student/" + std_id, "", accesskey);
            if (studentData.data) {
                var studentName = studentData.data.first_name + ' ' + studentData.data.last_name;
            }

            absenseTable += '<tr>\
                                <td class="id">' + id + '</td>\
                                <td class="stdId" style="display: none">' + std_id + '</td>\
                                <td class="student">' + studentName + '</td>\
                                <td class="date">' + date + '</td>\
                                <td class="reason">' + reason + '</td>\
                                <td class="status_accept">' + status_accept + '</td>\
                                <td style="display: none" class="status_acceptData">' + status_acceptData + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
        }
        absenseTable += '</tbody>';

        $("#absenseTable").html(absenseTable);
        $("#absenseTable").DataTable({})
    }

    var param = {};
    var accesskey = $.cookie('accessKey');
    var response = baseAjax("GET", "absense", '', accesskey);
    getAbsense(response, accesskey);

    $(".btn-delete").on("click", function () {
        var id = $(this).closest("tr").find(".id").text();
        console.log(id)
        baseAjax("DELETE", "absense/" + id, "", accesskey);
        location.reload();
    });

    $("#btn-add").on("click", function () {
        var studentData = baseAjax("GET", "student/", "", accesskey);
        var option = '<select class="form-control" id="optionStudent">';
        for (var i = 0; i < studentData.data.length; i++) {
            var id = studentData.data[i].id;
            var name = studentData.data[i].first_name + ' ' + studentData.data[i].last_name;
            option += '<option value=' + id + '>' + name + '</option>';
        }
        option += '</select>';
        var template = '<div class="form-group"><label>Student</label>\
                          ' + option + '</div>\
                        <div class="form-group"><label>Absense Date</label>\
                        <input type="date" class="form-control" id="regis_time_from"></div>\
                        <div class="form-group"><label>Reason</label>\
                        <input type="text" class="form-control" id="reason"></div>\
                        <div class="form-group"><label>Status Accept</label>\
                        <select id="status_accpet"><option value="0">Decline</option><option value="1">Accept</option></select></div>\
                        <button class="btn btn-info" id="submitAbsense">Submit</button>\
                        </div>';
        $("#absenseTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputAbsense").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitAbsense").on("click", function () {
            var std_id = $("#optionStudent").val();
            var date = $("#regis_time_from").val();
            var reason = $("#reason").val();
            var status_accpet = $("#status_accpet").val();
            var param = {};
            param["std_id"] = std_id;
            param["date"] = date;
            param["reason"] = reason;
            param["status_accept"] = status_accpet;
            console.log(param)

            var response = baseAjax("POST", "absense/", param, accesskey);
            console.log(response)
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });


    $("#absenseTable").on("click",".btn-edit", function () {
        var id = $(this).closest("tr").find(".activityId").text();
        var stdName = $(this).closest("tr").find(".student").text();
        var stdId = $(this).closest("tr").find(".stdId").text();
        var date = $(this).closest("tr").find(".date").text();
        var reason = $(this).closest("tr").find(".reason").text();
        var status_accept = $(this).closest("tr").find(".status_accept").text();
        param["id"] = parseInt(id);
        var studentData = baseAjax("GET", "student/", "", accesskey);
        var option = '<select class="form-control" id="optionStudent">';
        for (var i = 0; i < studentData.data.length; i++) {
            var id = studentData.data[i].id;
            var name = studentData.data[i].first_name + ' ' + studentData.data[i].last_name;
            option += '<option value=' + id + '>' + name + '</option>';
        }
        option += '</select>';
        var template = '<div class="form-group"><label>Student: </label>\
                        '+option+'</div>\
                        <div class="form-group"><label>Reason</label>\
                        <input type="text" class="form-control" id="reason" value="'+reason+'"></div>\
                        <div class="form-group"><label>Date</label>\
                        <input type="date" class="form-control" id="absense_date" value="'+date+'"></div>\
                        <div class="form-group"><label>Status Accept</label>\
                        <select id="status_accpet"><option value="0">Decline</option><option value="1">Accept</option></select></div>\
                        <button class="btn btn-info" id="submitAbsense">Submit</button>\
                        </div>';
        $("#absenseTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputAbsense").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitAbsense").on("click", function () {
            var std_id = $("#optionStudent").val();
            var date = $("#absense_date").val();
            var reason = $("#reason").val();
            var status_accpet = $("#status_accpet").val();
            var param = {};
            param["id"] = id;
            param["std_id"] = std_id;
            param["date"] = date;
            param["reason"] = reason;
            param["status_accept"] = status_accpet;
            console.log(param)

            var response = baseAjax("PUT", "absense/"+id, param, accesskey);
            console.log(response)
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })
});