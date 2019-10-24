const bcrypt = require("bcryptjs");

function session(app, db) {

    // Logging in
    app.post("/find/user", async (req, res) => {

        const { username, password } = req.body;
        let user = await db.users.findOne({ where: {username} })

        if (user){

            let match = await bcrypt.compare(password, user.password);

            if (match){
                req.session.user = {
                    name: user.name,
                    email: user.email,
                    username
                };
                console.log(req.session.user)
                return res.json({message: ""}).redirect(200, "/");
            } else {
                res.json({message: "Invalid Credentials"})
            }

        } else {
            res.json({message: "Invalid Credentials"})
        }

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