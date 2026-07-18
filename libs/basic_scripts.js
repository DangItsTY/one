function initialize() {
  console.log(
    "use this function to do any type of initial loading necessary for the tool.",
  );
}
initialize();

function render() {
  console.log("actually display the notes with this function");
}

function filter() {
  console.log("default filter function to only show what is filtered");
}

function filterDeadline() {
  console.log("a simple way to hide all notes with no deadline");
  var now = Date.now();
  if (e.target.checked) {
    for (var i = 0; i < dataNotes.length; i++) {
      if (!dataNotes[i]["deadline"]) {
        document
          .getElementById(dataNotes[i]["id"])
          .setAttribute("hidden", true);
      }
    }
  } else {
    filterClear();
  }
}
