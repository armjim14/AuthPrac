// Gets called in the begining to display appropiate nav links
function correctNav() {
    $.get("/cor/nav", async (res) => {

        await gapi.client.setApiKey("");
        await gapi.client.load('youtube', 'v3', () => {
            console.log("Loading completed")
        });

        let links = document.getElementById("links");
        if (res.auth) {
            Auth(links);
        } else {
            notAuth(links);
        }
    })
}

function Auth(links) {
    // Profile button for navbar
    let profile = document.createElement("li");
    profile.setAttribute("class", "nav-item");
    let aTag = document.createElement("a");
    aTag.innerText = "Profile";
    aTag.setAttribute("class", "nav-link");
    aTag.setAttribute("href", "/profile");

    // dashboard button for navbar
    let dashboard = document.createElement("li");
    dashboard.setAttribute("class", "nav-item");
    let aTag2 = document.createElement("a");
    aTag2.innerText = "Dashboard";
    aTag2.setAttribute("class", "nav-link");
    aTag2.setAttribute("href", "/dashboard");

    profile.append(aTag)
    dashboard.append(aTag2)

    links.append(profile, dashboard)
}

function notAuth(links) {
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

                let hr = document.createElement("hr");

                let all = document.createElement("div");
                    all.setAttribute("class", "all")

                let innerAll = document.createElement("div");
                    innerAll.setAttribute("class", "innerAll")

                if (i === res.items.length - 1){
                        innerAll.setAttribute("class", "innerAll extraSpace")
                }

                // let iframe = document.createElement("iframe");
                //     iframe.setAttribute("class", "forVideos")
                //     await iframe.setAttribute("src", `https://www.youtube.com/embed/${res.items[i].id.videoId}`)

                let picture = res.items[i].snippet.thumbnails.high.url;
                let img = document.createElement("img");
                    img.setAttribute("src", picture)
                    img.setAttribute("class", "forImg")
    
                let title = res.items[i].snippet.title
                let pTag = document.createElement("p");
                    pTag.setAttribute("class", "videoTitle")
                    // pTag.setAttribute("onclick", `alertId('${res.items[i].id.videoId}')`)
                    pTag.innerText = title

                innerAll.append(img, pTag)

                videos.append(innerAll);
            }

        })
    })
}

function alertId(id){
    alert(id)
}