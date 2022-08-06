const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

//turn on connection to db and server
// sync means that this is sequelize taking the models and connection them to associated database tables
// force : true means we would drop and recreate all of the database tables on startup
// will create a table for you if it doesnt find one
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});