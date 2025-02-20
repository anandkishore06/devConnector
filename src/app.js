// create a server
const express = require("express");

const app = express();

// app.use("/test", (req, res) =>{
//     res.send("Test Route");
    
// })

// app.use("/welcome", (req, res) =>{
//     res.send("Welcome Page");
    
// })

// app.use("/", (req, res) => {
//     res.send("Home Page")
    
// });

app.get("/user", (req, res) => {
    res.send({"name":"Anand"})
});

app.post("/user", (req, res) =>{
    res.send("Data saved Successfully")
});

app.delete("/user", (req, res) =>{
    res.send("Deleted Successfully")
});

// /ab?c means b is optional that means /ac or /ab?c or /abc all routes have same working
// app.get("/ab?c", (req, res) => {
//     res.send({"name":"Anand"})
// })

// app.get("/ab+c", (req, res) => {
//     res.send({"abc":"123"})
// })

// app.get("/ab**c", (req, res) =>{
//     res.send({"abc":"1234"})
// })

// app.get("/abc", (req, res) => {
//     console.log(req.query);
    
//     res.send({"abc":"1234"})
// })

app.get("/user/:userid", (req, res) => {
    console.log(req.params);
    
    res.send({"name":"Anand"})
})


app.listen(7777);