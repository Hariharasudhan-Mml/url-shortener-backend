const router = require('express').Router();
const Data = require('../Models/Datamodel');

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
    data.save().then(async(resp)=> res.redirect(`https://${data.longURL}`) )
        }
    } catch (error) {
        res.json({ msg: error.message })
    }



});


module.exports = router