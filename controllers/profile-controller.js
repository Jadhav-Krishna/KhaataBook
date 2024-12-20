const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const hisaabModel = require("../models/hisaab-model");

module.exports.profileController = async (req,res) =>{
    // let user = req.user
    try{
        const user = await userModel.findOne({email:req.user.email}).populate("hisaab");
        res.render("profile",{user})
    }catch(err){
        res.status(500).send(err.message);
    }
}