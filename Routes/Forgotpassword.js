const router = require('express').Router();
const User = require('../Models/Usermodel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Token=require('../Models/Tokenmodel');
const crypto=require('crypto')



router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
    
            res.json({ msg: "No users found with this email" })
        } else {
    
          let token = await Token.findOne({userId:user._id})
            if(!token){
                token= await new Token({
                    userId:user._id,
                    token:crypto.randomBytes(32).toString("hex")
                }).save()
            }
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "webdevsmail@gmail.com",
                    pass: process.env.PASSWORD
                }
            })
            console.log('token='+token , "id="+user._id)
            const mail = await transporter.sendMail({
                from: "webdevsmail@gmail.com",
                to: user.email,
                subject: "Password Change Request",
                html: `<div>
                <h2>We accepted your change request </h2>
               <p>click the below link link to change your password </p>
                <a href=http://localhost:3000/resetpassword/${token.token}/${user._id} >CLick here to verify</a>
                </div>`
            })
            if (mail) {
                console.log(mail)
            }
            res.json({ msg: 'Password change request accepted!. Check your mailbox' })
        }
    } catch (error) {
        console.log(error.message)
        res.json({msg:error.message})
    }
   


})

module.exports = router;