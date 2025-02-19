// create a server
const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("Home Page")
    
});

app.use("/test", (req, res) =>{
    res.send("Test Route");
    
})

app.use("/welcome", (req, res) =>{
    res.send("Welcome Page");
    
})

app.listen(7777);