$(document).ready(function () {
    function baseAjax(method, url, param) {
        var urlAjax = "http://localhost:8080/" + url;
        var response;
        $.ajax({
            method: method,
            url: urlAjax,
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

    $("#btn-login").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var mediumRegex = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/);
        if(!mediumRegex.test(password)) {
            alert("Mật khẩu phải có từ 8 đến 20 ký tự, bao gồm ký tự in hoa, thường, số và ký tự đặc biệt ")
            return ;
        }
        var response = baseAjax("POST", "login", {username: username, password: password});
        console.log(response)
        if (response.status != "0") {
            alert("Tên đăng nhập hoặc mật khẩu không đúng!!")
        } else if (response.status == "0") {
            window.location.href = "./dashboard.html";
        }
        sessionStorage.setItem("token", response.result.token)
    });

    $("#btn-register").click(() => {
        window.location.href = "./register.html"
    })

    $("#forgot-password").click(() => {
        window.location.href = "./forgot-password.html"
    })
});