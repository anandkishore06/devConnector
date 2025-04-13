const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://anandkishore:Anand%40123@nodeprojectdb.edj33.mongodb.net/devConnector"
    )
};

module.exports = connectDB;