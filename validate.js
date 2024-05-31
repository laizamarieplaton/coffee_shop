var attempt = 0;

function log_out() {
    window.location.href = "login.html";
}

function LogIn(event) {
    event.preventDefault(); // Prevent form from submitting
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;  

    if (username === "laizaplaton@gmail.com" && password === "123456") {
        window.location.href = "home.html";
        return true;
    } else {
        attempt++;
        if (attempt >= 3) {
            alert("Cannot login. Attempts exceeded!");
            document.getElementById("btn_login").disabled = true;
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            return false;
        } else {
            alert("Incorrect email or password.");
            return false;
        }
    }
}
