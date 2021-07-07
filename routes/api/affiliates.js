const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");
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

// AFFILIATES---------------------------------------------------------------------------------------------------

/* GET Affiliates Page. */
router.get("/", function (request, response, next) {
  //Query SalesForce
  const query =
    "SELECT Id, Name, Logo__c, Page_Path__c, Website, Languages__c, Examiner_Staff__c FROM Account WHERE RecordType.Name='Licensed Affiliate' AND (NOT Name LIKE 'McKinsey%') AND (NOT Name LIKE 'Shingo Institute%') AND (NOT Name LIKE 'MyEducator%') AND (NOT Name LIKE 'BHP%') ORDER BY Name ASC";
  conn.query(query, function (err, res) {
    if (err) {
      return console.error(err);
    }
    // SEND JSON
    response.send(res.records);
  });
});

/* GET Affiliate page for a specific affiliate. */
router.get("/:id", function (request, response, next) {
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
      "SELECT Name, Id, Logo__c, Page_Path__c, Website, Languages__c, Locations__c, Industry_List__c, Summary__c, Public_Contact__c, Public_Contact_Email__c, Public_Contact_Phone__c, Affiliate_Induction_Year__c, Workshops_Certified_For__c FROM Account WHERE RecordType.Name='Licensed Affiliate' AND Account.Id =" +
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

module.exports = router;
