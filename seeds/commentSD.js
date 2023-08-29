const {Comment} = require('../models');

const com = [
    {
        comment_body: "great post!",
        user_id: 1,
        post_id: 1
    },
    {
        comment_body: "great post again!",
        user_id: 2,
        post_id: 2
    },
    {
        comment_body: "great post another time!",
        user_id: 3,
        post_id: 3
    },
    {
        comment_body: "great post as usual!",
        user_id: 4,
        post_id: 4
    },
]

const seedCom = () => Comment.bulkCreate(com);

module.exports = seedCom;