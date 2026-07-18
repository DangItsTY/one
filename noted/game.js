//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Global Variables
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

var noteTemplate = {
  index: 0,
  header: "One liner",
  body: "description",
  footer: "references",
  creation_datetime: "",
  lastmodified_datetime: "",
  lastmodifiedby_who: "",
};
var noteList = [];
var data;
var who = "Person";

//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Note Scripts
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

//	Creates a basic note with all necessary information
function makeNote(header, body, footer) {
  var newNote = JSON.stringify(noteTemplate);
  newNote = JSON.parse(newNote);
  newNote.index = noteList.length;
  newNote.header = header;
  newNote.body = body;
  newNote.footer = footer;
  newNote.creation_datetime = new Date();
  newNote.lastmodified_datetime = new Date();
  newNote.lastmodifiedby_who = who;
  return newNote;
}

//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Render Scripts
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

//	Render a todo item
function renderItem(data) {
  var data = data;
  var target = document.getElementById("list");

  var article = document.createElement("article");
  article.className = "item";
  article.addEventListener("click", checkedItem);
  article.id = data.index;
  if (data.checked) {
    article.classList.add("checked");
  }

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  if (data.checked) {
    checkbox.setAttribute("checked", true);
  }

  var span_header = document.createElement("span");
  span_header.innerHTML = data.header;

  article.appendChild(checkbox);
  article.appendChild(span_header);
  target.appendChild(article);
}

function toggleEdit() {
  var element = document.getElementById("edit");
  var input = document.getElementById("editInput");
  var add = document.getElementById("add");
  if (element.classList.length < 2) {
    element.classList.add("opened");
    input.value = "";
    input.focus();
    add.classList.add("pressed");
  } else {
    element.classList.remove("opened");
    add.classList.remove("pressed");
  }
}

function renderClear() {
  var target = document.getElementById("list");
  target.innerHTML = "";
}

function goLeft() {
  previousList();
  load();
  renderClear();
  render();
}

function goRight() {
  nextList();
  load();
  renderClear();
  render();
}

//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Data Scripts
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

var dataIndex = 0;

function add() {
  event.preventDefault();
  var inputs = event.target.elements;
  var header = inputs[0].value;
  var body = "";
  var footer = "";
  var note = makeNote(header, body, footer);
  console.log(noteList);
  noteList.push(note);
  renderItem(note);
  toggleEdit();
  save();
}

function save() {
  var dataValue = noteList;
  console.log(dataValue);
  var data = { data: dataValue };
  console.log(data);
  data = JSON.stringify(data);
  console.log(data);
  if (dataIndex == 0) {
    localStorage.setItem("data", data);
  } else {
    localStorage.setItem("data" + dataIndex, data);
  }
}

function update(index, key, value) {
  noteList[index][key] = value;
  save();
}

function clear() {
  var element = document.getElementById("list");
  element.innerHTML = "";
  noteList = [];
  if (dataIndex == 0) {
    localStorage.setItem("data", '{"data":[]}');
  } else {
    localStorage.setItem("data" + dataIndex, '{"data":[]}');
  }
}

function nextList() {
  console.log("next");
  dataIndex += 1;
}

function previousList() {
  console.log("previous");
  if (dataIndex > 0) {
    dataIndex -= 1;
  }
}

function allClear() {
  localStorage.clear();
}
//allClear();

//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Development Scripts
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

//	Populate a bunch of note data
function populateLotsOfNotes(amount) {
  for (var i = 0; i < amount; i++) {
    var header = "Hello there, I am a note.";
    var body = "";
    var footer = "";
    var note = makeNote(header, body, footer);
    noteList.push(note);
  }
}

//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Functions
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

function checkedItem(e) {
  e.preventDefault();
  var element = e.target;
  if (element.classList[0] != "item") {
    element = element.parentElement;
  }
  var index = element.id;
  var data = noteList[element.id];
  if (!data.checked) {
    element.classList.add("checked");
    element.childNodes[0].setAttribute("checked", true);
    update(index, "checked", true);
  } else {
    element.classList.remove("checked");
    element.childNodes[0].removeAttribute("checked");
    update(index, "checked", false);
  }
}

function clearList() {
  confirm("Do you really want to clear your list?") ? clear() : null;
}

//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
//	Game Functions
//	~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*

//	initialize
function initialize() {
  var str = navigator.userAgent.toLowerCase();
  str = str.search("android");
  if (str >= 0) {
    console.log("Android device detected.");
  }
}

//	preload

//	load
function load() {
  console.log("loading");
  //populateLotsOfNotes(1);
  //localStorage.setItem('data', '{"data":[]}');

  var data =
    dataIndex == 0
      ? localStorage.getItem("data")
      : localStorage.getItem("data" + dataIndex);
  console.log(data);
  data = JSON.parse(data);
  console.log(data);

  if (data == null) {
    localStorage.setItem("data" + dataIndex, '{"data":[]}');
    data =
      dataIndex == 0
        ? localStorage.getItem("data")
        : localStorage.getItem("data" + dataIndex);
    data = JSON.parse(data);
  }
  noteList = data.data;
}
load();

//	render
//	Always gets called once
function render() {
  console.log("rendering");
  var list = noteList;
  for (var i = 0; i < list.length; i++) {
    renderItem(list[i]);
  }

  //document.getElementById("cover").innerHTML = content;
}
render();

//	gameloop
