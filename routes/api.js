// This is just a testing environment page
// afterwards we intend to convert all the other routes to REST api routes as well

const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");
const fecha = require("fecha");
const workshops = require("../public/javascripts/workshopUtils");
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

//AWARDS PAGES
/* GET Shingo Prize Awards Page. */
router.get("/prize-recipients", function(request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Name, Date_Awarded__c, City__c, State__c, Country__c, SV_Status__c, Company_Profile_Link__c, Press_Release_Link__c FROM Assessment__c WHERE Publish_to_Website__c=true and Publish_Time_Requirement_Fulfilled__c=false ORDER BY Date_Awarded__c DESC";
  conn.query(query, function(err, res) {
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

    // RENDER VIEW
    response.send(res.records);
  });

  // AFFILIATES---------------------------------------------------------------------------------------------------

  /* GET Affiliates Page. */
  router.get("/affiliates", function(request, response, next) {
    //Query SalesForce
    const query =
      "SELECT Id, Name, Logo__c, Page_Path__c, Website, Languages__c FROM Account WHERE RecordType.Name='Licensed Affiliate' AND (NOT Name LIKE 'McKinsey%') AND (NOT Name LIKE 'Shingo Institute%') AND (NOT Name LIKE 'MyEducator%') ORDER BY Name ASC";
    conn.query(query, function(err, res) {
      if (err) {
        return console.error(err);
      }
      // RENDER VIEW
      response.send(res.records);
    });
  });

  /* GET Affiliate page for a specific affiliate. */
  router.get("/affiliates/:id", function(request, response, next) {
    //Query SalesForce (first for faciliators related to affiliate)
    var query =
      "SELECT Id, Name, Title, Biography__c, Photograph__c, Account.Name FROM Contact WHERE Facilitator_For__r.Id='" +
      request.params.id +
      "' ORDER BY LastName";
    conn.query(query, function(err, res) {
      // console.log(res)
      if (err) {
        return console.error(err);
      }

      //Query Salesforce again for affiliate info
      query =
        "SELECT Name, Id, Logo__c, Page_Path__c, Website, Languages__c, Locations__c, Industry_List__c, Summary__c, Public_Contact__c, Public_Contact_Email__c, Public_Contact_Phone__c FROM Account WHERE RecordType.Name='Licensed Affiliate' AND Account.Id =" +
        "'" +
        request.params.id +
        "'";
      conn.query(query, function(err, res1) {
        if (err) {
          return console.error(err);
        }

        // RENDER VIEW
        response.send({
          affiliate: res1.records[0],
          facilitators: res.records
        });
      });
    });
  });

  // EVENTS---------------------------------------------------------------------------------------------------

  /* GET Current Shingo Events. */
  router.get("/events", function(request, response, next) {
    //Query SalesForce
    const query =
      "SELECT Id, Name, Event_Type__c,Start_Date__c,End_Date__c,Registration_Link__c, Display_Location__c, Banner_URL__c  FROM Shingo_Event__c WHERE Start_Date__c > TODAY and Publish_to_Web_App__c = true and Content_on_CVENT__c = true ORDER BY Start_Date__c";
    conn.query(query, function(err, res) {
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

      // RENDER VIEW
      response.send(res.records);
    });
  });

  // WORKSHOPS---------------------------------------------------------------------------------------------------
  //WORKSHOP PAGES
  /* GET Workshop Schedule Page */
  router.get("/workshops", function(request, response, next) {
    //Query SalesForce
    const query =
      "SELECT Id,Name,Workshop_Type__c,Start_Date__c, End_Date__c,Event_City__c,Event_Country__c, Host_Site__c,Affiliate__c,Registration_Website__c FROM Workshop__c WHERE Public__c=true AND Status__c='Verified' ORDER BY Start_Date__c";
    conn.query(query, function(err, res) {
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
      // RENDER VIEW
      response.send({
        title: "Shingo Workshop Schedule",
        workshops: res.records,
        workshopTypes: workshopTypes,
        workshopCountries: workshopCountries
      });
    });
  });

  /* GET Specific Workshop Page. */
  // The workshop type is specified in the URL and then passed into the query
  router.get("/:workshopType", function(request, response, next) {
    //Query SalesForce
    const query =
      "SELECT Id,Name,Workshop_Type__c,Start_Date__c, End_Date__c,Event_City__c,Event_Country__c, Host_Site__c,Affiliate__c,Registration_Website__c FROM Workshop__c WHERE (Public__c=true AND Status__c='Verified') and Workshop_Type__c = " +
      "'" +
      request.params.workshopType +
      "'" +
      " ORDER BY Start_Date__c";
    conn.query(query, function(err, res) {
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

      // RENDER VIEW
      response.send(res.records);
    });
  });
});

module.exports = router;
