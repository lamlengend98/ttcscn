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

    var accesskey = $.cookie("accesskey");

    $("#btn-register").on("click", function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var role = $("#role").val();

        var param = {};
        param["username"] = username;
        param["password"] = password;
        param["role"] = role;

        console.log(param)
        var response = baseAjax("POST", "/user/register", param, accesskey);
        if (response.status == "success") {
            window.location.href = "../html/login.html";
        }
    })
});