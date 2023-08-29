const router = require('express').Router();
const sequelize = require('sequelize');
const { Comment, Post, User } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbPosts = await Post.findAll({
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

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
router.get('/post/:id', async (req, res) => {
  try {
    const dbPosts = await Post.findOne(req.params.id, {
        where: {id: req.params.id},
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

    const post = dbPosts.get({ plain: true });
    res.render('renderposts', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});





router.get('/signup', (req, res) => {
    res.render('signup');
});


module.exports = router;
