var noteElements = document.getElementsByName("onenote");
var notesElement = document.getElementById("notes");
var noteTemplate = document.getElementById("noteTemplate");

function initialize() {
  loadNavbar();

  load();
  //render();
}
//initialize();

function render() {
  for (var i = 0; i < dataNotes.length; i++) {
    var elementGhost = noteTemplate.content.cloneNode(true);
    notesElement.appendChild(elementGhost);
    var newElement = noteElements[noteElements.length - 1];
    newElement.setAttribute("id", dataNotes[i].id);
    for (var j = 0; j < newElement.children.length; j++) {
      var key = newElement.children[j].getAttribute("name");
      if (dataNotes[i][key]) {
        newElement.children[j].value
          ? (newElement.children[j].value = dataNotes[i][key])
          : (newElement.children[j].innerHTML = dataNotes[i][key]);
      }
    }
  }
}

function clearDisplay() {
  while (notesElement.firstChild)
    notesElement.removeChild(notesElement.firstChild);
}

//	lazy way to add the nav bar links to every page
function loadNavbar() {
  var navElement = document.createElement("nav");
  navElement.setAttribute("name", "tools");

  var navlink;

  navlink = document.createElement("a");
  navlink.setAttribute("href", "../index.html");
  navlink.innerHTML = "one";
  navElement.appendChild(navlink);

  navlink = document.createElement("a");
  navlink.setAttribute("href", "../oneschema/index.html");
  navlink.innerHTML = "oneschema";
  navElement.appendChild(navlink);

  navlink = document.createElement("a");
  navlink.setAttribute("href", "../onestatus/index.html");
  navlink.innerHTML = "onestatus";
  navElement.appendChild(navlink);

  navlink = document.createElement("a");
  navlink.setAttribute("href", "../onelist/index.html");
  navlink.innerHTML = "onelist";
  navElement.appendChild(navlink);

  navlink = document.createElement("a");
  navlink.setAttribute("href", "../textboard/index.html");
  navlink.innerHTML = "textboard";
  navElement.appendChild(navlink);

  navlink = document.createElement("a");
  navlink.setAttribute("href", "../manylists/index.html");
  navlink.innerHTML = "manylists";
  navElement.appendChild(navlink);

  navlink = document.createElement("a");
  navlink.setAttribute("href", "../noted/index.html");
  navlink.innerHTML = "noted";
  navElement.appendChild(navlink);

  navlink = document.createElement("a");
  navlink.setAttribute("href", "../export/index.html");
  navlink.innerHTML = "export";
  navElement.appendChild(navlink);

  navlink = document.createElement("a");
  navlink.setAttribute("href", "../import/index.html");
  navlink.innerHTML = "import";
  navElement.appendChild(navlink);

  document.body.insertBefore(navElement, document.body.firstChild);
}
