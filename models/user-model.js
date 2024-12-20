const { name } = require("ejs");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        maxLength: 20,
        minLength: 3
    },
    name:{
        type:String,
        require:true,
        trim:true
    },
    profilePicture:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
        select:false,
    },
    hisaab:[{
        type:mongoose.Schema.Types.ObjectId, ref:"hisaab"
    }]
});

module.exports = mongoose.model("user",userSchema);