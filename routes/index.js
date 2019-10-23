var express = require('express');
var router = express.Router();
var chalk = require('chalk');

// CONNECT salesforce & Set up PORT
var jsforce = require('jsforce');
var conn = new jsforce.Connection();
var port = process.env.PORT 


// LOGIN TO SALESFORCE
conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN, function(err, res) {
  if (err) { return console.error(err); }
  else {
    console.log(chalk.green('Your site is connected to SalesForce.com with username: ') + process.env.SF_USERNAME)
    console.log(chalk.green('Listening on Port: ') + port)
  }
})

//---------------------------------------------------------------------------------------------------------------------------------------------

//WORKSHOP PAGES
/* GET Workshop Schedule Page. */
router.get('/workshops', function(request, response, next) {

  //Query SalesForce
  const query = 'SELECT Id,Name,Workshop_Type__c,Start_Date__c, End_Date__c,Event_City__c,Event_Country__c, Host_Site__c,Affiliate__c,Registration_Website__c FROM Workshop__c WHERE Public__c=true AND Status__c=\'Verified\' ORDER BY Start_Date__c'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('Workshops/workshops', 
    { title: 'Shingo Workshop Schedule',
      workshops: res.records});
  });
});

/* GET Specific Workshop Page. */
// The workshop type is specified in the URL and then passed into the query
router.get('/workshops/:workshopType', function(request, response, next) {

  //Query SalesForce
  const query = 'SELECT Id,Name,Workshop_Type__c,Start_Date__c, End_Date__c,Event_City__c,Event_Country__c, Host_Site__c,Affiliate__c,Registration_Website__c FROM Workshop__c WHERE (Public__c=true AND Status__c=\'Verified\') and Workshop_Type__c = ' + '\'' + request.params.workshopType + '\'' + ' ORDER BY Start_Date__c'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('Workshops/workshopTemplate', 
    { title: 'Workshops - Discover Excellence',
      workshops: res.records});
  });
});

/* GET Affiliates Page. */
router.get('/affiliates', function(request, response, next) {

  //Query SalesForce
  const query = 'SELECT Id, Name, Logo__c, Page_Path__c, Website, Languages__c FROM Account WHERE RecordType.Name=\'Licensed Affiliate\' AND (NOT Name LIKE \'McKinsey%\') AND (NOT Name LIKE \'Caldwell%\') AND (NOT Name LIKE \'Shingo Institute%\')'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('Workshops/affiliates', 
    { title: 'Affiliates',
      affiliates: res.records});
  });
});


/* GET Affiliate page for specific affiliate. */
router.get('/affiliates/:id', function(request, response, next) {

  //Query SalesForce
  const query = 'SELECT Account.Name, Account.Id, Account.Logo__c, Account.Page_Path__c, Account.Website, Account.Languages__c, Account.Summary__c, (SELECT Contact.Name,Contact.Facilitator_For__c,Contact.Photograph__c,Contact.Biography__c FROM Contacts WHERE Contact.Facilitator_For__c != null) FROM Account WHERE RecordType.Name=\'Licensed Affiliate\' AND Account.Id =' + '\'' + request.params.id + '\''
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }
      
    // RENDER VIEW
    response.render('Workshops/affiliateTemplate', 
    { title: 'Affiliates',
      affiliate: res.records[0]
    });
  });
});

//---------------------------------------------------------------------------------------------------------------------------------------------


//EVENTS PAGES
/* GET Shingo Events Page. */
router.get('/events', function(request, response, next) {

  //Query SalesForce
  const query = 'SELECT Id, Name, Event_Type__c,Start_Date__c,End_Date__c,Registration_Link__c, Display_Location__c, Banner_URL__c  FROM Shingo_Event__c WHERE Start_Date__c > TODAY and Publish_to_Web_App__c = true and Content_on_CVENT__c = true'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('Events/events', 
    { title: 'Shingo Events',
      events: res.records});
  });
});


//---------------------------------------------------------------------------------------------------------------------------------------------

