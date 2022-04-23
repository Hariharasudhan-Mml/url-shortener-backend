const router = require('express').Router();
const User = require('../Models/Usermodel');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      console.log(req.body);

      req.body.password = hash;
      const user = await User.create(req.body).catch(err => res.json({ msg: err.message }));
      if (user.email) {

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "webdevsmail@gmail.com",
            pass: process.env.PASSWORD
          }
        });
        console.log("user=="+user.email,"password=="+process.env.PASSWORD)
        const mail= await transporter.sendMail({
          from:"webdevsmail@gmail.com",
          to:user.email,
          subject:"To verify your account",
          html: `<div>
          <h2>We warmly  welcome you to our Platform </h2>
         <p>click the below link link to verify your account </p>
          <a href=http://localhost:5000/verify/${token} >CLick here to verify</a>
          </div>`
        });
        if(mail){
          console.log(mail)
        }
        res.json({msg:"Account created successfully !.Check you mail inbox to activate your account"})

      }
    })
  } catch (error) {
    console.log(error.code)
  }
});

module.exports = router;
