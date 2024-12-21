const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/login-middleware");
const HisaabModel = require("../models/hisaab-model");
const UserModel = require("../models/users-model");

router.get("/", isLoggedIn, (req, res) => {
  res.render("create");
});

router.post("/create", isLoggedIn, async (req, res) => {
  try {
    let { title, description, encrypted, shareable, passcode, editpermissions } = req.body;

    // Convert shareable and editpermissions to boolean values
    shareable = shareable === "on";  // If the checkbox is checked, 'shareable' will be "on", so convert it to boolean
    editpermissions = editpermissions === "on";  // Same for editpermissions

    // Default values for checkboxes
    encrypted = encrypted || false;
    passcode = encrypted && passcode ? passcode : '';  // Only keep passcode if the file is encrypted

    // If encrypted, hash the passcode before saving
    if (encrypted && passcode) {
      const salt = await bcrypt.genSalt(10);
      passcode = await bcrypt.hash(passcode, salt);
    }

    // Basic validation for required fields
    if (!title || !description) {
      return res.status(400).send("Title and description are required.");
    }

    // Create new Hisaab
    let hisaab = await HisaabModel.create({
      title,
      description,
      user: req.user._id, // Ensure using the correct user ID field
      encrypted,
      shareable,
      passcode,
      editpermissions,
    });

    // Add the created Hisaab to the user's list of Hisaabs
    let user = await UserModel.findOne({ email: req.user.email });
    user.hisaab.push(hisaab._id);

    await user.save();

    // Redirect to the created Hisaab's page or a success page
    res.redirect(`/hisaab/${hisaab._id}`);  // Redirect to a success page or created Hisaab page
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while creating Hisaab");
  }
});

module.exports = router;
