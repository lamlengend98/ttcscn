$(document).ready(function(){
    var accessKey = $.cookie("accessKey");
    if(accessKey == undefined || accessKey == null){
        alert("Vui lòng đăng nhập");
        window.location.href = "./login.html";
    } else {
        var role = $.cookie("userRole");
        if(role == 10){
            $("#school").hide();
        }
        if(role != 10 && role != 13){
            alert("You have no permission for accessing to website");
            $.removeCookie("accessKey")
            window.location.href = "./login.html";
        }
    }

});