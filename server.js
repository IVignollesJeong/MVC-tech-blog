const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3306;

const sesn = {
    secret: process.env.SESSION_SECRET,
    cookie: {maxage: 900000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
};


app.use(session(sesn));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);
const hbs = exphbs.create({helpers});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`now listening at http://localhost:${PORT}`)
    });
});