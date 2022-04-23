const router = require('express').Router();
const Data = require('../Models/Datamodel');
const open = require('open')

router.get('/:shorturl', async (req, res) => {
    try {
        const shorturl = req.params.shorturl;
        console.log(shorturl)
        const data = await Data.findOne({ shortURL: shorturl });
        console.log("data==" + data)
        if (!data) {
            return res.json({ msg: "This is not a valid URL" })
        }
        else {
            data.clicks++;
    data.save().then(resp=>res.writeHead(301,{
        Location:`https://${data.longURL}`
    }) )
        }
    } catch (error) {
        res.json({ msg: error.message })
    }



});


module.exports = router