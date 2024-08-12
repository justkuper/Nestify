const express = require("express");
const router = express.Router();
const {redirectAuthed} = require("../utils/auth");

// keep for testing purpose
router.get("/sessiondata", (req, res) => {
  res.json(req.session);
});

// root route that loads the homapge.handlebars.
router.get('/', redirectAuthed, (req, res) => {
  res.render('homepage');
});

// /signup route that loads the signup.handlebars.
router.get('/signup', redirectAuthed, (req, res) => {
  res.render('signUp');
});

// /login route that loads the login.handlebars.
router.get('/login', redirectAuthed, (req, res) => {
  res.render('login');
});

// /logout routes that detroy the session
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


module.exports = router;