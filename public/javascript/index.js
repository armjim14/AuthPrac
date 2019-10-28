// Gets called in the begining to display appropiate nav links
function correctNav() {
    $.get("/cor/nav", (res) => {
        let links = document.getElementById("links");
        if (res.auth){
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
correctNav();

let callAxios = document.getElementById("callAxios");

if (callAxios){
    callAxios.addEventListener("submit", e => {
        e.preventDefault();
        console.log("you good")
    })
}