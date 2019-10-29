function htmlHandle(app, path) {
    // ------------
    // HTMl Pages
    // ------------
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })
    app.get("/video/:id", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/video.html"));
    })
    app.get("/login", (req, res) => {
        if (req.session.user){
            return res.redirect("/")
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    })
    app.get("/register", (req, res) => {
        if (req.session.user){
            return res.redirect("/")
        }
        res.sendFile(path.join(__dirname, "../public/register.html"));
    })
    app.get("/forgot/password", (req, res) => {
        if (req.session.user){
            return res.redirect("/")
        }
        res.sendFile(path.join(__dirname, "../public/forgotPassword.html"));
    })

    // ------------
    // CSS
    // ------------
    app.get("/style",(req, res) => {
        res.sendFile(path.join(__dirname, "../public/css/style.css"))
    })
    app.get("/style2",(req, res) => {
        res.sendFile(path.join(__dirname, "../public/css/style2.css"))
    })
    app.get("/video",(req, res) => {
        res.sendFile(path.join(__dirname, "../public/css/video.css"))
    })
    app.get("/setup",(req, res) => {
        res.sendFile(path.join(__dirname, "../public/css/setup.css"))
    })
    app.get("/reset", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/css/reset.css"))
    })
    app.get("/boot1", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/css/bootstrap.css"))
    })
    app.get("/boot2", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/css/bootstrap.min.css"))
    })

    // ------------
    // JavaScript
    // ------------
    app.get("/forNav",(req, res) => {
        res.sendFile(path.join(__dirname, "../public/javascript/forNav.js"))
    })
    app.get("/jQuery",(req, res) => {
        res.sendFile(path.join(__dirname, "../public/javascript/jQuery.js"))
    })
    app.get("/auth",(req, res) => {
        res.sendFile(path.join(__dirname, "../public/javascript/auth.js"))
    })
    app.get("/index",(req, res) => {
        res.sendFile(path.join(__dirname, "../public/javascript/index.js"))
    })
    app.get("/video",(req, res) => {
        res.sendFile(path.join(__dirname, "../public/javascript/video.js"))
    })

    // ------------
    // Images
    // ------------
    app.get("/background", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/images/background.jpg"))
    })
}

module.exports = htmlHandle;