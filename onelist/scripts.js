render();

function filter() {
	// remove elements not pertinent
	var date = new Date();
	var userTimezoneOffset = date.getTimezoneOffset();
	var now = new Date(date.getTime() - (userTimezoneOffset * 60000));

	for (var i = 0; i < dataNotes.length; i++) {
		var deadline = dataNotes[i]["deadline"] ? new Date(dataNotes[i]["deadline"]) : dataNotes[i]["deadline"];
		if (!deadline || deadline > now) {
		    notesElement.removeChild(document.getElementById(dataNotes[i]["id"]));
		}
	}
}
filter();