function showPopup(text) {
    document.getElementById("popup-text").innerText = text;
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
