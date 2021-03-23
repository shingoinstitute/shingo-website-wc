const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");
const fecha = require("fecha");
const workshops = require("../../public/javascripts/workshopUtils");
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

// WORKSHOPS---------------------------------------------------------------------------------------------------
//WORKSHOP PAGES
/* GET Workshop Schedule Page */
router.get("/", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id,Name,Workshop_Type__c,Start_Date__c, End_Date__c,Timezone__c,Event_City__c,Event_State__c, Country__c, Host_Site__c,Affiliate__c,Registration_Website__c,Language__c,RecordType.Name FROM Workshop__c WHERE Public__c=true AND (Status__c='Verified' OR Status__c='Action Pending') AND Start_Date__c > TODAY ORDER BY Start_Date__c";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }

    // Arrays will contain all current workshop types and countries
    var workshopTypes = [];
    var workshopCountries = [];

    //Format Dates and Workshop Names
    for (let i = 0; i < res.records.length; i++) {
      let dateStringStart = res.records[i].Start_Date__c;
      let dateStringEnd = res.records[i].End_Date__c;

      res.records[i].Start_Date__c = fecha.format(new Date(dateStringStart), "D") + '-' + fecha.format(new Date(dateStringEnd), "D");
      res.records[i].End_Date__c = fecha.format(new Date(dateStringEnd),"MMM, YYYY");

      res.records[i].End_Date__c = workshops.formatWorkshopDate(
        res.records[i].End_Date__c
      );
      res.records[i].Workshop_Type__c = workshops.formatWorkshopName(
        res.records[i].Workshop_Type__c
      );

      if (!workshopTypes.includes(res.records[i].Workshop_Type__c)) {
        workshopTypes.push(res.records[i].Workshop_Type__c);
      }

      if (!workshopCountries.includes(res.records[i].Country__c)) {
        workshopCountries.push(res.records[i].Country__c);
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
    "SELECT Id,Name,Workshop_Type__c,Start_Date__c, End_Date__c, Timezone__c, Event_City__c, Event_State__c, Country__c, Host_Site__c,Affiliate__c,Registration_Website__c,Language__c, RecordType.Name FROM Workshop__c WHERE Public__c=true AND (Status__c='Verified' OR Status__c='Action Pending')AND Start_Date__c > TODAY AND Workshop_Type__c = " +
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
      let dateStringStart = res.records[i].Start_Date__c;
      let dateStringEnd = res.records[i].End_Date__c;

      res.records[i].Start_Date__c = fecha.format(new Date(dateStringStart), "D") + '-' + fecha.format(new Date(dateStringEnd), "D");
      res.records[i].End_Date__c = fecha.format(new Date(dateStringEnd),"MMM, YYYY");

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

module.exports = router;
