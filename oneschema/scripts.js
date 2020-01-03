var noteElements = document.getElementsByTagName("article");
var notesElement = document.getElementById("notes");
var noteTemplate = document.getElementById("noteTemplate");
var noteInput = document.getElementById("noteInput");
var categoryInput = document.getElementById("categoryInput");
var keyboardListener = document.addEventListener("keypress", keyboard);
var dropListener = document.addEventListener("drop", onDrop);

function initialize() {
    load();
    order();
	orderRegister();
	save();
	load();
    render();
    log();
	console.log("END INITIALIZATION");
}
initialize();

function render() {
    for (var i = 0; i < dataNotes.length; i++) {
        var elementGhost = noteTemplate.content.cloneNode(true);
        notesElement.appendChild(elementGhost);
        var newElement = noteElements[noteElements.length - 1];
        newElement.setAttribute("id", dataNotes[i].id);
		newElement.addEventListener("dragstart", noteDrag);
        newElement.addEventListener("dragover", noteDragOver);
        newElement.addEventListener("drop", noteDrop);
		newElement.children[0].value = dataNotes[i].note;
		newElement.children[1].value = dataNotes[i].category ? dataNotes[i].category : '';
		newElement.children[2].addEventListener("click", deleteNote);
    }
}

function clearDisplay() {
    while (notesElement.firstChild) notesElement.removeChild(notesElement.firstChild);
}

function keyboard(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        if (e.target == noteInput || e.target == categoryInput) {
            addNote();
        } else if (e.target.getAttribute("name") == "note" || e.target.getAttribute("name") == "category") {
            saveNote(e);
        }
    }
}

function addNote() {
    add({
        "note": ""+noteInput.value,
        "category": categoryInput.value
    });
    noteInput.value = '';
    categoryInput.value = '';
    save();
    load();
    clearDisplay();
	order();
	orderRegister();
    render();
}

function deleteNote(e) {
	remove(e.target.parentElement.getAttribute("id"));
	save();
	load();
	clearDisplay();
	order();
	orderRegister();
	render();
}

function saveNote(e) {
    var id = e.target.parentElement.getAttribute("id");
    var key = e.target.getAttribute("name");
    var newNote = {};
    newNote[key] = e.target.value;
    set(id, newNote);
    save();
	load();
	clearDisplay();
	order();
	orderRegister();
	render();
}

function onDrop(e) {
	e.preventDefault();
	save();
	load();
	clearDisplay();
	order();
	orderRegister();
	render();
}