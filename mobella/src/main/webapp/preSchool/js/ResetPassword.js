$(document).ready(function(){
    function baseAjax(method, url, param) {
        var urlAjax = "http://localhost:8080/" + url;
        var response;
        console.log(param)
        $.ajax({
            method: method,
            url: urlAjax,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(param),
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

    $("#btn-reset").click(function(){
        var password = $("#password").val();
        var copassword = $("#copassword").val();
        var token = new URLSearchParams(window.location.search).get('token')
        var regexPassword = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/);
        if (password !== copassword) {
            alert("Mật khẩu không trùng khớp!!!!")
            return
        }

        if (!regexPassword.test(password)) {
            alert("Mật khẩu phải có từ 8 đến 20 ký tự, bao gồm ký tự in hoa, thường, số và ký tự đặc biệt ")
            return;
        }
        let param = {
            password: password,
            token: token
        }
        var response = baseAjax("POST", "resetPassword", param);
        console.log("response", response)
        if (response.status == "0") {
            window.location.href = "../html/login.html";
        } else {
            alert("Vui lòng thử lại")
        }
    })
})