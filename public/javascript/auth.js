// switching from login to register and back ... underneath login/regiester buttons
let rev = document.getElementsByClassName("switch");

for (let i = 0; i < rev.length; i++) {
    rev[i].addEventListener("click", () => {
        let where = (window.location.pathname === "/login") ? "/register" : "/login";
        window.location.href = where;
    })
}


// post request to make an account
let registerButton = document.getElementById("create");

if (registerButton) {

    registerButton.addEventListener("submit", e => {
        e.preventDefault();
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let uname = document.getElementById("uname");
        let pword = document.getElementById("pword");
        let pword2 = document.getElementById("pword2");
        let regmsg = document.getElementById("regmsg");

        if (!name.value || !email.value || !uname.value || !pword.value || !pword2.value) {
            regmsg.innerText = "Please Fill out all the fields!";
            regmsg.style.display = "block";
        } else if (pword.value !== pword2.value) {
            regmsg.innerText = "Passwords do not match";
            regmsg.style.display = "block";
        } else {
            regmsg.innerText = "";
            regmsg.style.display = "none";

            let ob = {
                name: name.value,
                email: email.value,
                uname: uname.value,
                pword: pword.value,
                pword2: pword2.value
            }

            $.post("/create/account", ob)
                .then(res => {
                    if (res.errors) {

                        console.log(res.errors)

                        if (res.errors[0].type === "Validation error") {
                            if (res.errors[0].path === "username") {
                                regmsg.innerText = "Username has to be between 2 to 15 characters";
                                regmsg.style.display = "block";
                            }
                        } else if (res.errors[0].type === "unique violation") {
                            if (res.errors[0].path === "email") {
                                regmsg.innerText = "Email entered already exist";
                                regmsg.style.display = "block";
                            } else {
                                regmsg.innerText = "Username is taken";
                                regmsg.style.display = "block";
                            }
                        }

                    } else {

                        console.log(res.created)
                        window.location.href = "/login"

                        name.value = "";
                        email.value = "";
                        uname.value = "";
                        pword.value = "";
                        pword2.value = "";

                    }
                })
        }
    })

}


// Function for logging in

let login = document.getElementById("sendLogin");

if (login) {

    login.addEventListener("submit", e => {
        e.preventDefault();

        let username = document.getElementById("username");
        let password = document.getElementById("password");
        let err = document.getElementById("logmsg");

        if (!username.value || !password.value) {
            err.innerText = "Please fill out both fields";
            err.style.display = "block";
        } else {
            err.innerText = "";
            err.style.display = "none";

            let ob = {
                username: username.value,
                password: password.value
            }

            $.post("/find/user", ob)
                .then(res => {
                    if (res.message) {
                        err.innerText = res.message;
                        err.style.display = "block";
                    } else {
                        window.location.href = "/";
                    }
                })

        }

    })

}

// forgot Password logic

let emailButton = document.getElementById("forgotEmail");

if (emailButton) {
    emailButton.addEventListener("click", () => {
        console.log("Forgot email logic")
    })
}