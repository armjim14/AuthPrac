function APIS(app, db){

    app.get("/cor/nav", async (req, res) => {

        if (req.session.user){
            res.json({auth: true});
        } else {
            res.json({auth: false});
        }

    })
}

module.exports = APIS;