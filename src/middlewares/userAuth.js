const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    try{
        const { token } = req.cookies;
    if(!token){
        throw new Error("Expired Token !");
    }
    const decodedToken = await jwt.verify(token, "DEV@Connector");
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