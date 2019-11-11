const express = require('express');
const router = express.Router();
const jsforce = require('jsforce');
const fecha = require('fecha');
const conn = new jsforce.Connection();
const workshops = require('../public/javascripts/workshopUtils');

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN, function(err, res) {
    if (err) { return console.error(err); }
  })

//WORKSHOP PAGES
/* GET Workshop Schedule Page */
router.get('/', function(request, response, next) {

    //Query SalesForce
    const query = 'SELECT Id,Name,Workshop_Type__c,Start_Date__c, End_Date__c,Event_City__c,Event_Country__c, Host_Site__c,Affiliate__c,Registration_Website__c FROM Workshop__c WHERE Public__c=true AND Status__c=\'Verified\' ORDER BY Start_Date__c'
    conn.query(query, function(err, res) {
      if (err) { return console.error(err); }
  
      //Format Dates and Workshop Names
      for(let i = 0; i < res.records.length; i++) {
        var dateStringStart = res.records[i].Start_Date__c;
        res.records[i].Start_Date__c = fecha.format(new Date(dateStringStart), 'D'); 
  
        var dateStringEnd = res.records[i].End_Date__c;
        res.records[i].End_Date__c = fecha.format(new Date(dateStringEnd), 'D MMM, YYYY');
  
        res.records[i].End_Date__c  = workshops.formatWorkshopDate(res.records[i].End_Date__c );
        res.records[i].Workshop_Type__c = workshops.formatWorkshopName(res.records[i].Workshop_Type__c);
      } 
  
      // RENDER VIEW
      response.render('Workshops/workshops', 
      { title: 'Shingo Workshop Schedule',
        workshops: res.records});
    });
  });
  
  /* GET Specific Workshop Page. */
  // The workshop type is specified in the URL and then passed into the query
  router.get('/:workshopType', function(request, response, next) {
  
    //Query SalesForce
    const query = 'SELECT Id,Name,Workshop_Type__c,Start_Date__c, End_Date__c,Event_City__c,Event_Country__c, Host_Site__c,Affiliate__c,Registration_Website__c FROM Workshop__c WHERE (Public__c=true AND Status__c=\'Verified\') and Workshop_Type__c = ' + '\'' + request.params.workshopType + '\'' + ' ORDER BY Start_Date__c'
    conn.query(query, function(err, res) {
      if (err) { return console.error(err); }
  
      //Format Dates
      for(let i = 0; i < res.records.length; i++) {
        var dateStringStart = res.records[i].Start_Date__c;
        res.records[i].Start_Date__c = fecha.format(new Date(dateStringStart), 'D'); 
  
        var dateStringEnd = res.records[i].End_Date__c;
        res.records[i].End_Date__c = fecha.format(new Date(dateStringEnd), 'D MMM, YYYY');
  
        res.records[i].End_Date__c  = workshops.formatWorkshopDate(res.records[i].End_Date__c );
        res.records[i].Workshop_Type__c = workshops.formatWorkshopName(res.records[i].Workshop_Type__c);
      }
  
      // RENDER VIEW
      response.render('Workshops/workshopTemplate', 
      { title: 'Workshops - Discover Excellence',
        workshops: res.records});
    });
  });

module.exports = router;