document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerBtn").addEventListener("click", changeToRegister);
    document.getElementById("loginBtn").addEventListener("click", changeToLogIn);
    
    document.getElementById("login-form").addEventListener("submit", async function(event) {
        event.preventDefault(); 
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log(email, password);
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                document.getElementById("error-message").style.color = "limegreen";
                document.getElementById("error-message").textContent = "Login successful! Redirecting...";
                window.location.href = "/";
            } else {
                console.error(data.message);
                document.getElementById("error-message").textContent = data.message;
            }
        }
        catch (error) {
            console.error(error);
            document.getElementById("error-message").textContent = "An error occurred. Please try again later.";
        }
    });

    document.getElementById("register-form").addEventListener("submit", async function(event) {
        event.preventDefault(); 
        const username = document.getElementById("usernameR").value;
        const email = document.getElementById("emailR").value;
        const password = document.getElementById("passwordR").value;
        console.log(username, email, password);
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                document.getElementById("error-register").style.color = "limegreen";
                document.getElementById("error-register").textContent = "Registration successful! Go to the login page to log in.";
                
            } else {
                console.error(data.message);
                document.getElementById("error-register").textContent = data.message;
            }
        }
        catch (error) {
            console.error(error);
            document.getElementById("error-message").textContent = "An error occurred. Please try again later.";
        }
    }
    );
});




function changeToRegister(){
    document.getElementById("change-to-register").classList.add("hidden");
    document.getElementById("change-to-login").classList.add("visible");
    
    document.getElementById("login-box").classList.add("slide-over-right-to-left-to-fade");
    document.getElementById("login-box").classList.remove("slide-over-left-to-right-to-appear");
    document.getElementById("login-box").classList.add("bring-to-back");
    document.getElementById("login-box").classList.remove("bring-to-front");

    document.getElementById("register-box").classList.add("slide-over-right-to-left-to-appear");
    document.getElementById("register-box").classList.remove("slide-over-left-to-right-to-fade");
    document.getElementById("register-box").classList.add("bring-to-front");
    document.getElementById("register-box").classList.remove("bring-to-back");
}

function changeToLogIn(){
    document.getElementById("change-to-register").classList.remove("hidden");
    document.getElementById("change-to-login").classList.remove("visible");
    
    document.getElementById("login-box").classList.add("slide-over-left-to-right-to-appear");
    document.getElementById("login-box").classList.remove("slide-over-right-to-left-to-fade");
    document.getElementById("login-box").classList.add("bring-to-front");
    document.getElementById("login-box").classList.remove("bring-to-back");

    document.getElementById("register-box").classList.remove("slide-over-right-to-left-to-appear");
    document.getElementById("register-box").classList.add("slide-over-left-to-right-to-fade");
    document.getElementById("register-box").classList.add("bring-to-back");
    document.getElementById("register-box").classList.remove("bring-to-front");
    
}

// function enableComments(){
//     const userId = {
//         name: null,
//         identify: null,
//         image: null,
//         message: null,
//         date: null
//     }
    
//     const userComment = document.querySelector(".user-cmt");
//     const publishBtn = document.querySelector("#publish");
//     const cmts = document.querySelector(".comments");
//     const userName = document.querySelector(".user");
    
//     userComment.addEventListener("input", e => {
//         if(!userComment.value){
//             publishBtn.setAttribute("disabled", "disabled");
//             publishBtn.classList.remove("abled");
//         }
//         else{
//             publishBtn.removeAttribute("disabled");
//             publishBtn.classList.add("abled");
//         }
//     })

//     function addPost(){
//         console.log("goods");
//         if(!userComment.value) return;
//         userId.name = userName.value;
//         if(userId.name === "Anonymous"){
//             userId.identify = "false";
//             userId.image = "asset/amidisabled.png";
//         }else{
//             userId.identify = true;
//             userId.image = "asset/dinhvanbeo.jpg";
//         }
//         userId.message = userComment.value;
//         userId.date = new Date().toLocaleString();
//         let published = 
//         `<div class = "AppCmts">
//             <img src="${userId.image}">
//             <div>
//                 <h1>${userId.name}</h1>
//                 <p>${userId.message}</p>
//                 <span class="date">${userId.date}</span>
//             </div>
//         </div>`;


//         let comments = document.querySelector(".comments");
//         comments.innerHTML += published;
//         userComment.value = "";

//         let commentsNum = document.querySelectorAll(".AppCmts").length;
//         document.getElementById("comment").textContent = commentsNum;
//     }

//     publishBtn.addEventListener("click", addPost)
// }