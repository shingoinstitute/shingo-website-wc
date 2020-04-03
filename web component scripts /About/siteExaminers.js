// this script inserts a row for each site examiner member into a tabel that is contained
// in a container element, just insert the id of the container element below

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

// array of objects containing info about shingo examiner committee
var examinerCommittee = [
  {
    Name: "Shaun Barker (Chair)",
    Position: "Assistant Director",
    Company: "Shingo Institute"
  },
  {
    Name: "Joanne Deys",
    Position: "President",
    Company: "Brightside Alliance, LLC"
  },
  {
    Name: "Bruce Hamilton",
    Position: "President",
    Company: "Greater Boston Manufacturing Partnership"
  },
  {
    Name: "Dale Lucht",
    Position: "Master Coach",
    Company: "Discover Financial Services"
  },
  {
    Name: "Mike Martyn",
    Position: "Founder",
    Company: "	SISU Consulting Group"
  },
  {
    Name: "Paul Terry",
    Position: "VP Supply Chain",
    Company: "O.C. Tanner Company"
  }
];

var response = httpGet(
  "https://shingo-website-wc.herokuapp.com/api/site-examiners"
);
var examiners = response;
var examinerContainer = document.getElementById("ELEMENT ID"); // INSERT ID HERE***

// create a table header that all tables will share
var examinerTable = document.createElement("TABLE");
examinerTable.style.border = "solid 1px #ccc";

// create header for examiner committee
var committeeHeader = document.createElement("TH");
committeeHeader.innerHTML = "Shingo Examiners Committee";
committeeHeader.style.color = "white";
committeeHeader.style.padding = "18px";
committeeHeader.style.backgroundColor = "#3da9f4";
committeeHeader.style.textAlign = "left";
committeeHeader.colSpan = "3";

var committeeHeaderContainer = document.createElement("TR");
committeeHeaderContainer.appendChild(committeeHeader);

// append committee header to table
examinerTable.appendChild(committeeHeaderContainer);

// create and append all the rows of the table
// for examiner committee
for (let i = 0; i < examinerCommittee.length; i++) {
  var tableRow = document.createElement("TR");
  tableRow.style.textAlign = "left";

  var examinerName = document.createElement("TD");
  examinerName.innerHTML = examinerCommittee[i].Name;
  examinerName.style.padding = "18px";

  var examinerPosition = document.createElement("TD");
  examinerPosition.innerHTML = examinerCommittee[i].Position;
  examinerPosition.style.padding = "18px";

  var examinerCompany = document.createElement("TD");
  examinerCompany.innerHTML = examinerCommittee[i].Company;
  examinerCompany.style.padding = "18px";

  // append all the columns to the row
  tableRow.appendChild(examinerName);
  tableRow.appendChild(examinerPosition);
  tableRow.appendChild(examinerCompany);

  // append row to table
  examinerTable.appendChild(tableRow);
}

// create row for table header
var tableHeaderRow = document.createElement("TR");
tableHeaderRow.style.color = "white";
tableHeaderRow.style.backgroundColor = "#3da9f4";

// create date column for table header
var nameHeader = document.createElement("TH");
nameHeader.innerHTML = "Examiner";
nameHeader.style.padding = "18px";
nameHeader.style.border = "solid 1px #ccc";
nameHeader.style.textAlign = "left";

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
tableHeaderRow.appendChild(nameHeader);
tableHeaderRow.appendChild(positionHeader);
tableHeaderRow.appendChild(companyHeader);

// append table header row to examiner table
examinerTable.appendChild(tableHeaderRow);

// create and append all the rows of the table
for (let i = 0; i < examiners.length; i++) {
  var tableRow = document.createElement("TR");
  tableRow.style.textAlign = "left";

  var examinerName = document.createElement("TD");
  examinerName.innerHTML = examiners[i].Name;
  examinerName.style.padding = "18px";

  var examinerPosition = document.createElement("TD");
  examinerPosition.innerHTML = examiners[i].Title;
  examinerPosition.style.padding = "18px";

  var examinerCompany = document.createElement("TD");
  examinerCompany.innerHTML = examiners[i].Account.Name;
  examinerCompany.style.padding = "18px";

  // append all the columns to the row
  tableRow.appendChild(examinerName);
  tableRow.appendChild(examinerPosition);
  tableRow.appendChild(examinerCompany);

  // append row to table
  examinerTable.appendChild(tableRow);
}

// append all of examinerContainer's children to itself
examinerContainer.appendChild(examinerTable);
