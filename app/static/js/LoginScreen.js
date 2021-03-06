var LoginScreen = (function(){
    var that = {};
    that.show = function(){
      $(".screen.login").show();
    };

    that.hide = function(){
      $(".screen.login").hide();
    };

    that.init = function(){
        $("#login-submit-btn").click(function(){
            that.logIn();
        })
        $("#login-register-btn").click(function(){
            UI.switchScreen("register");
        })
    }
	that.logIn = function(){
      var uinput = $('#login-name').val();
      var pinput = $('#login-password').val();
      if (uinput){
        console.log("Attempting to log in as: " + uinput);
        $.ajax({
          url : UTIL.CFG.api_endpoint,
          type : "POST",
          data : JSON.stringify({
            "username" : uinput,
            "password" : pinput
          }),
          dataType: "json",
            contentType: "application/json",
          success : function(data, status){
            console.log(data);
            if (data.error){
              //UI.feedback(data.message, true);
              alert("Wrong username or password.");
            }
            else {
              UI.setLoggedIn(true, uinput, pinput);
              //UI.feedback("Welcome back," + uinput + ".");
              //UI.switchScreen("main");
              // window.location.href = "services.html";
              window.location.href = "one";
            }
          }
        });
      }else{
        console.log("No username")
        UI.feedback("Please enter a username.", true);
      }
    }
    return that;
}());

LoginScreen.prototype = Screen;