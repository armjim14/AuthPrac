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
        let SQ = document.getElementById("questions");
        let SA = document.getElementById("SA");

        let regmsg = document.getElementById("regmsg");

        if (!name.value || !email.value || !uname.value || !pword.value || !pword2.value || !SQ.value || !SA.value ) {
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
                pword2: pword2.value,
                securityQ: SQ.value,
                securityA: SA.value
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

let sendRequest = document.getElementById("sendRequest");

if (sendRequest){
    sendRequest.addEventListener("submit", e => {
        e.preventDefault();
        let email = document.getElementById("emailReset").value;
        let ob = { email }

        $.post("/forgot/password", ob)
            .then( res => {
                let err = document.getElementById("formsg");
                if (res.error){
                    err.innerText = "Unable to find an account with that email";
                    err.style.display = "block"
                } else if (res.info) {
                    err.innerText = "";
                    err.style.display = "none"
                    nextStep(res.info);
                } else {
                    err.innerText = "An error occurced please try again";
                    err.style.display = "block"
                }
            })
    })
}

var someInfo = null;

function nextStep(info) {
    someInfo = info
    document.getElementById("sendRequest").style.display = "none";
    document.getElementById("form2").style.display = "block";
    document.getElementsByClassName("feedback")[1].innerText = `${info.securityQ}?`;
}

let formTwo = document.getElementById("form2");

if (formTwo){
    formTwo.addEventListener("submit", e => {
        e.preventDefault();

        let answer = document.getElementById("answer");
        let ob = {
            username: someInfo.username,
            answer: answer.value
        }

        $.post("/compare/answers", ob)
            .then( res => {
                let err = document.getElementById("formsg");
                if (res.same){
                    err.innerText = "";
                    err.style.display = "none"
                    finalStep();
                } else {
                    err.innerText = "Answer doesnt match";
                    err.style.display = "block"
                }
            })
    })
}

function finalStep() {
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "block";
}

let formThree = document.getElementById("form3");

if (formThree){
    formThree.addEventListener("submit", e => {
        e.preventDefault()
        let err = document.getElementById("formsg");

        let password = document.getElementById("newPassword");
        let passwordAgain = document.getElementById("newPasswordTwo")

        if ( !password.value || !passwordAgain.value ){
            err.innerText = "Please fill out both fields";
            err.style.display = "block"
        } else if ( password.value !== passwordAgain.value){
            err.innerText = "Passwords do not match";
            err.style.display = "block"
        } else {
            err.innerText = "";
            err.style.display = "none"
            checkErrs(err, password.value);
        }

    })
}

function checkErrs(err, password) {
    let ob = {
        email: someInfo.email,
        name: someInfo.name,
        username: someInfo.username,
        password
    }
    $.ajax({
        url: "/update/password",
        method: "PUT",
        data: ob
    })
        .then(res => {
            if (res.errors) {
                err.innerText = "Something went wrong please try again";
                err.style.display = "block"
            } else {
                err.innerText = "";
                err.style.display = "none"
                document.getElementById("form3").style.display = "none";
                document.getElementById("lastMsg").style.display = "block";

                let count = 0;
                setInterval( () => {
                    count = count + 1;
                    if (count == 3){
                        window.location.href = "/login";
                    }
                }, 900 )
            }
        })
}