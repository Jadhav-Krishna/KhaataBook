const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const hisaabModel = require("../models/hisaab-model");

module.exports.landingPageController = (req,res)=>{
    res.render("index",{loggedin:false});
};

module.exports.loginPageController = async (req,res)=>{ 
    let {email,password} = req.body;
    
    let user = await userModel.findOne({email}).select("+password");
    if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                let token = jwt.sign({id:user._id , email:user.email},process.env.JWT_KEY);
                res.cookie("token",token);
                return res.send("login successfully :)");
            }else return res.send("Email address or password is incorrect.")
        });
    }else{
        return res.send("user not found , you need to create first")
    }
}

module.exports.logoutPageController = async (req,res) => {
    res.cookie("token","");
    return res.redirect("/");
}


