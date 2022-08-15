const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
//adding handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware for style sheet etc in public folder to be sent to the frontend
app.use(express.static(path.join(__dirname, "public")));
// turn on routes
app.use(routes);

//turn on connection to db and server
// sync means that this is sequelize taking the models and connection them to associated database tables
// force : true means we would drop and recreate all of the database tables on startup
// will create a table for you if it doesnt find one
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
