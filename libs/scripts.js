var noteElements = document.getElementsByName("onenote");
var notesElement = document.getElementById("notes");
var noteTemplate = document.getElementById("noteTemplate");

function initialize() {
    load();
    //render();
}
initialize();

function render() {
    for (var i = 0; i < dataNotes.length; i++) {
        var elementGhost = noteTemplate.content.cloneNode(true);
        notesElement.appendChild(elementGhost);
        var newElement = noteElements[noteElements.length - 1];
        newElement.setAttribute("id", dataNotes[i].id);
		for (var j = 0; j < newElement.children.length; j++) {
			var key = newElement.children[j].getAttribute("name");
			if (dataNotes[i][key]) {
			    newElement.children[j].value ? newElement.children[j].value = dataNotes[i][key] : newElement.children[j].innerHTML = dataNotes[i][key];
			}
		}
    }
}

function clearDisplay() {
    while (notesElement.firstChild) notesElement.removeChild(notesElement.firstChild);
}