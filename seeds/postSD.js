const {Post} = require('../models');

const pst = [
    {
        post_title: "I want a motorcycle",
        post_body: "I want a motorcycle because I think they are cool",
        user_id: 1
    },
    {
        post_title: "I want a new computer",
        post_body: "I want a new computer because I think they are cool",
        user_id: 2
    },
    {
        post_title: "I want a new keyboard",
        post_body: "I want a new keyboard because I think they are cool",
        user_id: 3
    },
    {
        post_title: "I want a cup",
        post_body: "I want a cup because I want to drink something",
        user_id: 4
    },
]

const seedPst = () => Post.bulkCreate(pst);

module.exports = seedPst;