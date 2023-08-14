const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const dbCom = await Comment.create({
                comment_body: req.body.comment_body,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            });
            res.json(dbCom);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const dbCom = await Comment.findAll({});
        res.json(dbCom);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dbCom = await Comment.findAll({
            where: {
                id: req.params.id,
            },
        });
        res.json(dbCom);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbCom = await Comment.update(
            {
                comment_body: req.body.comment_body,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.json(dbCom);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;