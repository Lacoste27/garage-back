var express = require("express");
const { DetailReparation } = require("../repository/reparation-repository");
const { TotalReparation, SendMail } = require("../utils/utils");
var router = express.Router();
const ejs = require("ejs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("Hello world");
});

module.exports = router;
