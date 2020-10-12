$(document).ready(function () {
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

    $("#btn-register").on("click", function () {
        var username = $("#username").val();
        var password = $("#password").val();
        var copassword = $("#copassword").val();
        var email = $("#email").val();
        var address = $("#address").val();
        var phone = $("#phone").val();

        if (username.length == 0 || password.length == 0 || email.length == 0 || address.length == 0 || phone.length == 0) {
            alert("Vui lòng điền đầy đủ thông tin!!!!")
            return;
        } else if (password !== copassword) {
            alert("Mật khẩu không trùng khớp!!!!")
        }  else {

            var param = {};
            param["username"] = username;
            param["password"] = password;
            param["email"] = email;
            param["address"] = address;
            param["phone"] = phone;

            console.log({user: param})
            var regexPassword = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/);
            const regexNumberPhone = new RegExp(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/);
            const regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


            if (!regexPassword.test(password)) {
                alert("Mật khẩu phải có từ 8 đến 20 ký tự, bao gồm ký tự in hoa, thường, số và ký tự đặc biệt ")
                return;
            }
            if (!regexEmail.test(email)) {
                alert("Email không đúng định dạng")
                return;
            }
            if (!regexNumberPhone.test(phone)) {
                alert("Số điện thoại không đúng định dạng")
                return;
            }
            var response = baseAjax("POST", "register", param);
            console.log("response", response)
            if (response.status == "0") {
                window.location.href = "../html/login.html";
            }
        }
    })
});