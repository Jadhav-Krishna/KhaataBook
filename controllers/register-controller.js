const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const hisaabModel = require("../models/hisaab-model");
const bcrypt = require("bcrypt");


module.exports.registerPageController = (req,res)=>{
    res.render("register")
}

module.exports.postRegisterController = async (req,res)=>{
    let{email,username,name,password} = req.body;
    try{
        let user = await userModel.findOne({email});
        if(user) return res.send("you already have an acc , try to login.")
    
        bcrypt.genSalt(11, async(err, salt) => {
            await bcrypt.hash(password, salt, async(err, hash) => {
                user = await userModel.create({email,username,name,password:hash});
            });
        });
    
        let token = jwt.sign({id:user._id , email:user.email},process.env.JWT_KEY);
        res.cookie("token",token);
        res.send("created succeefullyt")
    }catch(err){
        res.send(err.message)
    }

}