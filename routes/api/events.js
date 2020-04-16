const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");
const fecha = require("fecha");
const request = require("request-promise");
const xmlParser = require("xml2js").parseString;
const _ = require("lodash");
const conn = new jsforce.Connection();

conn.login(
  process.env.SF_USERNAME,
  process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN,
  function (err, res) {
    if (err) {
      return console.error(err);
    }
  }
);

// EVENTS---------------------------------------------------------------------------------------------------

/* GET Current Shingo Events. */
router.get("/", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Event_Type__c,Start_Date__c,End_Date__c,Registration_Link__c, Display_Location__c, Banner_URL__c  FROM Shingo_Event__c WHERE Start_Date__c > TODAY and Publish_to_Web_App__c = true and Content_on_CVENT__c = true ORDER BY Start_Date__c";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    //Format Dates
    for (let i = 0; i < res.records.length; i++) {
      var dateStringStart = res.records[i].Start_Date__c;
      res.records[i].Start_Date__c = fecha.format(
        new Date(dateStringStart),
        "MMMM D"
      );

      var dateStringEnd = res.records[i].End_Date__c;
      res.records[i].End_Date__c = fecha.format(
        new Date(dateStringEnd),
        "D, YYYY"
      );
    }

    // SEND JSON
    response.send(res.records);
  });
});

//Presentations

// Get S3 bucket folder info
function getAWSData(params) {
  // Destructure params
  let { conf, year } = params;

  // Create RegExs
  const { p1: confPattern, p2: yearPattern } = {
    p1: /(international|latinamerica|manufacturing|european)/,
    p2: /2\d{3}/,
  };

  // Test conf & year; set to default if fail
  if (!conf) conf = "international";
  if (!yearPattern.test(year)) year = new Date().getFullYear();

  const data = { title: "", conf, year };

  // Return resulting title
  if (conf === "international")
    data.title = `${year} International Conference Presentations`;
  else if (conf === "latinamerica")
    data.title = `${year} Latin America Conference Presentations`;
  else if (conf === "european")
    data.title = `${year} European Conference Presentations`;
  else if (conf === "manufacturing")
    data.title = `${year} Manufacturing Summit Presentations`;
  else if (conf === "oe")
    data.title = `${year} Operational Excellence Conference Presentations`;
  else if (conf === "financialservices")
    data.title = `${year} Financial Services Conference Presentations`;
  else {
    const error = new Error(
      `Couldn't find presentations for ${JSON.stringify(params)}`
    );
    error.status = 504;
    throw error;
  }

  return data;
}

router.get("/presentations/:conf?/:year?", function (req, res, next) {
  const { title } = getAWSData(req.params);

  const files = [];
  request("https://s3-us-west-1.amazonaws.com/shingo-presentations")
    .then((body) => {
      xmlParser(body, function (err, bucket) {
        if (err) {
          console.error(`Error in GET: ${req.path}\n`, err);
          return next();
        }
        _.forOwn(bucket.ListBucketResult.Contents, function (val) {
          var pres = _.pick(val, "Key");
          if (pres && pres.Key && pres.Key.length) pres = pres.Key[0];
          // logger.debug("Presentation Path: %s", pres);
          if (pres.includes(title) && pres.includes(".pdf")) {
            var file =
              "https://s3-us-west-1.amazonaws.com/shingo-presentations/" +
              pres.replace(new RegExp(" ", "g"), "+");
            files.push({ file: file, name: pres.split("/")[1] });
          }
        });

        res.send({
          files: files,
          conference: title,
        });
      });
    })
    .catch((error) => {
      console.error(`Error in GET: ${req.path}\n`, error);
      return next(error);
    });
});

module.exports = router;
