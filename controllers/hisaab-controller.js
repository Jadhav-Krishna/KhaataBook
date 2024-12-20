const hisaabModel = require("../models/hisaab-model");
const userModel = require("../models/user-model");

module.exports.createHisaabController= async (req,res)=>{
    let{title,description,encrypted,shareable,passcode,editpermission} = req.body;

    encrypted = encrypted ==="on" ? true : false
    shareable = shareable ==="on" ? true : false
    editpermission = editpermission ==="on" ? true : false

    try {
        let createdHisaab = await hisaabModel.create({
            title,
            description,
            user:req.user._id,
            passcode,
            encrypted,
            shareable,
            editpermission
        })
    
        let user = await userModel.findOne({_id:req.user._id});
        user.hisaab.push(createdHisaab._id)
        await user.save();
        res.redirect("/profile")

    } catch (error) {
        res.send(error.message)
    }
}

module.exports.hisaabPageController = (req,res) =>{
    res.render("create")
}