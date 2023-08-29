const router = require('express').Router();
const sequelize = require('sequelize');
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all galleries for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPosts = await Post.findAll({
        where: { user_id: req.session_user_id},
        attributes: ['id', 'post_title', 'post_body'],
        include: [
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['username']
          },
        },
        {
            model: User,
            attributes: ['username']
        },
      ],
    });

    const posts = dbPosts.map((post) =>
      post.get({ plain: true })
    );

    res.render('dashboard', {
      posts,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




module.exports = router;
