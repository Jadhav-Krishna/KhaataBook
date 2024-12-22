require("dotenv").config();
const mongoose = require("mongoose");
const dbgr = require("debug")(process.env.DEBUG || "development:mongoose");

if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/khaatabook")
  .then(() => {
    dbgr("Connected to MongoDB");
  })
  .catch((err) => {
    dbgr("Connection error:", err);
  });

let db = mongoose.connection;

module.exports = db;
