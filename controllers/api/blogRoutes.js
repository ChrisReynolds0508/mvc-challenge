const router = require('express').Router();
const { Blog, User } = require('../../models');

// Route to get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new blog post
router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
