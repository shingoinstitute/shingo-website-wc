// this script creates the event cards for showcases and inserts them into
// a container element. You just neeed to insert the correct element id for the
// container element

// This function requests data from API
function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

var showcasesContainer = document.getElementById("ELEMENT ID"); // ELEMENT ID GOES HERE***
var response = httpGet("https://shingo-website-wc.herokuapp.com/api/events");

for (let i = 0; i < response.length; i++) {
  // create card div
  var eventCard = document.createElement("DIV");
  eventCard.style.width = "100%";
  eventCard.style.marginLeft = "auto";
  eventCard.style.marginRight = "auto";
  eventCard.style.marginBottom = "25px";
  eventCard.style.marginTop = "12px";

  // create container div
  var eventInfoContainer = document.createElement("DIV");

  // create elements to append to container div
  var title = document.createElement("H3");
  title.innerHTML = response[i].Name;

  // since showcases are one day we only want to display the day number
  // once so here we just reduce the End_Date__c property to the last
  // four characters which will always be the year
  response[i].End_Date__c = response[i].End_Date__c.substr(
    response[i].End_Date__c.length - 4
  );

  var dateAndLocation = document.createElement("P");
  dateAndLocation.innerHTML =
    response[i].Start_Date__c +
    ", " +
    response[i].End_Date__c +
    " | " +
    response[i].Display_Location__c;

  // create button for registration link
  var btn = document.createElement("A");
  btn.innerHTML = "Learn More";
  btn.href = response[i].Registration_Link__c;
  btn.style.backgroundColor = "#f99800";
  btn.style.padding = "12px 25px";
  btn.style.color = "white";
  btn.style.borderRadius = "5px";

  // append all the children to the parent node
  eventInfoContainer.appendChild(title);
  eventInfoContainer.appendChild(dateAndLocation);
  eventInfoContainer.appendChild(btn);

  // create div to contain event image
  var image = document.createElement("DIV");
  image.id = "event-card-" + i;

  image.style.backgroundImage = "url(" + response[i].Banner_URL__c + ")";
  image.style.height = "300px";
  image.style.width = "100%";
  image.style.backgroundSize = "cover";
  image.style.backgroundPosition = "center";

  eventCard.appendChild(image);
  eventCard.appendChild(eventInfoContainer);

  if (response[i].Event_Type__c === "Showcase") {
    showcasesContainer.appendChild(eventCard);
  }
}
