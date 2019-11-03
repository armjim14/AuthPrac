function APIS(app, db){

    app.get("/cor/nav", async (req, res) => {

        if (req.session.user){
            res.json({auth: true, user: req.session.user});
        } else {
            res.json({auth: false});
        }

    })

    app.post("/add/comment", async (req, res) => {
        let { id, videoId, comment } = req.body

        try {
            await db.comments.create({
                userId: id,
                videoId,
                comment
            })
            res.json({added: true})
        } catch(e) {
            console.error(e);
            res.json({added: false})
        }
    })

    app.post("/add/note", async (req, res) => {
        let { id, videoId, note } = req.body

        try {
            await db.notes.create({
                userId: id,
                videoId,
                note
            })
            res.json({added: true})
        } catch(e) {
            console.error(e);
            res.json({added: false})
        }
    })

    app.get("/all/comments/:videoId", async (req, res) => {

        let videoId = req.params.videoId;
        
        try {
            let comments = await db.comments.findAll({
                where: {
                    videoId
                }
            })
            res.json(comments)
        } catch(e) {
            console.log(e);
            res.json({error: true})
        }

    })

}

module.exports = APIS;