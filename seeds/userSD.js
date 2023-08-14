const {User} = require('../models');

const usr = [
    {
        username: "Motorider14",
        password: "ilovebikes",
    },
    {
        username: "computerdude1",
        password: "ilovecomputers",
    },
    {
        username: "keyboardknight1997",
        password: "ilovekeyboards",
    },
    {
        username: "CUPMAN1551",
        password: "ilovecups",
    },
]

const seedUsr = () => User.bulkCreate(usr);

module.exports = seedUsr;