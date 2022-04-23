const router = require('express').Router();
const User = require('../Models/Usermodel');
const Data = require('../Models/Datamodel');
const shortid = require('shortid')



router.options('/',(req,res)=>{

    res.setHeader({
        "Access-Control-Allow-Origin" :req.headers.origin
    })
    
})
router.post('/', async (req, res) => {
    try {
        const id = req.id;
        console.log(req.body)
        req.body.shortURL = shortid.generate();
        console.log(req.body.shortURL);
        const data = await new Data(req.body);
        data.save();
        const user = await User.findByIdAndUpdate(id, { $push:{data:data._id }}, { new: true });
        console.log(user)
        return res.json({ msg: "URL saved successfully" })
    } catch (error) {
        console.log(error.message)
        res.json({msg:error.message})
    }
   


})

module.exports = router;