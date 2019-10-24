function correctNav() {
    $.get("/cor/nav", (res) => {
        console.log(res.auth);
    })
}

correctNav();