const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    try{
        const { token } = req.cookies;
    if(!token){
        return res.status(401).send("Please Login");
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({_id:decodedToken._id});
    
    if(!user){
        throw new Error("Please Login !");
    }
    req.user = user;
    next();
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
}

module.exports = {
    userAuth
}