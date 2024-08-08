const router = require('express').Router();
const { Provider } = require('../../models');

// CREATE new Provider
router.post('/', async (req, res) => {
  try {
    const dbProviderData = (await Provider.create({
      username: req.body.username,
      profile: req.body.profile,
      email: req.body.email,
      zipcode: req.body.zipcode,
      password: req.body.password,
    })).toJSON();
    // console.log(dbProviderData.toJSON().id);
    req.session.save(() => {
      req.session.userType = "provider";
      req.session.uid = dbProviderData.id;

      res.status(200).json(dbProviderData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  if (req.session.uid != req.params.id) {
    res.status(400).json({ message: "Do not hijack other Provider's profile." });
    return;
  }
  
  Provider.update(
    {
      profile: req.body.profile,
      zipcode: req.body.zipcode,
    },
    {
      where: {
        id: req.session.uid,
      },
    }
  )
    .then((updatedProvider) => {
      if (updatedProvider[0] === 0) {
        res.status(404).json({ message: 'No Provider found with that id!' });
        return;
      }
      res.json(updatedProvider);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbProviderData = await Provider.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbProviderData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbProviderData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect Providername or password. Please try again!' });
      return;
    }
    console.log(dbProviderData.id);
    req.session.save(() => {
      req.session.userType = "provider";
      req.session.uid = dbProviderData.id;
      res.status(200).json({ message: 'You are now logged in!'});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout use root/logout instead
router.post('/logout', (req, res) => {
  if (req.session.userType) {
    req.session.destroy();
    res.redirect("/");
  } else {
    res.status(404).end();
  }
});

module.exports = router;
