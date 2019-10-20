function session(app) {
    app.get("/find/user", (req, res) => {
        // log in info
        res.json({msg: "temp"})
    })
}

module.exports = session;