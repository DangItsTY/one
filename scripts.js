var oneElement = document
  .getElementById("one")
  .getElementsByTagName("section")[0];
var oneschemaElement = document
  .getElementById("oneschema")
  .getElementsByTagName("section")[0];
var onestatusElement = document
  .getElementById("onestatus")
  .getElementsByTagName("section")[0];
var onelistElement = document
  .getElementById("onelist")
  .getElementsByTagName("section")[0];
var textboardElement = document
  .getElementById("textboard")
  .getElementsByTagName("section")[0];
var manylistsElement = document
  .getElementById("manylists")
  .getElementsByTagName("section")[0];
var notedElement = document
  .getElementById("noted")
  .getElementsByTagName("section")[0];
var exportElement = document
  .getElementById("export")
  .getElementsByTagName("section")[0];
var importElement = document
  .getElementById("import")
  .getElementsByTagName("section")[0];

initialize();

function render() {
  for (var i = 0; i < dataNotes.length; i++) {
    var targetElement;
    switch (dataNotes[i].category) {
      case "one":
        targetElement = oneElement;
        break;
      case "eoca":
        targetElement = oneElement;
        break;
      case "ex":
        targetElement = oneElement;
        break;
      case "ox":
        targetElement = oneElement;
        break;
      case "cx":
        targetElement = oneElement;
        break;
      case "ax":
        targetElement = oneElement;
        break;
      case "braindump":
        targetElement = oneElement;
        break;
      case "notetoss":
        targetElement = oneElement;
        break;
      case "creativity":
        targetElement = oneElement;
        break;
      case "oneschema":
        targetElement = oneschemaElement;
        break;
      case "onestatus":
        targetElement = onestatusElement;
        break;
      case "onelist":
        targetElement = onelistElement;
        break;
      case "trackthat":
        targetElement = onelistElement;
        break;
      case "sundaylist":
        targetElement = onelistElement;
        break;
      case "textboard":
        targetElement = textboardElement;
        break;
      case "manylists":
        targetElement = manylistsElement;
        break;
      case "noted":
        targetElement = notedElement;
        break;
      case "export":
        targetElement = exportElement;
        break;
      case "import":
        targetElement = importElement;
        break;
      default:
        targetElement = notesElement;
    }

    var elementGhost = noteTemplate.content.cloneNode(true);
    targetElement.appendChild(elementGhost);
    var newElement = targetElement.lastElementChild;
    newElement.setAttribute("id", dataNotes[i].id);
    for (var j = 0; j < newElement.children.length; j++) {
      var key = newElement.children[j].getAttribute("name");
      newElement.children[j].value
        ? (newElement.children[j].value = dataNotes[i][key])
        : (newElement.children[j].innerHTML = dataNotes[i][key]);
    }
  }
}
render();

// do not load navigation because this page is different
function loadNavbar() {}
