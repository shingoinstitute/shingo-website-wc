// this script inserts all the shingo staff cards into a container element,
// just insert the element id of the container below

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

var response = httpGet("https://shingo-website-wc.herokuapp.com/api/staff");
var staff = response;
var shingoStaffContainer = document.getElementById("ELEMENT ID"); // INSERT ID HERE***
shingoStaffContainer.style.display = "inline-block";

for (let i = 0; i < staff.length; i++) {
  // create div for each member
  var staffContainer = document.createElement("DIV");
  staffContainer.style.width = "225px";
  staffContainer.style.textAlign = "left";
  staffContainer.style.display = "inline-block";
  staffContainer.style.border = "solid 1px #ccc";
  staffContainer.style.margin = "12px";
  staffContainer.style.verticalAlign = "top";

  // create element for profile img
  var profilePic = document.createElement("DIV");
  profilePic.style.backgroundImage = "url(" + staff[i].Photograph__c + ")";
  profilePic.style.backgroundSize = "cover";
  profilePic.style.backgroundPosition = "center";
  profilePic.style.backgroundRepeat = "no-repeat";
  profilePic.style.height = "225px";
  profilePic.style.maxWidth = "100%";

  // create element to contain member info
  var infoContainer = document.createElement("DIV");
  infoContainer.style.padding = "0 8px";
  infoContainer.style.height = "135px";

  // create element for member name
  var staffName = document.createElement("H4");
  staffName.innerHTML = staff[i].Name;

  var staffTitle = document.createElement("P");
  staffTitle.innerHTML = staff[i].Title;
  staffTitle.style.margin = "0px";

  // create element for member position
  var staffPhone = document.createElement("A");
  staffPhone.innerHTML = staff[i].Phone;
  staffPhone.href = "tel:" + staff[i].Phone;
  staffPhone.style.display = "block";

  // create element for member company
  var staffEmail = document.createElement("A");
  staffEmail.innerHTML = staff[i].Email;
  staffEmail.href = "mailto:" + staff[i].Email;
  staffEmail.target = "_top";
  staffEmail.style.display = "block";

  // append all of infoContainer's children to itself
  infoContainer.appendChild(staffName);
  infoContainer.appendChild(staffTitle);
  infoContainer.appendChild(staffPhone);
  infoContainer.appendChild(staffEmail);

  // append all of staffContainer's children to itself
  staffContainer.appendChild(profilePic);
  staffContainer.appendChild(infoContainer);

  // append all of the staff to the parent container
  shingoStaffContainer.appendChild(staffContainer);
}
