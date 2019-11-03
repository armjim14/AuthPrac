// Video Id
let vId = window.location.pathname.split("/")[2];

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
let sendComment = document.getElementById("sendComment");
sendComment.addEventListener("submit", e => {

    e.preventDefault();
    let comment = document.getElementById("commentValue");

    if (!comment.value){

        let count = 0;
        let interval = setInterval(() => {
            count++
            videoFeedback.innerText = "You comment can't be blank"
            videoFeedback.style.color = "lightcoral"
            videoFeedback.style.display = "block"
            if (count == 3){
                clearInterval(interval)
                videoFeedback.style.display = "none"
                videoFeedback.innerText = ""
                videoFeedback.style.color = "white"
            }
        }, 900)

    } else {
        let ob = {
            id: user.id,
            videoId: vId,
            comment: `${user.username}: ${comment.value}`
        }

        $.post("/add/comment", ob)
            .then(res => {
                if (res.added){

                    loadComments(vId);

                    let count = 0;
                    let interval = setInterval(() => {
                        count++
                        videoFeedback.innerText = "Added Comment"
                        videoFeedback.style.display = "block"
                        if (count == 3){
                            clearInterval(interval)
                            videoFeedback.style.display = "none"
                            videoFeedback.innerText = ""
                        }
                    }, 900)

                    comment.value = "";

                } else {

                    let count = 0;
                    let interval = setInterval(() => {
                        count++
                        videoFeedback.innerText = "An err occured please try again"
                        videoFeedback.style.color = "lightcoral"
                        videoFeedback.style.display = "block"
                        if (count == 3){
                            clearInterval(interval)
                            videoFeedback.style.display = "none"
                            videoFeedback.innerText = ""
                            videoFeedback.style.color = "white"
                        }
                    }, 900)
                }
            })
    }
})

// For submiting a note
let sendNote = document.getElementById("sendNote");
sendNote.addEventListener("submit", e => {
    e.preventDefault();
    let note = document.getElementById("noteValue");

    if (!note.value){

        let count = 0;
        let interval = setInterval(() => {
            count++
            videoFeedback.innerText = "You note can't be blank"
            videoFeedback.style.color = "lightcoral"
            videoFeedback.style.display = "block"
            if (count == 3){
                clearInterval(interval)
                videoFeedback.style.display = "none"
                videoFeedback.innerText = ""
                videoFeedback.style.color = "white"
            }
        }, 900)

    } else {
        let ob = {
            id: user.id,
            videoId: vId,
            note: note.value
        }

        $.post("/add/note", ob)
            .then(res => {
                if (res.added){
                    
                    let count = 0;
                    let interval = setInterval(() => {
                        count++
                        videoFeedback.innerText = "Added Note"
                        videoFeedback.style.display = "block"
                        if (count == 3){
                            clearInterval(interval)
                            videoFeedback.style.display = "none"
                            videoFeedback.innerText = ""
                        }
                    }, 900)

                    note.value = "";

                } else {

                    let count = 0;
                    let interval = setInterval(() => {
                        count++
                        videoFeedback.innerText = "An err occured please try again"
                        videoFeedback.style.color = "lightcoral"
                        videoFeedback.style.display = "block"
                        if (count == 3){
                            clearInterval(interval)
                            videoFeedback.style.color = "white"
                            videoFeedback.innerText = "You can see all your notes in your profile"
                        }
                    }, 900)
                }
            })
    }
})

// function to load comments for current video
function loadComments(id){
    $.get(`/all/comments/${id}`, res => {
        console.log(res)
        let commentArea = document.getElementById("comments");
            commentArea.innerHTML = "<h2><u>Comments</u></h2>"
        for (let i = 0; i < res.length; i++){
            let p = document.createElement("li");
                p.setAttribute("class", "allComments")
                p.innerText = res[i].comment;

            commentArea.append(p);
        }
    })
}

loadComments(vId);