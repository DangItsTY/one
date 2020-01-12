function initialize() {
    console.log("use this function to do any type of initial loading necessary for the tool.")
}
initialize();

function render() {
	console.log("actually display the notes with this function");
}

function filter() {
    console.log("default filter function to only show what is filtered");
}

function filterDeadline() {
    console.log("a simple way to hide all notes that are not due today");
    var now = Date.now();
	for (var i = 0; i < dataNotes.length; i++) {
		var deadline = dataNotes[i]["deadline"] ? new Date(dataNotes[i]["deadline"]) : dataNotes[i]["deadline"];
		if (!deadline || deadline > now) {
			document.getElementById(dataNotes[i]["id"]).setAttribute("hidden", true);
		}
	}
}