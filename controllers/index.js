const express = require("express");
const router = express.Router();
const apiRoutes = require('./api');
const openticketRoutes = require('./openticketRoutes.js');
const userRoutes = require("./userRoutes.js");
const providerRoutes = require("./providerRoutes.js");

router.get("/sessiondata", (req, res) => {
  res.json(req.session);
});

router.get("/user", (req, res) => {
  if (req.session.user) {
    res.send(
      `ready to get things clean?${req.session.user.email}`
    );
  } else {
    res.status(401).json({ msg: "login first to join the club!" });
  }
});
  
router.get("/provider", (req, res) => {
  if (req.session.provider) {
    res.send(
      `ready to start working?${req.session.provider.email}`
    );
  } else {
    res.status(401).json({ msg: "login first to join the club!" });
  }
});

router.get("/openticket", (req, res) => {
  if (req.session.openticket) {
    res.send(
      `ready to start working?${req.session.openticket}`
    );
  } else {
    res.status(401).json({ msg: "Try again" });
  }
});

router.get("/confirmedticket", (req, res) => {
  if (req.session.confirmedticket) {
    res.send(
      `Done${req.session.confirmedticket}`
    );
  } else {
    res.status(401).json({ msg: "Try again" });
  }
});


router.use("/", openticketRoutes);
router.use("/", confirmedticketRoutes);
router.use("/api", apiRoutes);
router.use("/api/users", userRoutes);
router.use("/api/providers", providerRoutes);

module.exports = router;
