// NPM Module Imports
const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const http = require("http");

// CONNECT to salesforce & Set up PORT
const jsforce = require("jsforce");
const conn = new jsforce.Connection();

// LOGIN TO SALESFORCE
conn.login(
  process.env.SF_USERNAME,
  process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN,
  function(err, res) {
    if (err) {
      return console.error(err);
    } else {
      console.log(
        chalk.green(
          "Your site is connected to SalesForce.com with username: "
        ) + process.env.SF_USERNAME
      );
      console.log(chalk.green("Listening on Port: ") + process.env.PORT);
    }
  }
);

//Heroku will put your app to sleep if it does not get traffic for a certain period of time
// this is a simple script to ping the site once per min to keep it alive with artificial traffic.
setInterval(function() {
  http.get("http://apps.shingo.org/");
}, 300000); // every 5 minutes (300000)

//--------------------------------------------------------------------------------------------------------------------------------------
// GET Home Page
router.get("/", function(request, response, next) {
  const aboutRoutes = [
    "api/academy",
    "api/alumni",
    "api/site-examiners",
    "api/research-examiners",
    "api/staff",
    "api/seab",
    "api/faculty-fellows"
  ];

  const awardRoutes = [
    "api/prize-recipients",
    "api/research",
    "api/publication"
  ];

  const workshopRoutes = ["api/affiliates", "api/workshops"];
  const eventRoutes = ["api/events"];

  // RENDER VIEW
  response.render("index", {
    title: "Shingo Website WC - Home",
    aboutRoutes: aboutRoutes,
    awardRoutes: awardRoutes,
    workshopRoutes: workshopRoutes,
    eventRoutes: eventRoutes
  });
});

//--------------------------------------------------------------------------------------------------------------------------------------
// PARTIALS
// GET Workshop Buttons
router.get("/workshop-buttons", function(request, response, next) {
  response.render("Partials/workshopButtons", { title: "Workshop Buttons" });
});

module.exports = router;
