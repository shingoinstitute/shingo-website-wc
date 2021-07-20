const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");
const fecha = require("fecha");
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

//AWARDS PAGES -----------------------------------------------------------------------------------------------------------------------
/* GET Shingo Prize Awards Page */
router.get("/prize-recipients", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Name, Date_Awarded__c, City__c, State__c, Country__c, SV_Status__c, Company_Profile_Link__c, Press_Release_Link__c, Award_Video__c FROM Assessment__c WHERE Publish_to_Website__c=true and Publish_Time_Requirement_Fulfilled__c=false ORDER BY Date_Awarded__c DESC";
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
      if(res.records[i].SV_Status__c == 'The Shingo Prize'){
        res.records[i].SV_Status__c = 'Shingo Prize'}; 
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

module.exports = router;
