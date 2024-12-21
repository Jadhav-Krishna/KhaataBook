require("dotenv").config();
const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.0:27017/khaatabook")
  .then(function () {
    dbgr("connected to Mongo");
  })
  .catch(function (err) {
    dbgr(err);
  });

let db = mongoose.connection;

module.exports = db;
