setTimeout(() => {
    checkIfUser()
}, 500)

function checkIfUser() {

    let isUser = null;

    if (user){
       isUser = +window.location.pathname.split("/")[2] === user.id;
    }
    
    if (isUser){
        let imageElements = document.getElementsByClassName("bio");
        imageElements[0].setAttribute("id", "image");
        addListener();
    }

}

function addListener() {
    let image = document.getElementById("image");

    image.addEventListener("click", () => {
        console.log("Image clicked")
    })
}
