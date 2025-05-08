document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("lol-carousel").addEventListener("click", () => {
        //go to lol homepage
        window.location.href = "/html/lol-homepage.html";
    });
    document.getElementById("val-carousel").addEventListener("click", () => {
        window.location.href = "/html/valorant-homepage.html";
    });
    document.getElementById("tft-carousel").addEventListener("click", () => {
        window.location.href = "/html/tft-homepage.html";
    }); 
    
    document.getElementById("logout-btn").addEventListener("click", async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                window.location.href = "/html/login.html";
            } else {
                console.error("Logout failed.");
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    }
    );
});