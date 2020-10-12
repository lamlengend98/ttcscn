$(document).ready(function(){
    function baseAjax(method, url, param, accesskey) {
        var urlAjax = "http://localhost:8080/" + url;
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
    var token = sessionStorage.getItem("token");
    console.log(token)
    if(token === undefined || token == null || token === ''){
        if(window.location.href.indexOf("login") < 0) {
            alert("Vui lòng đăng nhập");
            window.location.href = "./login.html";
        }
    } else {
        const response = baseAjax('POST', 'checkToken', {token: token})
        if (response.status != "0") {
            if(window.location.href.indexOf("login") < 0) {
                alert("Vui lòng đăng nhập");
                window.location.href = "./login.html";
            }
        } else {
            if(window.location.href.indexOf("login") > 0) {
                window.location.href = "./dashboard.html";
            }
        }
    }

});