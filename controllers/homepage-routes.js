const express = require("express");
const router = express.Router();
const {redirectAuthed} = require("../utils/auth");

// keep for testing purpose
router.get("/sessiondata", (req, res) => {
  res.json(req.session);
});

router.get('/', redirectAuthed, (req, res) => {
  res.render('homepage');
});

router.get('/signup', redirectAuthed, (req, res) => {
  res.render('signUp');
});

router.get('/login', redirectAuthed, (req, res) => {
  res.render('login');
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


module.exports = router;