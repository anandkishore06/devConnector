const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { validateEditProfileData } = require("../utils/ValidateReqBody");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try{
        
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(401).send("User Not Found!")
    }
});

profileRouter.post("/profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Update Not Allowed !");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach( (key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.json({message: `${loggedInUser.firstname} updated Your Profile Successfully !`, loggedInUser: loggedInUser})
    }
    catch(err){
        res.status(400).send("ERR : " + err.message);
    }
})

module.exports = profileRouter;