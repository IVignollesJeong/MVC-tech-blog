const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// CREATE new user
router.get('/', async (req, res) => {
    try {
      const dbPosts = await Post.findAll({
          attributes: ['id', 'post_title', 'post_body'],
          order: [['id', 'DESC']],
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

      res.json(dbPosts);
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  router.get('/:id', async (req, res) => {
    try {
      const dbPosts = await Post.findOne({
        where: {id: req.params.id},  
        attributes: ['id', 'post_title', 'post_body'],
          order: [['id', 'DESC']],
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
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  router.post('/', withAuth, async (req, res) => {
    try {
      const dbPosts = await Post.create({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
        });
        res.json(dbPosts);
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbPosts = await Post.update(
            {
                post_title: req.body.post_title,
                post_body: req.body.post_body,
            },
            {
                where: { id: req.params.id },
            }
        );

        res.json({ message: 'Post updated!' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
module.exports = router;
