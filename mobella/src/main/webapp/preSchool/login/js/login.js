$(document).ready(function(){
  function baseAjax(method, url, param) {
    var urlAjax = "http://localhost:8080/api/" + url;
    var response;
    $.ajax({
      method: method,
      url: urlAjax,
      data: param,
      async: false,
      success: function(success){
        response = success;
      },
      error: function(){
        response = "error";
      }
    })
    return response;
  }
  $("#btn-login").click(function(){
    var username = $("#username").val();
    var password = $("#password").val();
    var param = {};
    param["username"] = username;
    param["password"] = password;
    var response = baseAjax("POST", "user/login", param);
    console.log(response)
    if(response.status == "error"){
      alert("Tên đăng nhập hoặc mật khẩu không đúng!!")
    } else if(response.status == "success") {
      console.log(response.data.role)
      sessionStorage.setItem("accessKey", response.data.accesskey);
      $.cookie("accessKey", response.data.accesskey)
      $.cookie("userId", response.data.id)
      $.cookie("userRole", response.data.role);
      window.location.href = "./dashboard.html";
    }
    
  });

  if($.cookie("accessKey") != undefined && $.cookie("accessKey") != null){
    window.location.href = "./dashboard.html";
  }
});