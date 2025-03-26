document.addEventListener("DOMContentLoaded", function() {
    function toggleMenu() {
        let menu = document.getElementById("menu");
        menu.classList.toggle("open");
    }

    document.querySelector(".menu-icon").addEventListener("click", toggleMenu);
});
