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
            .then( res => {
                if (res.errors){

                    console.log(res.errors)

                    if (res.errors[0].type === "Validation error"){
                        if (res.errors[0].path === "username"){
                            regmsg.innerText = "Username has to be between 2 to 15 characters";
                            regmsg.style.display = "block";
                        }
                    } else if (res.errors[0].type === "unique violation") {
                        if (res.errors[0].path === "email"){
                            regmsg.innerText = "Email entered already exist";
                            regmsg.style.display = "block";
                        } else {
                            regmsg.innerText = "Username is taken";
                            regmsg.style.display = "block";
                        }
                    }

                } else {
                    console.log(res.message)
                    name.value = "";
                    email.value = "";
                    uname.value = "";
                    pword.value = "";
                    pword2.value = "";
                }
            })
        
    }

})