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


app.listen(7777);