const router = require('express').Router();
const User = require('../Models/Usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (user) {
            if (user.verified) {
                const password = await bcrypt.compare(req.body.password, user.password);

                if (!password) {
                    res.json({ msg: "Incorrect Password" })
                } else {
                    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
                    res.json({ token, msg: "login successfull", name: user.firstname })
                }
            } else {
                res.json({ msg: "Account not verified yet" })
            }
        } else {
            res.json({ msg: "No users Found" })
        }
    } catch (error) {
        return res.json({ msg: error.messsage })
    }




})



module.exports = router;