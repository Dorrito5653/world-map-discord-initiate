function openNav() {
    document.getElementById('sidebar').style.transform = 'translateX(0)';
    document.querySelector('.sidebar-openbtn').style.display = 'none';
}

function closeNav() {
    document.getElementById('sidebar').style.transform = "translateX(-200px)";
    document.querySelector('.sidebar-openbtn').style.display = 'initial';
}