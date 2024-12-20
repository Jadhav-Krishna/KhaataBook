const jwt = require("jsonwebtoken");
const flash = require("connect-flash")
const userModel = require("../models/user-model");

module.exports.islogedin = async (req,res,next)=>{
    if(req.cookies.token){
        try{
            let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            let user = await userModel.findOne({email:decoded.email});
            req.user = user
            next(); 
        }catch(err){
            return res.redirect("/");
        }
    }else return res.redirect("/")
} 

module.exports.redirectProfile = async (req,res,next)=>{
    if(req.cookies.token){
        try{
            let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            return res.redirect("/profile",{user});
        }catch(err) {return next();}
    }else return next();
}