const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user")

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:touserid",
  userAuth,
  async (req, res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.touserid;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid Status type" + status})
        }

        const toUser = await User.findOne({_id:toUserId});
        // console.log(toUser);
        
        if(!toUser){
            res.status(400).json({message: "User not found "})
        }

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId},
                {fromUserId : toUserId, toUserId: fromUserId}
            ]
        });

        if(existingConnectionRequest){
            return res.status(400).json("Connection Request has been already sent !")
        }

        const connectionRequest = new ConnectionRequestModel({
            fromUserId, toUserId, status
        });

        const data = await connectionRequest.save();
        res.json({
            message: `${req.user.firstname} ${status} ${toUser.firstname}`,
            data
        })
    }
    catch(err){
        res.status(400).json({message: err.message});
    }

  }
);

requestRouter.post("/request/review/:status/:requestid", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const {status, requestid} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status not Allowed !"});
        }
        
        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestid,
            toUserId: loggedInUser._id,
            status: "interested"
        });
        
        if(!connectionRequest){
            return res.status(400).json({message: "Connection Request Not found !"});
        }
        connectionRequest.status = status;
        await connectionRequest.save();
        res.json(`Request ${status} !`)
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

module.exports = requestRouter;
