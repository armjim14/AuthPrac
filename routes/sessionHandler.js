function session(app) {

    app.get("/find/user", (req, res) => {
        // log in info
        res.json({msg: "temp"})
    })
    
    // creating an account
    app.post("/create/account", (req, res) => {
        const { name, email, uname, pword, pword2 } = req.body;
        res.status(200).send({Message: "Account created"})
    })
}

module.exports = session;