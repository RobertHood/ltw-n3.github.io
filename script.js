function changeToRegister(){
    document.getElementById("change-to-register").classList.add("hidden");
    document.getElementById("change-to-login").classList.add("visible");
    
    document.getElementById("login-box").classList.add("slide-over-right-to-left-to-fade");
    document.getElementById("login-box").classList.remove("slide-over-left-to-right-to-appear");

    document.getElementById("register-box").classList.add("slide-over-right-to-left-to-appear");
    document.getElementById("register-box").classList.remove("slide-over-left-to-right-to-fade");

    
}

function changeToLogIn(){
    document.getElementById("change-to-register").classList.remove("hidden");
    document.getElementById("change-to-login").classList.remove("visible");
    
    document.getElementById("login-box").classList.add("slide-over-left-to-right-to-appear");
    document.getElementById("login-box").classList.remove("slide-over-right-to-left-to-fade");

    document.getElementById("register-box").classList.remove("slide-over-right-to-left-to-appear");
    document.getElementById("register-box").classList.add("slide-over-left-to-right-to-fade");
    
}

