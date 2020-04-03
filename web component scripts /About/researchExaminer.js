// this script inserts a row for each research examiner member into a tabel that is contained
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
  "https://shingo-website-wc.herokuapp.com/api/research-examiners"
);
var reseachExaminers = response.research_examiners;
var pubExaminers = response.publication_examiners;
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
var headerRowResearch = document.createElement("TR");
headerRowResearch.style.color = "white";
headerRowResearch.style.backgroundColor = "#3da9f4";

// create date column for table header
var nameHeaderResearch = document.createElement("TH");
nameHeaderResearch.innerHTML = "Research Examiner";
nameHeaderResearch.style.padding = "18px";
nameHeaderResearch.style.border = "solid 1px #ccc";
nameHeaderResearch.style.textAlign = "left";

// create name column for table header
var positionHeaderResearch = document.createElement("TH");
positionHeaderResearch.innerHTML = "Position";
positionHeaderResearch.style.padding = "18px";
positionHeaderResearch.style.border = "solid 1px #ccc";
positionHeaderResearch.style.textAlign = "left";

// create location column for table header
var companyHeaderResearch = document.createElement("TH");
companyHeaderResearch.innerHTML = "Company";
companyHeaderResearch.style.padding = "18px";
companyHeaderResearch.style.textAlign = "left";
companyHeaderResearch.style.border = "solid 1px #ccc";

// append table headers to table row
headerRowResearch.appendChild(nameHeaderResearch);
headerRowResearch.appendChild(positionHeaderResearch);
headerRowResearch.appendChild(companyHeaderResearch);

// append table header row to examiner table
examinerTable.appendChild(headerRowResearch);

// create and append all the rows of the table
for (let i = 0; i < reseachExaminers.length; i++) {
  var tableRow = document.createElement("TR");
  tableRow.style.textAlign = "left";

  var examinerName = document.createElement("TD");
  examinerName.innerHTML = reseachExaminers[i].Name;
  examinerName.style.padding = "18px";

  var examinerPosition = document.createElement("TD");
  examinerPosition.innerHTML = reseachExaminers[i].Title;
  examinerPosition.style.padding = "18px";

  var examinerCompany = document.createElement("TD");
  examinerCompany.innerHTML = reseachExaminers[i].Account.Name;
  examinerCompany.style.padding = "18px";

  // append all the columns to the row
  tableRow.appendChild(examinerName);
  tableRow.appendChild(examinerPosition);
  tableRow.appendChild(examinerCompany);

  // append row to table
  examinerTable.appendChild(tableRow);
}

// create row for table header
var headerRowPub = document.createElement("TR");
headerRowPub.style.color = "white";
headerRowPub.style.backgroundColor = "#3da9f4";

// create date column for table header
var nameHeaderPub = document.createElement("TH");
nameHeaderPub.innerHTML = "Publication Examiner";
nameHeaderPub.style.padding = "18px";
nameHeaderPub.style.border = "solid 1px #ccc";
nameHeaderPub.style.textAlign = "left";

// create name column for table header
var positionHeaderPub = document.createElement("TH");
positionHeaderPub.innerHTML = "Position";
positionHeaderPub.style.padding = "18px";
positionHeaderPub.style.border = "solid 1px #ccc";
positionHeaderPub.style.textAlign = "left";

// create location column for table header
var companyHeaderPub = document.createElement("TH");
companyHeaderPub.innerHTML = "Company";
companyHeaderPub.style.padding = "18px";
companyHeaderPub.style.textAlign = "left";
companyHeaderPub.style.border = "solid 1px #ccc";

// append table headers to table row
headerRowPub.appendChild(nameHeaderPub);
headerRowPub.appendChild(positionHeaderPub);
headerRowPub.appendChild(companyHeaderPub);

// append table header row to examiner table
examinerTable.appendChild(headerRowResearch);

// create and append all the rows of the table
for (let i = 0; i < pubExaminers.length; i++) {
  var tableRow = document.createElement("TR");
  tableRow.style.textAlign = "left";

  var examinerName = document.createElement("TD");
  examinerName.innerHTML = pubExaminers[i].Name;
  examinerName.style.padding = "18px";

  var examinerPosition = document.createElement("TD");
  examinerPosition.innerHTML = pubExaminers[i].Title;
  examinerPosition.style.padding = "18px";

  var examinerCompany = document.createElement("TD");
  examinerCompany.innerHTML = pubExaminers[i].Account.Name;
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
