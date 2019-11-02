let showComments = document.getElementById("addComment");
let showNotes = document.getElementById("addNote");

let commentSection = document.getElementById("commentInput");
let noteSection = document.getElementById("noteInput");

showComments.onclick = () => {
    commentSection.style.display = "block";
    noteSection.style.display = "none";
}

showNotes.onclick = () => {
    commentSection.style.display = "none";
    noteSection.style.display = "block";
}