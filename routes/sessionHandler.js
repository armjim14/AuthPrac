const bcrypt = require("bcryptjs");

function session(app, db) {

    app.get("/find/user", (req, res) => {
        // log in info
        res.json({msg: "temp"})
    })
    
    // creating an account
    app.post("/create/account", async (req, res) => {
        const { name, email, uname, pword } = req.body;
        try {
            let password = await bcrypt.hash(pword, 10)
            console.log(password)
            await db.users.create({
                name,
                email,
                username: uname,
                password
            })
            res.status(200).send({Message: "Account created"})
        } catch(e) {
            console.log(e)
            res.send(e)
        }
    })
}

module.exports = session;