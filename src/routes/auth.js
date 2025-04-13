const express = require("express");
const User = require("../models/user");
const {ValidateReqBody} = require("../utils/ValidateReqBody");
const bcrypt = require("bcryptjs");
const { userAuth } = require("../middlewares/userAuth");
const validator = require('validator');

const authRouter = express.Router();

authRouter.post("/users", async(req, res) => {
    try{
        ValidateReqBody(req);
        const {firstname,lastname,emailId,password, gender,age, skills} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstname,lastname,emailId,password : hashPassword, gender,age, skills
        });
        await user.save();
        res.send("User Added Successfully!");
    }
    catch(err){
        res.status(401).send("Something error while adding user : " + err.message);
    }
})

// login API

authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Not Registered User!");
        }
        const isPasswordValid = await user.validatePassword(password); 
        
        if(isPasswordValid){
            const token = await user.getJWTToken();
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 + 360000000)
            });
            res.json("Login Successfull !")
        }
        else{
            throw new Error("Invalid Credentials")
        }
    }
    catch(err){
        res.send("ERROR : " + err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })
    res.send("Logout Successful!");
})

authRouter.patch("/changepassword", userAuth, async (req, res) => {
    try{
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Both current and new passwords are required.' });
        }
        if (currentPassword === newPassword) {
            return res.status(400).json({ message: 'Both current and new passwords are same.' });
        }
        
        const user = req.user;
        if(user){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Current password is incorrect !' });
            }
        }

        if(!validator.isStrongPassword(newPassword)){
            throw new Error("Password is not Strong, Please write Strong Password !");
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.send("Password Updated !")
    }
    catch(err){
        res.json({errMessage: err.message})
    }
})

module.exports = authRouter;