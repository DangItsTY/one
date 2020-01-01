function noteDrag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function noteDrop(e) {
    e.preventDefault();
    var noteSourceId = e.dataTransfer.getData("text");
	var noteTargetId = e.currentTarget.getAttribute("id");
	var noteSource = getNote(noteSourceId);
	var noteTarget = getNote(noteTargetId);
	
	// swap order
	var noteSourceOrder = noteSource["order"];
	var noteTargetOrder = noteTarget["order"];
	set(noteSourceId, {"order": noteTargetOrder});
	set(noteTargetId, {"order": noteSourceOrder});
}

function noteDragOver(e) {
    e.preventDefault();
}