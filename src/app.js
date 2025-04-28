// create a server
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user")
const cors = require("cors");
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
require("dotenv").config();



app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);



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
    app.listen(process.env.PORT , () => {
        console.log("Server is listening on 7777...");
        
    });
}).catch( (err) => {
    console.error(err);
    
})
