const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");
const conn = new jsforce.Connection();

conn.login(
  process.env.SF_USERNAME,
  process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN,
  function(err, res) {
    if (err) {
      return console.error(err);
    }
  }
);

/* GET Shingo Academy Members Page */
router.get("/academy", function(request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Shingo Academy') ORDER BY LastName";
  conn.query(query, function(err, res) {
    if (err) {
      return console.error(err);
    }

    // RENDER VIEW
    response.render("About/shingoAcademy", {
      title: "Shingo Academy Members",
      members: res.records
    });
  });
});

/* GET Shingo Alumni Members Page. */
router.get("/alumni", function(request, response, next) {
  //Query SalesForce
  const query =
    "Select Id, Name, Account.Name, Title From Contact Where Shingo_Prize_Relationship__c Includes ('Alumni') ORDER BY LastName";
  conn.query(query, function(err, res) {
    if (err) {
      return console.error(err);
    }

    // RENDER VIEW
    response.render("About/shingoAlumni", {
      title: "Shingo Alumni Members",
      alumni: res.records
    });
  });
});

/* GET Shingo Site Examiners Page. */
router.get("/site-examiners", function(request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Site Examiner') AND Account.Name != null ORDER BY LastName";
  conn.query(query, function(err, res) {
    if (err) {
      return console.error(err);
    }

    // RENDER VIEW
    response.render("About/siteExaminers", {
      title: "Shingo Site Examiners",
      examiners: res.records
    });
  });
});

/* GET Shingo Reseach & Publication Examiners Page. */
router.get("/research-examiners", function(request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Research Examiner') ORDER BY LastName";
  conn.query(query, function(err, res) {
    if (err) {
      return console.error(err);
    }
    const innerQuery =
      "SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Publication Examiner') ORDER BY LastName";
    conn.query(innerQuery, (err1, res1) => {
      if (err1) {
        console.error(err1);
      }

      console.log(res.records);
      // RENDER VIEW
      response.render("About/researchAndPublicationExaminers", {
        title: "Shingo Research & Publication Examiners",
        research_examiners: res.records,
        publication_examiners: res1.records
      });
    });
  });
});

/* GET Shingo Staff Page. */
router.get("/staff", function(request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Name, Title, Email, Phone, Photograph__c,Account.Name  FROM Contact WHERE Account.Name = 'Shingo Institute' ORDER BY LastName";
  conn.query(query, function(err, res) {
    if (err) {
      return console.error(err);
    }

    // RENDER VIEW
    response.render("About/staff", {
      title: "Shingo Staff",
      employees: res.records
    });
  });
});

/* GET Shingo Executive Advisory Board Page. */
router.get("/seab", function(request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name, Photograph__c FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Board of Governors') ORDER BY LastName";
  conn.query(query, function(err, res) {
    if (err) {
      return console.error(err);
    }

    // RENDER VIEW
    response.render("About/seab", {
      title: "Shingo Executive Advisory Board",
      members: res.records
    });
  });
});

/* GET Shingo Profile Page for Shingo Executive Advisory Board Member. */
router.get("/seab/:id", function(request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name, Photograph__c,Biography__c FROM Contact WHERE Id = '" +
    request.params.id +
    "' AND Shingo_Prize_Relationship__c INCLUDES('Board of Governors') ORDER BY LastName";
  conn.query(query, function(err, res) {
    if (err) {
      return console.error(err);
    }

    console.log(res.records[0].Name);

    // RENDER VIEW
    response.render("About/seabTemplate", {
      title: res.records[0].Name + " - " + res.records[0].Title,
      member: res.records[0]
    });
  });
});

/* GET Shingo Faculty Fellows Page. */
router.get("/faculty-fellows", function(request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name, Photograph__c, Biography__c FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES('Faculty Fellow') ORDER BY LastName";
  conn.query(query, function(err, res) {
    if (err) {
      return console.error(err);
    }

    // RENDER VIEW
    response.render("About/faculty-fellows", {
      title: "Shingo Faculty Fellows",
      members: res.records
    });
  });
});

/* GET Shingo profile page for faculty fellow. */
router.get("/faculty-fellows/:id", function(request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Title, Account.Name, Photograph__c,Biography__c FROM Contact WHERE Id = '" +
    request.params.id +
    "' AND Shingo_Prize_Relationship__c INCLUDES('Faculty Fellow') ORDER BY LastName";
  conn.query(query, function(err, res) {
    if (err) {
      return console.error(err);
    }

    console.log(res.records[0].Name);

    // RENDER VIEW
    response.render("About/facultyFellowTemplate", {
      title: res.records[0].Name + " - " + res.records[0].Title,
      member: res.records[0]
    });
  });
});

module.exports = router;
