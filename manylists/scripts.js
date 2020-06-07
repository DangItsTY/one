var noteTemplate = document.getElementById("noteTemplate");
var listTemplate = document.getElementById("listTemplate");
var mainElement = document.getElementById("main");

initialize();

var listTypes = [];
function setAllListTypes() {
    listTypes = dataNotes.reduce(function(acc, curr, i, arr) {
        var type = curr.category;
        acc.indexOf(type) == -1 ? acc.push(type) : null;
        return acc;
    }, []);
}
setAllListTypes();

function render() {
    for (var i = 0; i < listTypes.length; i++) {
        var listType = listTypes[i];
        var elementGhost = listTemplate.content.cloneNode(true);
        mainElement.appendChild(elementGhost);
        var newListTypeElement = mainElement.lastElementChild;
        newListTypeElement.innerHTML = listType;
        for (var j = 0; j < dataNotes.length; j++) {
            if (dataNotes[j]["category"] == listType) {
                var noteElementGhost = noteTemplate.content.cloneNode(true);
                newListTypeElement.appendChild(noteElementGhost);
                var newNoteElement = newListTypeElement.lastElementChild;
                newNoteElement.setAttribute("id", dataNotes[j].id);
                for (var k = 0; k < newNoteElement.children.length; k++) {
                    var key = newNoteElement.children[k].getAttribute("name");
                    newNoteElement.children[k].value ? newNoteElement.children[k].value = dataNotes[j][key] : newNoteElement.children[k].innerHTML = dataNotes[j][key];
                }
            }
        }
    }
}
render();