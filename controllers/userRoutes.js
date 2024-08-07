const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

//login
router.post("/login", (req, res) => {
    // find the user who is trying to login
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(404).json({ msg: "invalid login credentials" });
        }
        if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
          return res.status(404).json({ msg: "invalid login credentials" });
        }
        //compare provided password with saved password
        //remember who they are if the logged in succesfully
        req.session.user = {
          id: foundUser.id,
          email: foundUser.email,
        };
        res.json(foundUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "on no!",
          err,
        });
      });
  });
  
  //read one
  router.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("logged out");
  });
  router.get("/:id", (req, res) => {
    User.findByPk(req.params.id, {
      include: [User],
    })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ msg: "no such User" });
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "oh no!", err });
      });
  });
  
  module.exports = router;
  