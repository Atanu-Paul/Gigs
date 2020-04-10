//importing my base packeges
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const morgan = require("morgan");

//importing the database connection in the server file
require("./config/db_conn");

//declaring a port variable
const PORT = process.env.PORT || 8080;

//initilliazing the express module
const app = express();

//setting up all the middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "static")));

//setting up the hbs
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "view", "pages"));
app.set("view options", { layout: "main" });

//setting the partials
hbs.registerPartials(path.join(__dirname, "view", "partials"));

//setting up the default route
app.get("/", (req, res) => {
  res.status(200).render("index");
});

//setting up the gig routes
app.use("/gigs", require("./routes/gig_route"));

//setting up the port
app.listen(PORT, () => {
  console.log(`Express server listing on ${PORT}`);
});
