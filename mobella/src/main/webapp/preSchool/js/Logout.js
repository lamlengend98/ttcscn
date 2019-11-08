$(document).ready(function(){
      $("#btn-logout").click(function(){
          $.removeCookie('accessKey');
          $.removeCookie('userId');
          $.removeCookie('userRole');
          window.location.href = "./login.html";
      })
})