const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/mongoose-connection");

require("dotenv").config();

const indexRouter = require("./routes/index");
const hisaabRouter = require("./routes/hisaab");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/hisaab", hisaabRouter);

app.listen(process.env.PORT || 3000 , () => {
    console.log(`http://localhost:${process.env.PORT || 3000}`);
});
