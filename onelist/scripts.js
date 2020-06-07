initialize();

render();

function filter() {
	// remove elements not pertinent
	var now = new Date();

	for (var i = 0; i < dataNotes.length; i++) {
		var deadline = dataNotes[i]["deadline"] ? new Date(dataNotes[i]["deadline"]) : dataNotes[i]["deadline"];
		if (!deadline || deadline > now) {
		    notesElement.removeChild(document.getElementById(dataNotes[i]["id"]));
		}
	}
}
filter();

function saveNote(e) {
    var dayNum = 0; // this could be a parameter, but I always want sundays
    var date = new Date();
    var daysToNextWeekDay = 7 + dayNum - date.getDay();

    var sunday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + daysToNextWeekDay);
    var newDeadline = sunday.toISOString();

    var id = e.target.parentElement.getAttribute("id");
    var key = "deadline";
    var newNote = {};
    newNote[key] = newDeadline;
    set(id, newNote);
    save();
	load();
	clearDisplay();
	render();
	filter();
}

function deleteNote(e) {
	remove(e.target.parentElement.getAttribute("id"));
	save();
	load();
	clearDisplay();
	render();
	filter();
}