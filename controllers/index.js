const express = require("express");
const router = express.Router();
const apiRoutes = require('./api');
// const openticketRoutes = require('./openticketRoutes.js');
// const userRoutes = require("./userRoutes.js");
// const providerRoutes = require("./providerRoutes.js");

// keep for testing purpose
router.get("/sessiondata", (req, res) => {
  res.json(req.session);
});

router.get('/signup', (req, res) => {
  if (req.session.userType) {
    res.redirect('/account');
    return;
  }
  res.render('signup');
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

router.use("/api", apiRoutes);

module.exports = router;


// router.post("/login", (req, res) => {
//   // find the user who is trying to login
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   })
//     .then((foundUser) => {
//       if (!foundUser) {
//         return res.status(404).json({ msg: "invalid login credentials" });
//       }
//       if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
//         return res.status(404).json({ msg: "invalid login credentials" });
//       }
//       //compare provided password with saved password
//       //remember who they are if the logged in succesfully
//       req.session.user = {
//         id: foundUser.id,
//         email: foundUser.email,
//       };
//       res.json(foundUser);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         msg: "on no!",
//         err,
//       });
//     });
// });

// router.get("/user", (req, res) => {
//   if (req.session.user) {
//     res.send(
//       `ready to get things clean?${req.session.user.email}`
//     );
//   } else {
//     res.status(401).json({ msg: "login first to join the club!" });
//   }
// });
  
// router.get("/provider", (req, res) => {
//   if (req.session.provider) {
//     res.send(
//       `ready to start working?${req.session.provider.email}`
//     );
//   } else {
//     res.status(401).json({ msg: "login first to join the club!" });
//   }
// });
