var noteElements = document.getElementsByTagName("article");
var notesElement = document.getElementById("notes");
var noteTemplate = document.getElementById("noteTemplate");
var noteInput = document.getElementById("noteInput");
var categoryInput = document.getElementById("categoryInput");
var deadlineInput = document.getElementById("deadlineInput");
var filterInput = document.getElementById("filterInput");
var filterList = document.getElementById("filterList");
var deadlineFilter = document.getElementById("deadlineFilter");
var keyboardListener = document.addEventListener("keypress", keyboard);
var dropListener = document.addEventListener("drop", onDrop);
var filters = [];

function initialize() {
    load();
    order();
	orderRegister();
	save();
	load();
    render();
    filter();
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
		var newDeadline;
		if (dataNotes[i].deadline) {
		    var date = new Date(dataNotes[i].deadline);
		    var year = date.getFullYear();
		    var month = date.getMonth() + 1;
		    month < 10 ? month = "0" + month : month = "" + month;
		    var day = date.getDate();
		    day < 10 ? day = "0" + day : day = "" + day;
		    newDeadline = year + "-" + month + "-" + day;
		} else {
		    newDeadline = '';
		}
		newElement.children[2].value = newDeadline;
		newElement.children[3].addEventListener("click", deleteNote);
    }
}

function clearDisplay() {
    while (notesElement.firstChild) notesElement.removeChild(notesElement.firstChild);
}

function keyboard(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        if (e.target == noteInput || e.target == categoryInput || e.target == deadlineInput) {
            addNote();
        } else if (
            e.target.getAttribute("name") == "note" ||
            e.target.getAttribute("name") == "category" ||
            e.target.getAttribute("name") == "deadline") {
            saveNote(e);
        } else if (e.target == filterInput) {
          filterCategory(e);
        }
    }
}

function addNote() {
    add({
        "note": ""+noteInput.value,
        "category": categoryInput.value,
		"deadline": deadlineInput.value
    });
    noteInput.value = '';
    categoryInput.value = '';
	deadlineInput.value = '';
		
    save();
    load();
    clearDisplay();
	order();
	orderRegister();
    render();
    filter();
}

function deleteNote(e) {
	remove(e.target.parentElement.getAttribute("id"));
	save();
	load();
	clearDisplay();
	order();
	orderRegister();
	render();
	filter();
}

function saveNote(e) {
    var id = e.target.parentElement.getAttribute("id");
    var key = e.target.getAttribute("name");
    var newNote = {};
    
    var newValue;
    switch (key) {
        case "deadline":
            var d = e.target.value.split("-");
            var date = new Date(parseInt(d[0]), parseInt(d[1])-1, parseInt(d[2]));
            newValue = date.toISOString();
            break;
        default:
            newValue = e.target.value;
    }
    
    newNote[key] = newValue;
    set(id, newNote);
    save();
	load();
	clearDisplay();
	order();
	orderRegister();
	render();
	filter();
}

function onDrop(e) {
	e.preventDefault();
	save();
	load();
	clearDisplay();
	order();
	orderRegister();
	render();
	filter();
}



// Filter functionalities
// Seeing if this works, maybe this should be its own script file?
// filters declared at top
// placed filter function as part of any refresh functions

function filterToggle(e) {
    var newFilter = e.target.getAttribute("name");
    var index = filters.indexOf(newFilter);
    if (e.target.checked) {
        index == -1 ? filters.push(newFilter) : null;
    } else {
        index != -1 ? filters.splice(index, 1) : null;
    }
    
    filter();
}

function filterCategory(e) {
  var newFilter = filterInput.value;
  var index = filters.indexOf(newFilter);
  index == -1 ? filters.push(newFilter) : filters.splice(index, 1);
  
  filterInput.value = '';
  filter();
}

function filter() {
    // first, set all to hidden true
    for (var i = 0; i < noteElements.length; i++) {
        noteElements[i].setAttribute("hidden", true);
    }
    
    // then, remove hidden if filter
    for (var i = 0; i < filters.length; i++) {
        switch(filters[i]) {
            case "deadlineFilter":
                filterDeadline();
                break;
            default:
              filterByCategory(filters[i]);
        }
    }
    
    // if no filters, then clear filters and show all
    if (filters.length <= 0) {
        filterClear();
    }
    
    // finally, display the current filters applied
    renderFilterList();
}

function filterDeadline() {
	for (var i = 0; i < dataNotes.length; i++) {
		if (dataNotes[i]["deadline"]) {
			document.getElementById(dataNotes[i]["id"]).removeAttribute("hidden");
		}
	}
}

function filterByCategory(category) {
  // if it wasn't for the filterToggle, i could at least make this O(n) instead of O(nf)
  for (var i = 0; i < dataNotes.length; i++) {
		if (dataNotes[i]["category"] == category) {
			document.getElementById(dataNotes[i]["id"]).removeAttribute("hidden");
		}
	}
}

function filterClear() {
    for (var i = 0; i < noteElements.length; i++) {
        noteElements[i].removeAttribute("hidden");
    }
}

function renderFilterList() {
  var result = "";
  for (var i = 0; i < filters.length; i++) {
    result += " " + filters[i] + ",";
  }
  result = result.substring(0, result.length -1);
  filterList.innerHTML = result;
}