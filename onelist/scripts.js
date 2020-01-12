function filter() {
	// for now simply hide elements that are not pertinent
	var now = Date.now();
	for (var i = 0; i < dataNotes.length; i++) {
		var deadline = dataNotes[i]["deadline"] ? new Date(dataNotes[i]["deadline"]) : dataNotes[i]["deadline"];
		if (!deadline || deadline > now) {
			document.getElementById(dataNotes[i]["id"]).setAttribute("hidden", true);
		}
	}
}
filter();