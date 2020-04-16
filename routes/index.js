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
  function (err, res) {
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
setInterval(function () {
  http.get("http://apps.shingo.org/");
}, 300000); // every 5 minutes (300000)

//--------------------------------------------------------------------------------------------------------------------------------------
// GET Home Page
router.get("/", function (request, response, next) {
  const aboutRoutes = [
    "api/about/academy",
    "api/about/alumni",
    "api/about/site-examiners",
    "api/about/research-examiners",
    "api/about/staff",
    "api/about/seab",
    "api/about/faculty-fellows",
  ];

  const awardRoutes = [
    "api/awards/prize-recipients",
    "api/awards/research",
    "api/awards/publication",
  ];

  const workshopRoutes = ["api/affiliates", "api/workshops"];
  const eventRoutes = [
    "api/events",
    "api/events/presentations/international/2019",
  ];

  // RENDER VIEW
  response.render("index", {
    title: "Shingo Website WC - Home",
    aboutRoutes: aboutRoutes,
    awardRoutes: awardRoutes,
    workshopRoutes: workshopRoutes,
    eventRoutes: eventRoutes,
  });
});

//--------------------------------------------------------------------------------------------------------------------------------------
// DOCUMENTATION
// GET Workshop Buttons
router.get("/docs", function (request, response, next) {
  response.render("documentation", {
    title: "apps.shingo.org | Documentation",
    videos: [
      {
        url: "https://www.youtube.com/embed/lYF4vDEG_u8",
        name: "Intro to App",
      },
      {
        url: "https://www.youtube.com/embed/1Bp5IFodsy0",
        name: "Views",
      },
      {
        url: "https://www.youtube.com/embed/lZeBEpaaJl0",
        name: "Routing",
      },
      {
        url: "https://www.youtube.com/embed/b9qVFdSh9VA",
        name: "API Routes (JSON)",
      },
      {
        url: "https://www.youtube.com/embed/4oLvrQuT96k",
        name: "Web Componenet Scripts",
      },
      {
        url: "https://www.youtube.com/embed/MyxAb_hA9yQ",
        name: "Creating a Basic Component",
      },
      {
        url: "https://www.youtube.com/embed/DL9KAAFeQ40",
        name: "Creating HTML with Javascript",
      },
    ],
  });
});

module.exports = router;
