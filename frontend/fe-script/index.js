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
});