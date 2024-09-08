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

// Route to update a blog post
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!blog[0]) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!blog) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
