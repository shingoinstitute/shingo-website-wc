// This is just a testing environment page
// afterwards we intend to convert all the other routes to REST api routes as well

const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");
const fecha = require("fecha");
const request = require("request-promise");
const xmlParser = require("xml2js").parseString;
const _ = require("lodash");
const workshops = require("../public/javascripts/workshopUtils");
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

// ABOUT ---------------------------------------------------------------------------------------------------
/* GET Shingo Academy Members Page. */
router.get("/academy", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Shingo Academy') ORDER BY LastName";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // SEND JSON
    response.send(res.records);
  });
});

/* GET Shingo Alumni Members Page. */
router.get("/alumni", function (request, response, next) {
  //Query SalesForce
  const query =
    "Select Id, Name, Account.Name, Title From Contact Where Shingo_Prize_Relationship__c Includes ('Alumni') ORDER BY LastName";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // SEND JSON
    response.send(res.records);
  });
});

/* GET Shingo Site Examiners Page. */
router.get("/site-examiners", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Site Examiner') AND Account.Name != null ORDER BY LastName";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // SEND JSON
    response.send(res.records);
  });
});

/* GET Shingo Reseach & Publication Examiners Page. */
router.get("/research-examiners", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Research Examiner') ORDER BY LastName";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }
    const innerQuery =
      "SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Publication Examiner') ORDER BY LastName";
    conn.query(innerQuery, (err1, res1) => {
      if (err1) {
        console.error(err1);
      }

      // SEND JSON
      response.send({
        research_examiners: res.records,
        publication_examiners: res1.records,
      });
    });
  });
});

/* GET Shingo Staff Page. */
router.get("/staff", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Name, Title, Email, Phone, Photograph__c,Account.Name  FROM Contact WHERE Account.Name = 'Shingo Institute' ORDER BY LastName";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // SEND JSON
    response.send(res.records);
  });
});

/* GET Shingo Executive Advisory Board Page. */
router.get("/seab", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name, Photograph__c FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Board of Governors') ORDER BY LastName";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // SEND JSON
    response.send(res.records);
  });
});

/* GET Shingo Profile Page for Shingo Executive Advisory Board Member. */
router.get("/seab/:id", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name, Photograph__c,Biography__c FROM Contact WHERE Id = '" +
    request.params.id +
    "' AND Shingo_Prize_Relationship__c INCLUDES('Board of Governors') ORDER BY LastName";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // SEND JSON
    response.send(res.records[0]);
  });
});

/* GET Shingo Faculty Fellows Page. */
router.get("/faculty-fellows", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name, Photograph__c, Biography__c FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Faculty Fellow') ORDER BY LastName";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // SEND JSON
    response.send(res.records);
  });
});

/* GET Shingo profile page for faculty fellow. */
router.get("/faculty-fellows/:id", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name, Photograph__c,Biography__c FROM Contact WHERE Id = '" +
    request.params.id +
    "' AND Shingo_Prize_Relationship__c INCLUDES('Faculty Fellow') ORDER BY LastName";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // SEND JSON
    response.send(res.records[0]);
  });
});
//AWARDS PAGES -----------------------------------------------------------------------------------------------------------------------
/* GET Shingo Prize Awards Page */
router.get("/prize-recipients", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Name, Date_Awarded__c, City__c, State__c, Country__c, SV_Status__c, Company_Profile_Link__c, Press_Release_Link__c FROM Assessment__c WHERE Publish_to_Website__c=true and Publish_Time_Requirement_Fulfilled__c=false ORDER BY Date_Awarded__c DESC";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    for (let i = 0; i < res.records.length; i++) {
      var dateAwarded = res.records[i].Date_Awarded__c;
      res.records[i].Date_Awarded__c = fecha.format(
        new Date(dateAwarded),
        "YYYY"
      );
    }

    // SEND JSON
    response.send(res.records);
  });
});

/* GET Research Awards Page. */
router.get("/research", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Public_Author_Name__c, Press_Release_Date__c, Press_Release_Link__c FROM Research_Award__c WHERE Published__c=true ORDER BY Press_Release_Date__c DESC";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    for (let i = 0; i < res.records.length; i++) {
      var dateAwarded = res.records[i].Press_Release_Date__c;
      res.records[i].Press_Release_Date__c = fecha.format(
        new Date(dateAwarded),
        "YYYY"
      );
    }

    // SEND JSON
    response.send(res.records);
  });
});

/* GET Publication Awards Page. */
router.get("/publication", function (request, response, next) {
  //Query SalesForce
  const query =
    "Select Id, Name, Public_Author_Name__c, Press_Release_Date__c FROM Publication_Award__c WHERE Published__c=true ORDER BY Press_Release_Date__c DESC";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    for (let i = 0; i < res.records.length; i++) {
      var dateAwarded = res.records[i].Press_Release_Date__c;
      res.records[i].Press_Release_Date__c = fecha.format(
        new Date(dateAwarded),
        "MMM YYYY"
      );
    }

    // SEND JSON
    response.send(res.records);
  });
});

