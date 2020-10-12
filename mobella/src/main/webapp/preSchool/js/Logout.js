$(document).ready(function(){
      $("#btn-logout").click(function(){
          sessionStorage.removeItem('token');
          console.log(1)
          window.location.href = "./login.html";
          console.log(2)
      })
})