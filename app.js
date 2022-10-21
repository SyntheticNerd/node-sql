const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

// importing my routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// set what engine I will use to parse my html before serving
app.set("view engine", "ejs");
// set up which folder my html is in, the express property keyword is views, I also happened to name the folder views
// the first property is the key we are setting in our express server which must be "views", the second property
// is the folder you are storing the views in and can be named whatever you want
app.set("views", "views");

//* Middleware
//parsing the body with bodyParser package
app.use(bodyParser.urlencoded({ extended: false }));
// express.static is middleware provided by express that serves files from within a given root directory
// When a file is not found, instead of sending a 404 response,
// this module will instead call next() to move on to the next middleware,
// allowing for stacking and fall-backs.
app.use(express.static(path.join(__dirname, "public")));

//this will check all the routes in a given object and call next if the req does not match any of the routes
app.use("/admin", adminRoutes);
//this will check all the routes in a given object and call next if the req does not match any of the routes
app.use(shopRoutes);
//if we get this far we didn't match any routes so we deliver a 404 page
app.use(errorController.get404);
//* FROM HERE TO UNDERSTAND MORE CHECKOUT THE routes/admin.js FILE
app.listen(3000);
