const sequelize = require('../config/connection');
const seedCom = require('./commentSD');
const seedPst = require('./postSD');
const seedUsr = require('./userSD');

const seedPosts = async () => {
    await sequelize.sync({force: true});
    await seedCom();
    await seedPst();
    await seedUsr();
    process.exit(0);
};

seedPosts();