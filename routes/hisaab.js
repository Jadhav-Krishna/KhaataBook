const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/login-middleware");
const HisaabModel = require("../models/hisaab-model");
const UserModel = require("../models/users-model");

router.get("/", function (req, res) {
  res.send("hisaab index route");
});

router.post("/create", isLoggedIn, async function (req, res) {
  let { title, description, encrypted, shareable, passcode, editpermissions } =
    req.body;

  let hisaab = await HisaabModel.create({
    title: title,
    description: description,
    user: req.user.id,
    encrypted: encrypted,
    shareable: shareable,
    passcode: passcode,
    editpermissions: editpermissions,
  });

  let user = await UserModel.findOne({ email: req.user.email });
  user.hisaab.push(hisaab._id);

  await user.save();

  res.send(hisaab);
});

module.exports = router;
