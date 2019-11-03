const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

function session(app, db) {

    // Logging in
    app.post("/find/user", async (req, res) => {

        const { username, password } = req.body;

        try {
            let user = await db.users.findOne({ where: { username } })
            if (user) {

                let match = await bcrypt.compare(password, user.password);

                if (match) {
                    req.session.user = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        username
                    };
                    console.log(req.session.user)
                    return res.json({ message: "" }).redirect(200, "/");
                } else {
                    res.json({ message: "Invalid Credentials" })
                }

            } else {
                res.json({ message: "Invalid Credentials" })
            }
        } catch (e) {
            console.log(e)
        }

    })

    // creating an account
    app.post("/create/account", async (req, res) => {
        const { name, email, uname, pword, securityQ, securityA } = req.body;
        try {

            let userExist = await db.users.findOne({where: {uniqueUsername: uname.toLowerCase()}})

            if (userExist) {
                res.json({errors: "Username is taken"})
            }

            let password = await bcrypt.hash(pword, 10)

            await db.users.create({
                name,
                email,
                username: uname,
                uniqueUsername: uname.toLowerCase(),
                password,
                securityQ,
                securityA: securityA.toLowerCase()
            })
            res.status(200).send({ created: true });
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    })

    app.post("/forgot/password", async (req, res) => {

        let { email } = req.body;

        try {

            let account = await db.users.findOne({ where: { email } });

            if (account) {
                let { name, username, securityQ } = account;
                // await sendEmail(name, email)
                let info = { name, username, email, securityQ }
                res.json({ info })
            } else {
                res.json({ error: true })
            }

        } catch (e) {

            console.log(e)
            res.json({ error: true })

        }

    })

    app.post("/compare/answers", async (req, res) => {
        const { username, answer } = req.body;

        try {
            let userAnswer = await db.users.findOne({ where: { username } });
            let same = userAnswer.securityA == answer.toLowerCase();
            res.json({ same });
        } catch (e) {
            console.log(e)
            res.json({ same: null });
        }
    })

    app.put("/update/password", async (req, res) => {
        var { username, password, email, name } = req.body;
        try {
            let betterPassword = await bcrypt.hash(password, 10);
            await db.users.update(
                {
                    password: betterPassword
                },
                {
                    where: { username }
                }
            )
            sendEmail(name, email);
            res.json({ errors: false });
        } catch (e) {
            console.log(e)
            res.json({ errors: true });
        }
    })

}

module.exports = session;

function sendEmail(name, email) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        port: 25,
        auth: {
            user: process.env.email,
            pass: process.env.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {
        from: `${process.env.email}`,
        to: `${email}`,
        subject: `Password changed`,
        text: `Hello ${name}, There has been a change to your account with Videosim`
    };

    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        console.log("The message was sent!");
        console.log.log(info)
    });
}