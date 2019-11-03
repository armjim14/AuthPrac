// The buttons to switch from comments to notes
let showComments = document.getElementById("addComment");
let showNotes = document.getElementById("addNote");

// The acutal section where the context for the comments and notes exist
let commentSection = document.getElementById("commentInput");
let noteSection = document.getElementById("noteInput");

// Providing feedback underneath the hr in the auth side
let videoFeedback = document.getElementById("videoFeedback");

// The logic from switching back and forth comment to notes
showComments.onclick = () => {
    commentSection.style.display = "block";
    noteSection.style.display = "none";
    videoFeedback.innerText = ""
    videoFeedback.style.display = "none"
}
showNotes.onclick = () => {
    commentSection.style.display = "none";
    noteSection.style.display = "block";
    videoFeedback.innerText = "You can see all your notes in your profile"
    videoFeedback.style.display = "block"
}

// For submiting a comment