const express = require("express");
const router = express.Router();


// keep for testing purpose
router.get("/sessiondata", (req, res) => {
  res.json(req.session);
});

router.get('/', (req, res) => {
  if (req.session.userType) {
    res.redirect('/account');
    return;
  }
  res.render('homepage');
});

router.get('/signup', (req, res) => {
  if (req.session.userType) {
    res.redirect('/account');
    return;
  }
  res.render('signUp');
});

router.get('/login', (req, res) => {
  if (req.session.userType) {
    res.redirect('/account');
    return;
  }
  res.render('login');
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


module.exports = router;