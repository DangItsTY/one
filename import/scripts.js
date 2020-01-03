var keyboardListener = document.addEventListener("keypress", keyboard);

function keyboard(e) {
    if (e.keyCode == 13 && e.target.tagName == "TEXTAREA") {
        e.preventDefault();
        localStorage.setItem("data", e.target.value);
    }
}