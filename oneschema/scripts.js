var noteElements = document.getElementsByTagName("article");
var notesElement = document.getElementById("notes");
var noteTemplate = document.getElementById("noteTemplate");
var noteInput = document.getElementById("noteInput");
var orderInput = document.getElementById("orderInput");
var keyboardListener = document.addEventListener("keypress", keyboard);

function initialize() {
    load();
    order();
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
		newElement.children[0].value = dataNotes[i].note;
		newElement.children[1].addEventListener("click", deleteNote);
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
    //var note = noteInput.value;
    add({
        "note": ""+noteInput.value,
        "order": parseInt(orderInput.value)
    });
    noteInput.value = '';
    orderInput.value = '';
    save();
    load();
    clearDisplay();
	order();
    render();
}

function deleteNote(e) {
	remove(e.target.parentElement.getAttribute("id"));
	save();
	load();
	clearDisplay();
	order();
	render();
}