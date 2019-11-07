const express = require('express');
const router = express.Router();
const jsforce = require('jsforce');
const fecha = require('fecha');
const conn = new jsforce.Connection();

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN, function(err, res) {
    if (err) { return console.error(err); }
  })

/* GET Shingo Events Page. */
router.get('/', function(request, response, next) {

    //Query SalesForce
    const query = 'SELECT Id, Name, Event_Type__c,Start_Date__c,End_Date__c,Registration_Link__c, Display_Location__c, Banner_URL__c  FROM Shingo_Event__c WHERE Start_Date__c > TODAY and Publish_to_Web_App__c = true and Content_on_CVENT__c = true'
    conn.query(query, function(err, res) {
      if (err) { return console.error(err); }
  
      //Format Dates
      for(let i = 0; i < res.records.length; i++) {
        var dateStringStart = res.records[i].Start_Date__c;
        res.records[i].Start_Date__c = fecha.format(new Date(dateStringStart), 'D '); 
  
        var dateStringEnd = res.records[i].End_Date__c;
        res.records[i].End_Date__c = fecha.format(new Date(dateStringEnd), 'D MMM, YYYY');      
      }
  
      // RENDER VIEW
      response.render('Events/events', 
      { title: 'Shingo Events',
        events: res.records});
    });
  });

module.exports = router;