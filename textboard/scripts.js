var noteElements = document.getElementsByTagName("textarea");
var textboardElement = document.getElementById("textboard");
var keyboardListener = document.addEventListener("keypress", navigationKeyboard);
var currentFocus;
var noteTemplate = document.getElementById("noteTemplate");

function initialize() {
    noteElements[0].focus();
    currentFocus = 0;
}
initialize();

function navigationKeyboard(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        //noteRefresh(currentFocus);
        navigateRight(currentFocus);
    }
}

function noteRefresh(i) {
    noteElements[i].blur();
}

function newNote() {
    var element = noteTemplate.content.cloneNode(true);
    textboard.appendChild(element);
}

function navigateRight(i) {
    currentFocus = i + 1;
    if (currentFocus >= noteElements.length) {
        newNote();
    }
    noteElements[currentFocus].focus();
}