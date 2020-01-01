function noteDrag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function noteDrop(e) {
    e.preventDefault();
    var elementSource = e.dataTransfer.getData("text");
    elementSource = document.getElementById(elementSource);
    var targetData = e.target.value;
    e.target.value = elementSource.value;
    elementSource.value = targetData;
}

function noteDragOver(e) {
    e.preventDefault();
}