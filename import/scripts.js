initialize();

var keyboardListener = document.addEventListener("keypress", keyboard);

function keyboard(e) {
  if (e.keyCode == 13 && e.target.tagName == "TEXTAREA") {
    e.preventDefault();
    if (e.target.value.length == 0) {
      wipe();
    } else {
      localStorage.setItem("data", e.target.value);
    }
  }
}
