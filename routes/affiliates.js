const express = require('express');
const router = express.Router();
var jsforce = require('jsforce');
var conn = new jsforce.Connection();

conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN, function(err, res) {
    if (err) { return console.error(err); }
  })

/* GET Affiliates Page. */
router.get('/', function(request, response, next) {

    //Query SalesForce
    const query = 'SELECT Id, Name, Logo__c, Page_Path__c, Website, Languages__c FROM Account WHERE RecordType.Name=\'Licensed Affiliate\' AND (NOT Name LIKE \'McKinsey%\') AND (NOT Name LIKE \'Shingo Institute%\') AND (NOT Name LIKE \'MyEducator%\') ORDER BY Name ASC'
    conn.query(query, function(err, res) {
      if (err) { return console.error(err); }
  
      // RENDER VIEW
      response.render('Workshops/affiliates', 
      { title: 'Affiliates',
        affiliates: res.records});
    });
});
  
  
  /* GET Affiliate page for specific affiliate. */
router.get('/:id', function(request, response, next) {

    //Query SalesForce
    const query = 'SELECT Account.Name, Account.Id, Account.Logo__c, Account.Page_Path__c, Account.Website, Account.Languages__c, Account.Locations__c,Account.Industry_List__c, Account.Summary__c, Account.Public_Contact__c, Account.Public_Contact_Email__c, Account.Public_Contact_Phone__c, (SELECT Contact.Name,Contact.Facilitator_For__c,Contact.Photograph__c,Contact.Biography__c FROM Contacts WHERE Contact.Facilitator_For__c != null) FROM Account WHERE RecordType.Name=\'Licensed Affiliate\' AND Account.Id =' + '\'' + request.params.id + '\''
    conn.query(query, function(err, res) {
        if (err) { return console.error(err); }
        
        // RENDER VIEW
        response.render('Workshops/affiliateTemplate', 
        { title: 'Affiliates',
        affiliate: res.records[0]
        });
    });
});

module.exports= router;