/* GET Specific Publication Award Page. */
router.get("/publication/:id", function (request, response, next) {
  //Query SalesForce
  const query =
    "Select Id, Name, Public_Author_Name__c, Press_Release_Date__c,Cover_Image__c, Order_Url__c, Published__c, Embedded_Youtube_Url__c, Press_Release_Copy__c FROM Publication_Award__c WHERE Published__c=true AND Id=" +
    "'" +
    request.params.id +
    "'" +
    " ORDER BY Press_Release_Date__c DESC";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // RENDER VIEW
    response.send(res.records[0]);
  });
});

// AFFILIATES---------------------------------------------------------------------------------------------------

/* GET Affiliates Page. */
router.get("/affiliates", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Logo__c, Page_Path__c, Website, Languages__c FROM Account WHERE RecordType.Name='Licensed Affiliate' AND (NOT Name LIKE 'McKinsey%') AND (NOT Name LIKE 'Shingo Institute%') AND (NOT Name LIKE 'MyEducator%') ORDER BY Name ASC";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }
    // SEND JSON
    response.send(res.records);
  });
});

/* GET Affiliate page for a specific affiliate. */
router.get("/affiliates/:id", function (request, response, next) {
  //Query SalesForce (first for faciliators related to affiliate)
  var query =
    "SELECT Id, Name, Title, Biography__c, Photograph__c, Account.Name FROM Contact WHERE Facilitator_For__r.Id='" +
    request.params.id +
    "' ORDER BY LastName";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    //Query Salesforce again for affiliate info
    query =
      "SELECT Name, Id, Logo__c, Page_Path__c, Website, Languages__c, Locations__c, Industry_List__c, Summary__c, Public_Contact__c, Public_Contact_Email__c, Public_Contact_Phone__c FROM Account WHERE RecordType.Name='Licensed Affiliate' AND Account.Id =" +
      "'" +
      request.params.id +
      "'";
    conn.query(query, function (err, res1) {
      if (err) {
        return console.error(err);
      }

      // SEND JSON
      response.send({
        affiliate: res1.records[0],
        facilitators: res.records,
      });
    });
  });
});

// EVENTS---------------------------------------------------------------------------------------------------

/* GET Current Shingo Events. */
router.get("/events", function (request, response, next) {
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

// WORKSHOPS---------------------------------------------------------------------------------------------------
//WORKSHOP PAGES
/* GET Workshop Schedule Page */
router.get("/workshops", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id,Name,Workshop_Type__c,Start_Date__c, End_Date__c,Timezone__c,Event_City__c,Event_Country__c, Host_Site__c,Affiliate__c,Registration_Website__c,RecordType.Name FROM Workshop__c WHERE Public__c=true AND (Status__c='Verified' OR Status__c='Action Pending') AND Start_Date__c > TODAY ORDER BY Start_Date__c";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // Arrays will contain all current workshop types and countries
    var workshopTypes = [];
    var workshopCountries = [];

    //Format Dates and Workshop Names
    for (let i = 0; i < res.records.length; i++) {
      var dateStringStart = res.records[i].Start_Date__c;
      res.records[i].Start_Date__c = fecha.format(
        new Date(dateStringStart),
        "D"
      );

      var dateStringEnd = res.records[i].End_Date__c;
      res.records[i].End_Date__c = fecha.format(
        new Date(dateStringEnd),
        "D MMM, YYYY"
      );

      res.records[i].End_Date__c = workshops.formatWorkshopDate(
        res.records[i].End_Date__c
      );
      res.records[i].Workshop_Type__c = workshops.formatWorkshopName(
        res.records[i].Workshop_Type__c
      );

      if (!workshopTypes.includes(res.records[i].Workshop_Type__c)) {
        workshopTypes.push(res.records[i].Workshop_Type__c);
      }

      if (!workshopCountries.includes(res.records[i].Event_Country__c)) {
        workshopCountries.push(res.records[i].Event_Country__c);
      }
    }

    // SEND JSON
    response.send({
      title: "Shingo Workshop Schedule",
      workshops: res.records,
      workshopTypes: workshopTypes,
      workshopCountries: workshopCountries,
    });
  });
});

/* GET Specific Workshop Page. */
// The workshop type is specified in the URL and then passed into the query
router.get("/:workshopType", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id,Name,Workshop_Type__c,Start_Date__c, End_Date__c, Timezone__c, Event_City__c,Event_Country__c, Host_Site__c,Affiliate__c,Registration_Website__c,RecordType.Name FROM Workshop__c WHERE Public__c=true AND (Status__c='Verified' OR Status__c='Action Pending')AND Start_Date__c > TODAY AND Workshop_Type__c = " +
    "'" +
    request.params.workshopType +
    "'" +
    " ORDER BY Start_Date__c";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    //Format Dates
    for (let i = 0; i < res.records.length; i++) {
      var dateStringStart = res.records[i].Start_Date__c;
      res.records[i].Start_Date__c = fecha.format(
        new Date(dateStringStart),
        "D"
      );

      var dateStringEnd = res.records[i].End_Date__c;
      res.records[i].End_Date__c = fecha.format(
        new Date(dateStringEnd),
        "D MMM, YYYY"
      );

      res.records[i].End_Date__c = workshops.formatWorkshopDate(
        res.records[i].End_Date__c
      );
      res.records[i].Workshop_Type__c = workshops.formatWorkshopName(
        res.records[i].Workshop_Type__c
      );
    }

    // SEND JSON
    response.send(res.records);
  });
});

//---------------------------------------------------------------------------------------------------------------------------------------------
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
          title: title,
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
