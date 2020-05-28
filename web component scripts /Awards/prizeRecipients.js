function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

function handleFilterAwards(type) {
  var awards = document.getElementsByClassName("awards");
  for(let i = 0; i < awards.length; i++) {
    if(awards[i].getAttribute("awardType") === type) {
       awards[i].style.display = "";
    } else {
       awards[i].style.display = "none";
    }
  }
}

function clearFilters() {
  var awards = document.getElementsByClassName("awards");
  for(let i = 0; i < awards.length; i++) {
    awards[i].style.display = "";
  }
}

var response = httpGet("https://shingo-website-wc.herokuapp.com/api/awards/prize-recipients");
var awards = response;
var shingoPrizeContainer = document.getElementById("%%ELEMENT_ID%%");
// create container for tabs
var tabs = document.createElement("DIV");
// create button for selecting shingo prize recipients
var allTab = document.createElement("BUTTON");
allTab.id = "allTab";
allTab.innerHTML = "All";
allTab.style.padding = "12px";
allTab.style.backgroundColor = "#eee";
allTab.addEventListener("click", () => {
  clearFilters();
});
allTab.addEventListener("mouseover", () => {
  document.getElementById("shingoPrizeTab").style.backgroundColor = "#ccc";
});
allTab.addEventListener("mouseout", () => {
  document.getElementById("shingoPrizeTab").style.backgroundColor = "#eee";
});
var shingoPrizeTab = document.createElement("BUTTON");
shingoPrizeTab.id = "shingoPrizeTab";
shingoPrizeTab.innerHTML = "Shingo Prize";
shingoPrizeTab.style.padding = "12px";
shingoPrizeTab.style.backgroundColor = "#eee";
shingoPrizeTab.addEventListener("click", () => {
  handleFilterAwards("Shingo Prize");
});
shingoPrizeTab.addEventListener("mouseover", () => {
  document.getElementById("shingoPrizeTab").style.backgroundColor = "#ccc";
});
shingoPrizeTab.addEventListener("mouseout", () => {
  document.getElementById("shingoPrizeTab").style.backgroundColor = "#eee";
});
// create button for selecting silver medallion recipients
var silverMedallionTab = document.createElement("BUTTON");
silverMedallionTab.id = "silverMedallionTab";
silverMedallionTab.innerHTML = "Silver Medallion";
silverMedallionTab.style.padding = "12px";
silverMedallionTab.style.backgroundColor = "#eee";
silverMedallionTab.addEventListener("click", () => {
  handleFilterAwards("Silver Medallion");
});
silverMedallionTab.addEventListener("mouseover", () => {
  document.getElementById("silverMedallionTab").style.backgroundColor = "#ccc";
});
silverMedallionTab.addEventListener("mouseout", () => {
  document.getElementById("silverMedallionTab").style.backgroundColor = "#eee";
});
// create button for selecting bronze medallion recipients
var bronzeMedallionTab = document.createElement("BUTTON");
bronzeMedallionTab.id = "bronzeMedallionTab";
bronzeMedallionTab.innerHTML = "Bronze Medallion";
bronzeMedallionTab.style.padding = "12px";
bronzeMedallionTab.style.backgroundColor = "#eee";
bronzeMedallionTab.addEventListener("click", () => {
  handleFilterAwards("Bronze Medallion");
});
bronzeMedallionTab.addEventListener("mouseover", () => {
  document.getElementById("bronzeMedallionTab").style.backgroundColor = "#ccc";
});
bronzeMedallionTab.addEventListener("mouseout", () => {
  document.getElementById("bronzeMedallionTab").style.backgroundColor = "#eee";
});

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
dateHeader.style.padding = "12px";

// create award type column
var typeHeader = document.createElement("TH");
typeHeader.innerHTML = "Award Type";
typeHeader.style.padding = "12px";

// create name column for table header
var nameHeader = document.createElement("TH");
nameHeader.innerHTML = "Name - Click for Profile Sheet"
nameHeader.style.padding = "12px";

// create press release column for table header
var pressReleaseHeader = document.createElement("TH");
pressReleaseHeader.innerHTML = "Press Release";
pressReleaseHeader.style.padding = "12px";

// create location column for table header
var locationHeader = document.createElement("TH");
locationHeader.innerHTML = "Location";
locationHeader.style.padding = "12px";

// append table headers to table row
tableHeaderRow.appendChild(dateHeader);
tableHeaderRow.appendChild(typeHeader);
tableHeaderRow.appendChild(nameHeader);
tableHeaderRow.appendChild(pressReleaseHeader);
tableHeaderRow.appendChild(locationHeader);

// append table header row to award table
awardTable.appendChild(tableHeaderRow);

// create and append all the rows of the table
for(let i = 0; i < awards.length; i++) {
  var tableRow = document.createElement("TR");
  tableRow.setAttribute("awardType", awards[i].SV_Status__c);
  tableRow.classList.add("awards");
  
  var awardDate = document.createElement("TD");
  awardDate.innerHTML = awards[i].Date_Awarded__c;
  awardDate.style.padding = "12px";
  
  var awardType = document.createElement("TD");
  awardType.innerHTML = awards[i].SV_Status__c;
  awardType.style.padding = "12px";
  
  var awardNameLink = document.createElement("A");
  awardNameLink.href = awards[i].Company_Profile_Link__c;
  awardNameLink.target = "_blank";
  awardNameLink.innerHTML = awards[i].Name;
  
  var awardName = document.createElement("TD");
  awardName.appendChild(awardNameLink);
  awardName.style.padding = "12px";
  
  var pressRelease = document.createElement("TD");
  pressRelease.style.textAlign = "center";
  pressRelease.style.padding = "12px";
  
  // create clickable icon for press release download
  var pressReleaseIcon = document.createElement("IMG");
  pressReleaseIcon.src = "https://img.icons8.com/ios/25/000000/download.png";
  
  var pressReleaseLink = document.createElement("A");
  pressReleaseLink.href = awards[i].Press_Release_Link__c;
  pressReleaseLink.target = "_blank";
  
  // add the icon as a child of the link so icon is clickable
  // add the link as a child of the table cell
  pressReleaseLink.appendChild(pressReleaseIcon);
  pressRelease.appendChild(pressReleaseLink);
  
  var awardLocation = document.createElement("TD");
  awardLocation.style.textAlign = "center";
  awardLocation.style.padding = "12px";
  awardLocation.innerHTML = awards[i].City__c ? awards[i].City__c : "";
  if(awards[i].State__c && (awards[i].State__c != awards[i].City__c)) {
    awardLocation.innerHTML += ", " + awards[i].State__c;
  }
  if(awards[i].Country__c) {
    awardLocation.innerHTML += ", " + awards[i].Country__c;
  }
  
  // append all the columns to the row
  tableRow.appendChild(awardDate);
  tableRow.appendChild(awardType);
  tableRow.appendChild(awardName);
  tableRow.appendChild(pressRelease);
  tableRow.appendChild(awardLocation);
  
  // append row to table
  awardTable.appendChild(tableRow);
}
// append buttons to the tabs div
tabs.appendChild(allTab);
tabs.appendChild(shingoPrizeTab);
tabs.appendChild(silverMedallionTab);
tabs.appendChild(bronzeMedallionTab);
// append all of shingoPrizeContainer's children to itself
shingoPrizeContainer.appendChild(tabs);
shingoPrizeContainer.appendChild(awardTable);