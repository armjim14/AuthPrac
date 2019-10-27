const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

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
        const { name, email, uname, pword, securityQ, secuirtyA } = req.body;
        try {
            let password = await bcrypt.hash(pword, 10)
            console.log(password)
            await db.users.create({
                name,
                email,
                username: uname,
                password,
                secuirtyQ,
                secuirtyA
            })
            res.status(200).send({ created: true });
        } catch(e) {
            console.log(e)
            res.send(e)
        }
    })

    app.post("/forgot/password", async (req, res) => {

        let { email } = req.body;

        try {

            let account = await db.users.findOne({ where: { email } });
    
            if (account){
                let { name, username } = account;
                // await sendEmail(name, email)
                let info = { name, username, email }
                res.json({ info })
            } else {
                res.json({error: true})
            }

        } catch(e) {

            console.log(e)
            res.json({error: true})

        }

    })

}

module.exports = session;

function sendEmail(name, email){
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