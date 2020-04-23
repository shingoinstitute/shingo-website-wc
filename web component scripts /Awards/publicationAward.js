// this script inserts the publication award recipients into the container element,
// just insert the element id below for the contianer element

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

var response = httpGet(
  "https://shingo-website-wc.herokuapp.com/api/awards/publication"
);
var awards = response;
var awardsContainer = document.getElementById("ELEMENT ID"); // INSERT ELEMENT ID HERE***

// create a container that will display a selected publication award
var selectedPubAward = document.createElement("DIV");
selectedPubAward.id = "selectedPubAward";
selectedPubAward.style.display = "none";

// create back button element
var backButton = document.createElement("IMG");
backButton.src = "https://img.icons8.com/color/96/000000/circled-left-2.png";
backButton.height = "96";

backButton.addEventListener("click", function () {
  var awardsContainer = document.getElementById("awardTable");
  awardsContainer.style.display = "";

  // set display of selected award to block
  var selectedPubAward = document.getElementById("selectedPubAward");
  selectedPubAward.style.display = "none";
});

// create element for publication award name
var pubAwardName = document.createElement("H3");
pubAwardName.id = "pubAwardName";

// create element for publication award author
var pubAwardAuthor = document.createElement("H5");
pubAwardAuthor.id = "pubAwardAuthor";
pubAwardAuthor.style.color = "#333";

// create element for publication award img
var pubAwardImg = document.createElement("IMG");
pubAwardImg.style.height = "400px";
pubAwardImg.id = "pubAwardImg";

var pubAwardCopy = document.createElement("DIV");
pubAwardCopy.id = "pubAwardCopy";

// append all of selecedPubAward to itself
selectedPubAward.appendChild(backButton);
selectedPubAward.appendChild(pubAwardName);
selectedPubAward.appendChild(pubAwardAuthor);
selectedPubAward.appendChild(pubAwardImg);
selectedPubAward.appendChild(pubAwardCopy);

// create a table header that all tables will share
var awardTable = document.createElement("TABLE");
awardTable.id = "awardTable";
awardTable.style.border = "solid 1px #ccc";

// create row for table header
var tableHeaderRow = document.createElement("TR");
tableHeaderRow.style.color = "white";
tableHeaderRow.style.backgroundColor = "#3da9f4";

// create date column for table header
var dateHeader = document.createElement("TH");
dateHeader.innerHTML = "Date";
dateHeader.style.padding = "12px";
dateHeader.style.border = "solid 1px #ccc";

// create name column for table header
var nameHeader = document.createElement("TH");
nameHeader.innerHTML = "Name - Click for Press Release";
nameHeader.style.padding = "12px";
nameHeader.style.border = "solid 1px #ccc";
nameHeader.style.textAlign = "left";

// create location column for table header
var authorHeader = document.createElement("TH");
authorHeader.innerHTML = "Author";
authorHeader.style.padding = "12px";
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
  // this removes the month from the date
  awards[i].Press_Release_Date__c = awards[i].Press_Release_Date__c.split(
    " "
  ).pop();
  awardDate.innerHTML = awards[i].Press_Release_Date__c;
  awardDate.style.padding = "12px";

  var awardNameLink = document.createElement("BUTTON");
  awardNameLink.addEventListener("click", function () {
    // retrieve information for clicked publication award
    var publicationAward = httpGet(
      "https://shingo-website-wc.herokuapp.com/api/publication/" + awards[i].Id
    );

    // set display of awards to none
    var awardsContainer = document.getElementById("awardTable");
    awardsContainer.style.display = "none";

    // set display of selected award to block
    var selectedPubAward = document.getElementById("selectedPubAward");
    selectedPubAward.style.display = "";

    // assign the correct name for publication award
    var pubAwardName = document.getElementById("pubAwardName");
    pubAwardName.innerHTML = publicationAward.Name;

    // assign the author to publication award
    var pubAwardAuthor = document.getElementById("pubAwardAuthor");
    pubAwardAuthor.innerHTML =
      "Author: " + publicationAward.Public_Author_Name__c;

    // assign the img to the publication award
    var pubAwardImg = document.getElementById("pubAwardImg");
    pubAwardImg.src = publicationAward.Cover_Image__c;

    // assign the copy to the publication award
    var pubAwardCopy = document.getElementById("pubAwardCopy");
    pubAwardCopy.innerHTML = publicationAward.Press_Release_Copy__c;
  });

  awardNameLink.innerHTML = awards[i].Name;
  awardNameLink.style.textAlign = "left";
  awardNameLink.style.backgroundColor = "transparent";
  awardNameLink.style.borderColor = "transparent";
  awardNameLink.style.color = "#3da9f4";

  var awardName = document.createElement("TD");
  awardName.appendChild(awardNameLink);
  awardName.style.padding = "12px";

  var awardAuthor = document.createElement("TD");
  awardAuthor.innerHTML = awards[i].Public_Author_Name__c;
  awardAuthor.style.padding = "12px";

  // append all the columns to the row
  tableRow.appendChild(awardDate);
  tableRow.appendChild(awardName);
  tableRow.appendChild(awardAuthor);

  // append row to table
  awardTable.appendChild(tableRow);
}

// append all of awardsContainer's children to itself
awardsContainer.appendChild(selectedPubAward);
awardsContainer.appendChild(awardTable);
