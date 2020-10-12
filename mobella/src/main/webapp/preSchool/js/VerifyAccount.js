$(document).ready(function(){
    function baseAjax(method, url, param, accesskey) {
        var urlAjax = "http://localhost:8080/" + url;
        var response;
        $.ajax({
            method: method,
            url: urlAjax,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + accesskey)
            },
            data: JSON.stringify(param),
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

    $("#btn-submit").click(function(){
        var username = $("#username").val();
        var email = $("#email").val();
        const regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (username.length == 0 || email.length == 0) {
            alert("Vui lòng điền đầy đủ thông tin!!!!")
            return;
        }
        if (!regexEmail.test(email)) {
            alert("Email không đúng định dạng")
            return;
        }
        let param = {
            username: username,
            email: email
        }
        var response = baseAjax("POST", "verifyAccount", param);
        console.log("response", response)
        if (response.status == "0") {
            alert("Thông tin lấy lại mật khẩu đã được gửi vào địa chỉ email!!! Vui lòng kiểm tra")
        } else {
            alert("Vui lòng kiểm tra lại thông tin")
        }
    })
})