//AWARDS PAGES
/* GET Shingo Prize Awards Page. */
router.get('/awards/prize-recipients', function(request, response, next) {

  //Query SalesForce
  const query = 'SELECT Name, Date_Awarded__c, City__c, State__c, Country__c, SV_Status__c, Company_Profile_Link__c, Press_Release_Link__c FROM Assessment__c WHERE Publish_to_Website__c=true and Publish_Time_Requirement_Fulfilled__c=false ORDER BY Date_Awarded__c DESC'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('Awards/prizeRecipients', 
    { title: 'Awards - Shingo Prize Recipients',
      awards: res.records});
  });
});

/* GET Research Awards Page. */
router.get('/awards/research', function(request, response, next) {

  //Query SalesForce
  const query = 'SELECT Id, Name, Public_Author_Name__c, Press_Release_Date__c, Press_Release_Link__c FROM Research_Award__c WHERE Published__c=true ORDER BY Press_Release_Date__c DESC'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('Awards/researchAwardRecipients', 
    { title: 'Awards - Research Award Recipients',
      awards: res.records});
  });
});

/* GET Publication Awards Page. */
router.get('/awards/publication', function(request, response, next) {

  //Query SalesForce
  const query = 'Select Id, Name, Public_Author_Name__c, Press_Release_Date__c FROM Publication_Award__c WHERE Published__c=true ORDER BY Press_Release_Date__c DESC'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('Awards/publicationAwardRecipients', 
    { title: 'Awards - Publication Award Recipients',
      awards: res.records});
  });
});

/* GET Specific Publication Award Page. */
router.get('/awards/publication/:id', function(request, response, next) {

  //Query SalesForce
  const query = 'Select Id, Name, Public_Author_Name__c, Press_Release_Date__c,Cover_Image__c, Order_Url__c, Published__c, Embedded_Youtube_Url__c, Press_Release_Copy__c FROM Publication_Award__c WHERE Published__c=true AND Id='+ '\'' + request.params.id + '\'' + ' ORDER BY Press_Release_Date__c DESC'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('Awards/publicationAwardTemplate', 
    { title: 'Awards - ' + res.records[0].Name,
      award: res.records[0]});
  });
});

//---------------------------------------------------------------------------------------------------------------------------------------------

//ABOUT PAGES

//AWARDS PAGES
/* GET Shingo Academy Members Page. */
router.get('/about/academy', function(request, response, next) {

  //Query SalesForce
  const query = 'SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES(\'Shingo Academy\') ORDER BY LastName'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('About/shingoAcademy', 
    { title: 'Shingo Academy Members',
      members: res.records});
  });
});

/* GET Shingo Alumni Members Page. */
router.get('/about/alumni', function(request, response, next) {

  //Query SalesForce
  const query = 'Select Id, Name, Account.Name, Title From Contact Where Shingo_Prize_Relationship__c Includes (\'Alumni\') ORDER BY LastName'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('About/shingoAlumni', 
    { title: 'Shingo Alumni Members',
      alumni: res.records});
  });
});

/* GET Shingo Site Examiners Page. */
router.get('/about/site-examiners', function(request, response, next) {

  //Query SalesForce
  const query = 'SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES(\'Site Examiner\') AND Account.Name != null ORDER BY LastName'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('About/siteExaminers', 
    { title: 'Shingo Site Examiners',
      examiners: res.records});
  });
});

/* GET Shingo Reseach & Publication Examiners Page. */
router.get('/about/research-examiners', function(request, response, next) {

  //Query SalesForce
  const query = 'SELECT Id, Name, Title, Account.Name FROM Contact WHERE Shingo_Prize_Relationship__c INCLUDES(\'Research Examiner\',\'Publication Examiner\') ORDER BY LastName'
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('About/researchAndPublicationExaminers', 
    { title: 'Shingo Research & Publication Examiners',
      examiners: res.records});
  });
});

//---------------------------------------------------------------------------------------------------------------------------------------------
// PARTIALS

router.get('/workshop-buttons', function(request, response, next) {
  response.render('Partials/workshopButtons', 
    { title: 'Workshop Buttons'
  });  
});


module.exports = router;
