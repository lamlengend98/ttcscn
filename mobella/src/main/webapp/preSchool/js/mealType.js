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

    function getMealType(response, accesskey) {
        var data = response.data;
        var inputMealType = '<thead>\
                                    <th>ID</th>\
                                    <th>Breakfast</th>\
                                    <th>Breakfast Sub</th>\
                                    <th>Lunch</th>\
                                    <th>Lunch Sub</th>\
                                    <th>Date</th>\
                                    <th>Options</th>\
                                </thead>\
                                <tbody>';
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            var breakfast = data[i].breakfast;
            var breakfast_sub = data[i].breakfast_sub;
            var lunch = data[i].lunch;
            var lunch_sub = data[i].lunch_sub;
            var date_meal = data[i].date_meal.substr(0,10);

            inputMealType += '<tr style="text-align: center">\
                                <td class="id">'+id+'</td> \
                                <td class="breakfast">' + breakfast + '</td>\
                                <td class="breakfast_sub">' + breakfast_sub + '</td>\
                                <td class="lunch">' + lunch + '</td>\
                                <td class="lunch_sub">' + lunch_sub + '</td>\
                                <td class="date_meal">' + date_meal + '</td>\
                                <td style="padding-right:0;display:table-cell">\
                                <i style="font-size:25px;margin-right:20px" class="fa fa-edit btn-edit"></i>\
                                <i style="font-size:25px" class="fa fa-trash btn-delete"></i>\
                                </td>\
                            </tr>';
        }
        inputMealType += '</tbody>';

        $("#mealTypeTable").html(inputMealType);
        $("#mealTypeTable").DataTable({})
    }

    var param = {};
    var accesskey = $.cookie('accessKey');
    var response = baseAjax("GET", "mealType", '', accesskey);
    getMealType(response, accesskey);

    $("#mealTypeTable").on("click",".btn-delete", function () {
        var id = $(this).closest("tr").find(".id").text();
        console.log(id)
        var response = baseAjax("DELETE", "mealType/" + id, "", accesskey);
        if(response.status == "success"){
            location.reload();
        } else {
            alert('Xóa thất bại!');
        }
    });

    $("#btn-add").on("click", function () {
        var template = '<div class="form-group"><label>Breakfast</label>\
                        <input class="form-control" type="text" id="breakfast"></div>\
                        <div class="form-group"><label>Breakfast Sub</label>\
                        <input class="form-control" type="text" id="breakfast_sub"></div>\
                        <div class="form-group"><label>Lunch</label>\
                        <input class="form-control" type="text" id="lunch"></div>\
                        <div class="form-group"><label>Lunch Sub</label>\
                        <input class="form-control" id="lunch_sub" type="text"></div>\
                        <div class="form-group"><label>Date Meal</label>\
                        <input type="date" class="form-control" id="date"> \
                        <button class="btn btn-info" id="submitMealType">Submit</button>\
                        </div>';
        $("#mealTypeTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputMealType").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitMealType").on("click", function () {
            var breakfast = $("#breakfast").val();
            var breakfast_sub = $("#breakfast_sub").val();
            var lunch = $("#lunch").val();
            var lunch_sub = $("#lunch_sub").val();
            var date_meal = $("#date").val();

            var param = {};
            param["breakfast"] = breakfast;
            param["breakfast_sub"] = breakfast_sub;
            param["lunch"] = lunch;
            param["lunch_sub"] = lunch_sub;
            param["date_meal"] = date_meal;
            console.log(param)

            var response = baseAjax("POST", "mealType/", param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    });


    $("#mealTypeTable").on("click",".btn-edit", function () {
        console.log(1);
        var id = $(this).closest("tr").find(".id").text();
        var breakfast = $(this).closest("tr").find(".breakfast").text();
        var breakfast_sub = $(this).closest("tr").find(".breakfast_sub").text();
        var lunch = $(this).closest("tr").find(".lunch").text();
        var lunch_sub = $(this).closest("tr").find(".lunch_sub").text();
        var date_meal = $(this).closest("tr").find(".date_meal").text();

        var template = ' <div class="form-group"><label>Breakfast</label>\
                        <input class="form-control" type="text" id="breakfast" value="'+breakfast+'"></div>\
                        <div class="form-group"><label>Class Name</label>\
                        <input class="form-control" type="text" id="breakfast_sub" value="'+breakfast_sub+'"></div>\
                        <div class="form-group"><label>Lunch</label>\
                        <input class="form-control" type="text" id="lunch" value="'+lunch+'"></div>\
                        <div class="form-group"><label>Lunch Sub</label>\
                        <input class="form-control" type="text" id="lunch_sub" value="'+lunch_sub+'"></div>\
                        <div class="form-group"><label>Date Meal</label>\
                        <input class="form-control" type="text" id="date_meal" value="'+date_meal+'"></div>\
                        <button class="btn btn-info" id="submitMealType">Submit</button>\
                        </div>';
        $("#mealTypeTable_wrapper").hide();
        $("#btn-add").hide();
        $("#inputMealType").html(template);
        $("body").append("<script type='text/javascript'>tinymce.init({selector: '#mytextarea',init_instance_callback : function(editor) {}});</script>");

        $("#submitMealType").on("click", function () {
            var breakfast = $("#breakfast").val();
            var breakfast_sub = $("#breakfast_sub").val();
            var lunch = $("#lunch").val();
            var lunch_sub = $("#lunch_sub").val();
            var date_meal = $("#date_meal").val();

            var param = {};
            param["id"] = id;
            param["breakfast"] = breakfast;
            param["breakfast_sub"] = breakfast_sub;
            param["lunch"] = lunch;
            param["lunch_sub"] = lunch_sub;
            param["date_meal"] = date_meal;
            console.log(param)

            var response = baseAjax("PUT", "mealType/"+id, param, accesskey);
            if (response.status == "success") {
                window.location.reload();
            }
        });
    })
});