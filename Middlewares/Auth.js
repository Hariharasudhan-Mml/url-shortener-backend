const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => {

    const token = req.headers.authorization;
    console.log(token)
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.json(err.message)
        } else {
            req.id = decoded.id;
            next()
        }
    })


}


module.exports=AuthMiddleware;