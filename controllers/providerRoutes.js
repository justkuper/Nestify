const express = require("express");
const router = express.Router();
const { Provider } = require("../models");
const bcrypt = require("bcrypt");

//login
router.post("/login", (req, res) => {
    // find the Provider who is trying to login
    Provider.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((foundProvider) => {
        if (!foundProvider) {
          return res.status(404).json({ msg: "invalid login credentials" });
        }
        if (!bcrypt.compareSync(req.body.password, foundProvider.password)) {
          return res.status(404).json({ msg: "invalid login credentials" });
        }
        //compare provided password with saved password
        //remember who they are if the logged in succesfully
        req.session.provider = {
          id: foundProvider.id,
          email: foundProvider.email,
        };
        res.json(foundProvider);
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
    Provider.findByPk(req.params.id, {
      include: [Provider],
    })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ msg: "no such Provider" });
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "oh no!", err });
      });
  });
  
  module.exports = router;
  