// this script inserts the research awards into a container element, just
// insert the id of the container element below

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

var response = httpGet("https://shingo-website-wc.herokuapp.com/api/research");
var awards = response;
var awardsContainer = document.getElementById("ELEMENT ID"); // INSERT ELEMENT ID HERE***

// create a table header that all tables will share
var awardTable = document.createElement("TABLE");
awardTable.style.border = "solid 1px #ccc";

// create row for table header
var tableHeaderRow = document.createElement("TR");
tableHeaderRow.style.color = "white";
tableHeaderRow.style.backgroundColor = "#3da9f4";

// create date column for table header
var dateHeader = document.createElement("TH");
dateHeader.innerHTML = "Date";
dateHeader.style.padding = "18px";
dateHeader.style.border = "solid 1px #ccc";

// create name column for table header
var nameHeader = document.createElement("TH");
nameHeader.innerHTML = "Name - Click for Press Release";
nameHeader.style.padding = "18px";
nameHeader.style.border = "solid 1px #ccc";
nameHeader.style.textAlign = "left";

// create location column for table header
var authorHeader = document.createElement("TH");
authorHeader.innerHTML = "Author";
authorHeader.style.padding = "18px";
authorHeader.style.textAlign = "left";
authorHeader.style.border = "solid 1px #ccc";

// append table headers to table row
tableHeaderRow.appendChild(dateHeader);
tableHeaderRow.appendChild(nameHeader);
tableHeaderRow.appendChild(authorHeader);

// append table header row to award table
awardTable.appendChild(tableHeaderRow);

// create and append all the rows of the table
for (let i = 0; i < awards.length; i++) {
  var tableRow = document.createElement("TR");
  tableRow.setAttribute("awardType", awards[i].SV_Status__c);
  tableRow.classList.add("awards");
  tableRow.style.textAlign = "left";

  var awardDate = document.createElement("TD");
  awardDate.innerHTML = awards[i].Press_Release_Date__c;
  awardDate.style.padding = "18px";

  var awardNameLink = document.createElement("A");
  awardNameLink.href = awards[i].Press_Release_Link__c;
  awardNameLink.target = "_blank";
  awardNameLink.innerHTML = awards[i].Name;

  var awardName = document.createElement("TD");
  awardName.appendChild(awardNameLink);
  awardName.style.padding = "18px";

  var awardAuthor = document.createElement("TD");
  awardAuthor.innerHTML = awards[i].Public_Author_Name__c;
  awardAuthor.style.padding = "18px";

  // append all the columns to the row
  tableRow.appendChild(awardDate);
  tableRow.appendChild(awardName);
  tableRow.appendChild(awardAuthor);

  // append row to table
  awardTable.appendChild(tableRow);
}

// append all of awardsContainer's children to itself
awardsContainer.appendChild(awardTable);
