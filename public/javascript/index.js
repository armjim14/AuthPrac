var user;

localStorage.setItem("memory", JSON.stringify(""))

// Gets called in the begining to display appropiate nav links
function correctNav() {
    $.get("/cor/nav", async (res) => {

        await gapi.client.setApiKey("AIzaSyCgxR__3UGXQhtk1nRX-cbtGmCl7lwCvLs");
        await gapi.client.load('youtube', 'v3', () => {

            let links = document.getElementById("links");

            let inVideo = window.location.pathname.split("/")[1] == "video"

            if (res.auth) {
                user = res.user;
                Auth(links, inVideo);
            } else {
                notAuth(links, inVideo);
            }

        });

    })  
}

function Auth(links, inVideo) {

    // Profile button for navbar
    let profile = document.createElement("li");
    profile.setAttribute("class", "nav-item");
    let aTag = document.createElement("a");
    aTag.innerText = "Profile";
    aTag.setAttribute("class", "nav-link");
    aTag.setAttribute("href", `/user/${user.id}`);

    profile.append(aTag)
    links.append(profile)

    if (inVideo){
        let authSide = document.getElementById("auth");
        authSide.style.display = "flex"
        playVideo();
    }
}

function notAuth(links, inVideo) {
    // Login button for navbar
    let login = document.createElement("li");
    login.setAttribute("class", "nav-item");
    let aTag = document.createElement("a");
    aTag.innerText = "Login";
    aTag.setAttribute("class", "nav-link");
    aTag.setAttribute("href", "/login");

    // register button for navbar
    let register = document.createElement("li");
    register.setAttribute("class", "nav-item");
    let aTag2 = document.createElement("a");
    aTag2.innerText = "Register";
    aTag2.setAttribute("class", "nav-link");
    aTag2.setAttribute("href", "/register");

    login.append(aTag);
    register.append(aTag2);

    links.append(login, register);

    if (inVideo){
        let notAuthSide = document.getElementById("notAuth");
        notAuthSide.style.display = "block"
        playVideo();
    }
}

async function playVideo() {

    let id = window.location.pathname.split("/")[2];

    let videoHolder = document.getElementById("videoHolder");
    
    let iframe = document.createElement("iframe");
        iframe.setAttribute("class", "singleVideo")
        await iframe.setAttribute("src", `https://www.youtube.com/embed/${id}`)

    videoHolder.append(iframe)
    
}

let callAxios = document.getElementById("callAxios");

if (callAxios) {
    callAxios.addEventListener("submit", e => {
        e.preventDefault();

        let q = document.getElementById("search").value;

        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q,
            maxResults: 10,
            order: "relevance",
        })

        request.execute( async res => {
            
            let videos = document.getElementById("videos");

            videos.innerHTML = "";

            for (let i = 0; i < res.items.length; i++){

                let all = document.createElement("div");
                    all.setAttribute("class", "all")

                let innerAll = document.createElement("div");
                    innerAll.setAttribute("class", "innerAll")
                    innerAll.setAttribute("onclick", `videoId('${res.items[i].id.videoId}')`)

                if (i === res.items.length - 1){
                        innerAll.setAttribute("class", "innerAll extraSpace")
                }

                let picture = res.items[i].snippet.thumbnails.high.url;
                let img = document.createElement("img");
                    img.setAttribute("src", picture)
                    img.setAttribute("class", "forImg")
    
                let title = res.items[i].snippet.title
                let pTag = document.createElement("p");
                    pTag.setAttribute("class", "videoTitle")
                    pTag.innerText = title

                innerAll.append(img, pTag)

                videos.append(innerAll);
            }

        })
    })
}

function videoId(id){
    window.location.href = `/video/${id}`;
}