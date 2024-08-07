const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = (await User.create({
      username: req.body.username,
      profile: req.body.profile,
      email: req.body.email,
      zipcode: req.body.zipcode,
      password: req.body.password,
    })).toJSON();
    // console.log(dbUserData.toJSON().id);
    req.session.save(() => {
      req.session.userType = "user";
      req.session.uid = dbUserData.id;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }
    console.log(dbUserData.id);
    req.session.save(() => {
      req.session.userType = "user";
      req.session.uid = dbUserData.id;
      res.status(200).json({ message: 'You are now logged in!'});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout use root/logout instead
// router.post('/logout', (req, res) => {
//   if (req.session.userType) {
//     req.session.destroy();
//     res.redirect("/");
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
