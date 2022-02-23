const { response } = require("express");
const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/api/registeruser").post(async function (req, res) {
  try {
    let userObj = req.body;

    let db = dbo.getDb();
    let result = await db.collection("users").insertOne(userObj);
    return res.json({ status: "ok" });
  } catch {
    return res.json({ status: "not ok" });
  }
});
recordRoutes.route("/api/loginuser").post(async function (req, res) {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let db = dbo.getDb();
    let result = await db.collection("users").findOne({ email });
    console.log(result);
    if (result.password === password) {
      res.json({ status: "ok", auth: true, user: result.user });
    } else {
      res.json({ status: "not ok", auth: false });
    }
  } catch {
    res.json({ status: "not ok", auth: false });
  }
});

module.exports = recordRoutes;
