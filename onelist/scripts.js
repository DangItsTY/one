function filter() {
	console.log(dataNotes);
	// for now simply hide elements that are not pertinent
	var now = Date.now();
	for (var i = 0; i < dataNotes.length; i++) {
		console.log(dataNotes[i]["deadline"]);
		var deadline = new Date(dataNotes[i]["deadline"]);
		console.log(deadline);
		if (!dataNotes[i]["deadline"] || dataNotes[i]["deadline"] > now) {
			document.getElementById(dataNotes[i]["id"]).setAttribute("hidden", true);
		}
	}
}
filter();