// this script inserts a row for each academy member into a tabel that is contained
// in a container element, just insert the id of the container element below

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

var response = httpGet(
  "https://shingo-website-wc.herokuapp.com/api/about/academy"
);
var members = response;
var academyContainer = document.getElementById("ELEMENT ID"); // INSERT ID HERE***

// create a table header that all tables will share
var memberTable = document.createElement("TABLE");
memberTable.style.border = "solid 1px #ccc";

// create row for table header
var tableHeaderRow = document.createElement("TR");
tableHeaderRow.style.color = "white";
tableHeaderRow.style.backgroundColor = "#3da9f4";

// create date column for table header
var memberHeader = document.createElement("TH");
memberHeader.innerHTML = "Member";
memberHeader.style.padding = "18px";
memberHeader.style.border = "solid 1px #ccc";
memberHeader.style.textAlign = "left";

// create name column for table header
var positionHeader = document.createElement("TH");
positionHeader.innerHTML = "Position";
positionHeader.style.padding = "18px";
positionHeader.style.border = "solid 1px #ccc";
positionHeader.style.textAlign = "left";

// create location column for table header
var companyHeader = document.createElement("TH");
companyHeader.innerHTML = "Company";
companyHeader.style.padding = "18px";
companyHeader.style.textAlign = "left";
companyHeader.style.border = "solid 1px #ccc";

// append table headers to table row
tableHeaderRow.appendChild(memberHeader);
tableHeaderRow.appendChild(positionHeader);
tableHeaderRow.appendChild(companyHeader);

// append table header row to award table
memberTable.appendChild(tableHeaderRow);

// create and append all the rows of the table
for (let i = 0; i < members.length; i++) {
  var tableRow = document.createElement("TR");
  tableRow.style.textAlign = "left";

  var memberName = document.createElement("TD");
  memberName.innerHTML = members[i].Name;
  memberName.style.padding = "18px";

  var memberPosition = document.createElement("TD");
  memberPosition.innerHTML = members[i].Title;
  memberPosition.style.padding = "18px";

  var memberCompany = document.createElement("TD");
  memberCompany.innerHTML = members[i].Account.Name;
  memberCompany.style.padding = "18px";

  // append all the columns to the row
  tableRow.appendChild(memberName);
  tableRow.appendChild(memberPosition);
  tableRow.appendChild(memberCompany);

  // append row to table
  memberTable.appendChild(tableRow);
}

// append all of academyContainer's children to itself
academyContainer.appendChild(memberTable);
