const router = require('express').Router();
const { User } = require('../../models');

// Route to sign up a new user
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;
      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to log in
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user || !user.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;
      res.json(user);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to log out
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
