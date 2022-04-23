// run `node index.js` in the terminal
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db.js');
const signup = require('./Routes/Signup');
const verify=require('./Routes/Verify');
const login=require('./Routes/Login');
const forgotpassword=require('./Routes/Forgotpassword');
const changepassword=require('./Routes/Resetpassword');
const Save=require('./Routes/SaveURL')
const RedirectURL=require('./Routes/Redirect');
const Home=require('./Routes/Home')
const AuthMiddleware = require('./Middlewares/Auth.js');

const app = express();
 const port = process.env.PORT || 5000;

 connectDB();

 app.use(express.json())
app.use(cors());
app.get('/', (req, res) => {
  res.send('working successfuly');
});
app.use('/home',AuthMiddleware, Home)
app.use('/signup', signup);
app.use('/verify' ,verify);
app.use('/login',login);
app.use('/forgotpassword',forgotpassword);
app.use('/changepassword',changepassword);
app.use('/save',AuthMiddleware,Save)
app.use('/redirect',RedirectURL);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server is up and running on ${port}`);
}).setTimeout(70000)