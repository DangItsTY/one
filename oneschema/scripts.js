var noteElements = document.getElementsByTagName("article");
var notesElement = document.getElementById("notes");
var noteTemplate = document.getElementById("noteTemplate");
var noteInput = document.getElementById("noteInput");
var keyboardListener = document.addEventListener("keypress", keyboard);

function initialize() {
    load();
    render();
}
initialize();

function render() {
    for (var i = 0; i < dataNotes.length; i++) {
        var elementGhost = noteTemplate.content.cloneNode(true);
        notesElement.appendChild(elementGhost);
        var newElement = noteElements[noteElements.length - 1];
        newElement.innerHTML = dataNotes[i].note;
        newElement.setAttribute("id", dataNotes[i].id);
    }
}

function clearDisplay() {
    while (notesElement.firstChild) notesElement.removeChild(notesElement.firstChild);
}

function keyboard(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        addNote();
    }
}

function addNote() {
    var note = noteInput.value;
    add({"note": ""+note});
    noteInput.value = '';
    save();
    load();
    clearDisplay();
    render();
}