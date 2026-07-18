var endDate = new Date();

initialize();

render();

function filter() {
  // remove elements not pertinent

  for (var i = 0; i < dataNotes.length; i++) {
    var deadline = dataNotes[i]["deadline"]
      ? new Date(dataNotes[i]["deadline"])
      : dataNotes[i]["deadline"];
    if (!deadline || deadline > endDate) {
      notesElement.removeChild(document.getElementById(dataNotes[i]["id"]));
    }
  }
}
filter();

function saveNote(e) {
  var sunday = nextWeek(new Date(), 0);
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

function nextWeek(date, day) {
  //  returns the next week given the date (usually the now date) and day in integer
  //  0 is sunday and 6 is saturday
  //  note: next week can mean this or following or coming up, it's literally next
  var daysToNextWeekDay = (7 + (day - date.getDay())) % 7;
  daysToNextWeekDay = daysToNextWeekDay === 0 ? 7 : daysToNextWeekDay;
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + daysToNextWeekDay,
  );
}

//  Load to the next sunday, additive
function future() {
  endDate = nextWeek(endDate, 0);

  load();
  clearDisplay();
  render();
  filter();
}
