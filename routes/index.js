// NPM Module Imports
var express = require('express');
var router = express.Router();
var chalk = require('chalk');


// CONNECT salesforce & Set up PORT
var jsforce = require('jsforce');
var conn = new jsforce.Connection();

// LOGIN TO SALESFORCE
conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD + process.env.SF_SECURITY_TOKEN, function(err, res) {
  if (err) { return console.error(err); }
  else {
    console.log(chalk.green('Your site is connected to SalesForce.com with username: ') + process.env.SF_USERNAME);
    console.log(chalk.green('Listening on Port: ') + process.env.PORT);
  }
})
//--------------------------------------------------------------------------------------------------------------------------------------
// GET Home Page
router.get('/', function(request, response, next) {

    const routes = router.stack;

    // RENDER VIEW
    response.render('index', 
    { title: 'Shingo Website WC - Home',
      routes: routes});
});

//--------------------------------------------------------------------------------------------------------------------------------------
// PARTIALS
// GET Workshop Buttons 
router.get('/workshop-buttons', function(request, response, next) {
  response.render('Partials/workshopButtons', 
    { title: 'Workshop Buttons'
  });  
});

module.exports = router;
