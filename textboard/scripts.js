var noteElements = document.getElementsByTagName("textarea");
var textboardElement = document.getElementById("textboard");
var noteTemplate = document.getElementById("noteTemplate");
var keyboardListener = document.addEventListener("keypress", navigationKeyboard);
var currentFocus;
var idCount = 1;

function initialize() {
    for (var i = 0; i < noteElements.length; i++) {
        noteElements[i].addEventListener("focus", noteSelection);
        noteElements[i].addEventListener("dragstart", noteDrag);
        noteElements[i].addEventListener("dragover", noteDragOver);
        noteElements[i].addEventListener("drop", noteDrop);
    }
    noteElements[0].focus();
    
    currentFocus = 0;
}
initialize();

function navigationKeyboard(e) {
    if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        //noteRefresh(currentFocus);
        navigateRight(currentFocus);
    } else if (e.keyCode == 13 && e.shiftKey) {
        e.preventDefault();
        navigateLeft();
    }
}

function noteSelection(e) {
    currentFocus = -1;
    for (var i = 0; i < noteElements.length; i++) {
        if (noteElements[i] == e.target) {
            currentFocus = i;
            break;
        }
    }
}

function noteRefresh(i) {
    noteElements[i].blur();
}

function newNote() {
    var elementGhost = noteTemplate.content.cloneNode(true);
    textboard.appendChild(elementGhost);
    idCount++;
    var newElement = noteElements[noteElements.length - 1];
    newElement.setAttribute("id", idCount);
    newElement.addEventListener("focus", noteSelection);
    newElement.addEventListener("dragstart", noteDrag);
    newElement.addEventListener("dragover", noteDragOver);
    newElement.addEventListener("drop", noteDrop);

}

function navigateRight() {
    currentFocus++;
    if (currentFocus >= noteElements.length) {
        newNote();
    }
    noteElements[currentFocus].focus();
}

function navigateLeft() {
    currentFocus--;
    if (currentFocus < 0) {
        currentFocus = 0;
    }
    noteElements[currentFocus].focus();
}

function noteDrag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function noteDrop(e) {
    e.preventDefault();
    var elementSource = e.dataTransfer.getData("text");
    elementSource = document.getElementById(elementSource);
    var targetData = e.target.value;
    e.target.value = elementSource.value;
    elementSource.value = targetData;
}

function noteDragOver(e) {
    e.preventDefault();
}