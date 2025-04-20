const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        minLength:3,
        maxLenght: 50
    },
    lastname:{
        type: String,
        required: true,
        minLength: 3,
        maxLenght: 50
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        minLength: 10,
        maxLength: 100,
        validate: {
            validator: function (value){
                if(!validator.isEmail(value)){
                    throw new Error("InValid EmailId")
                }
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate: {
            validator: function(value){
                if(!(value === "Male" || value === "Female" || value === "others")){
                    throw new Error();
                }
            }
        },

    },
    skills: {
        type: [String],
        default: "JS"
    },
    about: {
        type: String
    },
    photoURL: {
        type: String
    }
},{
    collection: 'userData',
    timestamps: true,    
}

);

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    // this refers to the current user
    const passwordHash = user.password;
    const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash);
    
    return isValidPassword;
}

userSchema.methods.getJWTToken = async function(){
    // this refers to the current user
    const user = this;
    const token = await jwt.sign({_id:user._id}, "DEV@Connector" ,{
        expiresIn: '1h'
    });
    return token;
}

module.exports = mongoose.model("User", userSchema);