const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "super-secret-key",
//     resave: false,
//     saveUninitialized: false
//     // cookie: { maxAge: 60000 }
//   })
// );

module.exports = app;
