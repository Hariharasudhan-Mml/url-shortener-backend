const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/Usermodel');
const Token = require('../Models/Tokenmodel');
const bcrypt = require('bcrypt')


router.get('/:token/:id', async (req, res) => {
    try {
        const token = req.params.token;
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.json({ msg: "Link is not valid or expired" })
        }
        else {
            const token1 = await Token.findOne({ userId:`ObjectId(${id})` , token });
            if (!token1) {
                return res.json({ msg: "Link is not valid or expired" })
            }
        
    
        }
    
    } catch (error) {
        return res.json({meg:error.message})
    }
  


})

router.post('/:token/:id', async (req, res) => {
try {
    
    const token = req.params.token;
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return res.json({ msg: "Link is not valid or expired" })
    }
    else {
        const token1 = await Token.findOne({userId:id,token:token });
        if (!token1) {
            return res.json({ msg: "Link is not valid or expired" })
        }
        else {
            // return res.json({ url: `${token1._id}/${id}` });

            bcrypt.hash(req.body.password, 10).then(async (hash) => {
                const user = await User.findByIdAndUpdate(id, { password: hash }, { new: true });
                console.log(user);
                const token = await Token.findByIdAndDelete(token1._id);
                console.log(token)
                res.json({ msg: "Password changed Successfully " })
            })
        }

    }

} catch (error) {
    return res.json({msg:error.message})
}



})

module.exports = router