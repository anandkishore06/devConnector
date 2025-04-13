// create a server
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user")

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// fetch user data /feed api

app.get("/feed", async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.status(401).json("Error");
    }
})

// Update using / put

app.put("/users/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const fullUpdate = req.body;
        const user = await User.findOneAndReplace({_id: id}, fullUpdate, {
            new: true
        })
        if(!user) return res.status(404).send("user not found");
        res.send("User Updated");
    }
    catch(err){
        res.status(404).res.send(err);
    }
})

// update user using /patch 

app.patch("/users/:id", async (req, res) =>{
    try{
        const {id} = req.params;
        const updateUser = req.body;
    
        const updateNotAllowed = ["emailId", "gender"];
        const isupdateNotAllowed = Object.keys(updateUser).some(k => {
            console.log(k);
            
            return updateNotAllowed.includes(k);
        })
        
        console.log(isupdateNotAllowed);
        
        if(isupdateNotAllowed){
            throw new Error("Update not Allowed")
        }
        const user = await User.findByIdAndUpdate({_id:id}, updateUser, {
            runValidators: true
        });
        console.log(user)
        if(!user){
            res.status(404).send("User Not Found");
        }
        res.send("User Updated /patch");
    }
    catch(err){
        res.status(400).send("Error :" + err.message);
    }
})

// delete user

app.delete("/users/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const deleteUser = await User.findByIdAndDelete(id);
        if(!deleteUser){
            res.send("user not found");
        }
        res.send("User Deleted!");
    }
    catch(err){
        res.status(500).send("Soemthing went wrong")
    }
})

connectDB().then( () => {
    console.log("Database Connection Successful!!!");
    app.listen(7777, () => {
        console.log("Server is listening on 7777...");
        
    });
}).catch( (err) => {
    console.error(err);
    
})
