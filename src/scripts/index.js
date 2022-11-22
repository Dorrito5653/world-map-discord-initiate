function openNav() {
    document.getElementById('sidebar').style.transform = 'translateX(0)';
    document.querySelector('.sidebar-openbtn').style.display = 'none';
}

function closeNav() {
    document.getElementById('sidebar').style.transform = "translateX(-200px)";
    document.querySelector('.sidebar-openbtn').style.display = 'initial';
}

function docINIT(){
    
}

function init() {
    var token = localStorage.getItem("token")
    var xhr = new XMLHttpRequest()
    xhr.open("GET", "http://localhost:3000/config", true)
    xhr.setRequestHeader('token', token)
    xhr.onload = function(){
        if (xhr.status == 500) {
            alert("There was an error getting your account")
            return;
        }
        alert("Got account succesfully")
    }
}