const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sesn = {
    secret: process.env.SESSION_SECRET,
    cookie: {maxage: 900000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: Sequelize
    }),
};


app.use(session(sesn));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`now listening at http://localhost:${PORT}`)
    });
});