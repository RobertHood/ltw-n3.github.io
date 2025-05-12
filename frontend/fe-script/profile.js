document.addEventListener("DOMContentLoaded",async () => {
    function displayUserInfo() {
    const username = getCookie('username');
    const verified = getCookie('verified');
    const registered = getCookie('createdAt');  
    
    const remove = registered.split("T")[0];
    const date = new Date(remove.slice(3));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    document.getElementById('username').textContent = username;
    document.getElementById('verified').textContent = verified;
    document.getElementById('registered').textContent = formattedDate;
    }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;  
    }

  window.onload = function() {
    displayUserInfo();
  };
});