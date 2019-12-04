const express = require('express');
const router = express.Router();
const jsforce = require('jsforce');
const conn = new jsforce.Connection();

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN, function(err, res) {
    if (err) { return console.error(err); }
  })

/* GET Shingo Academy Members Page. */
router.get('/academy', function(request, response, next) {

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
router.get('/alumni', function(request, response, next) {

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
router.get('/site-examiners', function(request, response, next) {

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
router.get('/research-examiners', function(request, response, next) {

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

router.get('/staff', function(request, response, next) {

  //Query SalesForce
  const query = "SELECT Name, Title, Email, Phone, Photograph__c,Account.Name  FROM Contact WHERE Account.Name = 'Shingo Institute' ORDER BY LastName";
  conn.query(query, function(err, res) {
    if (err) { return console.error(err); }

    // RENDER VIEW
    response.render('About/staff', 
    { title: 'Shingo Research & Publication Examiners',
      employees: res.records});
  });
});

module.exports = router;