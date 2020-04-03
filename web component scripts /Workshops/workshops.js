// This script builds workshop cards for a specific type of workshop
// To use, input the correct id of the HTML element you would like to insert
// the workshop cards into

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

var response = httpGet("https://shingo-website-wc.herokuapp.com/api/discover");
var workshopsContainer = document.getElementById("ELEMENT ID"); // INSERT ELEMENT ID HERE  ****
workshopsContainer.style.display = "inline-block";

var workshops = response;

for (let i = 0; i < workshops.length; i++) {
  // create workshop card
  var workshopCard = document.createElement("DIV");
  workshopCard.classList.add("workshop-schedule-cards");
  var workshopType = workshops[i].Workshop_Type__c.replace(/\s+/g, "");
  // set type sttribute for filtering
  workshopCard.setAttribute("type", workshopType);

  // set country attribute for filtering
  workshopCard.setAttribute("country", workshops[i].Event_Country__c);

  // set isVirtual attribute for filtering
  workshopCard.setAttribute("workshop_type", workshops[i].RecordType.Name);

  workshopCard.style.width = "250px";
  workshopCard.style.verticalAlign = "top";
  workshopCard.style.display = "inline-block";
  workshopCard.style.border = "solid .5px #555";
  workshopCard.style.margin = "12px";
  workshopCard.style.paddingBottom = "25px";
  workshopCard.style.backgroundSize = "200px";
  workshopCard.style.backgroundRepeat = "no-repeat";
  workshopCard.style.backgroundPositionX = "155px";
  workshopCard.style.backgroundPositionY = "235px";
  workshopCard.style.textAlign = "left";

  // depending of which type of workshop it is
  // it will be assigned a different background image
  if (workshops[i].Workshop_Type__c === "Discover Excellence") {
    workshopCard.style.backgroundImage =
      "url(https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/DiscoverButton.png)";
  } else if (workshops[i].Workshop_Type__c === "Systems Design") {
    workshopCard.style.backgroundImage =
      "url(https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/SystemsButton.png)";
  } else if (workshops[i].Workshop_Type__c === "Cultural Enablers") {
    workshopCard.style.backgroundImage =
      "url(https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/EnableButton.png)";
  } else if (workshops[i].Workshop_Type__c === "Continuous Improvement") {
    workshopCard.style.backgroundImage =
      "url(https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/ImproveButton.png)";
  } else if (workshops[i].Workshop_Type__c === "Enterprise Alignment") {
    workshopCard.style.backgroundImage =
      "url(https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/AlignButton.png)";
  } else if (workshops[i].Workshop_Type__c === "Build Excellence") {
    workshopCard.style.backgroundImage =
      "url(https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/BuildButton.png)";
  }

  // if the workhop is a virtual workshop, then create
  // DIV and fill it with the text ""
  var banner = document.createElement("DIV");
  banner.style.height = "33px";
  banner.style.padding = "5px";
  banner.style.textAlign = "center";
  banner.style.color = "white";

  // depending on which type of workshop it is, it will receive a different
  // type of banner
  if (workshops[i].RecordType.Name === "Virtual Workshop") {
    banner.style.backgroundColor = "#333";
    banner.innerHTML = "Virtual Workshop";
  } else {
    banner.style.backgroundColor = "#1e508b";
    banner.innerHTML = "Face-to-Face Workshop";
  }

  // create a container for workshop info
  var infoContainer = document.createElement("DIV");
  infoContainer.style.height = "250px";
  infoContainer.style.padding = "0px 16px";

  // create workshop type element
  var type = document.createElement("H4");
  type.innerHTML = workshops[i].Workshop_Type__c;

  // create date element
  var date = document.createElement("P");
  date.innerHTML = workshops[i].Start_Date__c + "-" + workshops[i].End_Date__c;
  date.style.marginBottom = "0px";
  date.style.marginTop = "0px";

  var timezoneTitle = document.createElement("P");
  timezoneTitle.innerHTML = "Time Zone:";
  timezoneTitle.style.margin = "12px 0px 0px 0px";
  timezoneTitle.style.fontWeight = "bold";

  // create element for timezone
  var timezone = document.createElement("P");
  timezone.innerHTML = workshops[i].Timezone__c;
  timezone.style.margin = "0px";

  // create location element
  var eventLocation = document.createElement("P");
  eventLocation.innerHTML =
    workshops[i].Event_City__c + ", " + workshops[i].Event_Country__c;
  eventLocation.style.margin = "0px 0px";

  // create title for host site
  var hostSiteTitle = document.createElement("P");
  hostSiteTitle.innerHTML = "Host Site:";
  hostSiteTitle.style.margin = "12px 0px 0px 0px";
  hostSiteTitle.style.fontWeight = "bold";

  // create element for host site
  var hostSite = document.createElement("P");
  hostSite.innerHTML = workshops[i].Host_Site__c;
  hostSite.style.margin = "0px 0px 12px 0px";

  // create element for affiliate title
  var affiliateTitle = document.createElement("P");
  affiliateTitle.innerHTML = "Affiliate:";
  affiliateTitle.style.margin = "12px 0px 0px 0px";
  affiliateTitle.style.fontWeight = "bold";

  // create element for affiliate name
  var affilaiteName = document.createElement("P");
  affilaiteName.innerHTML = workshops[i].Affiliate__c;
  affilaiteName.style.margin = "0px 0px 12px 0px";

  var btn = document.createElement("A");
  btn.innerHTML = "Register";
  btn.href = workshops[i].Registration_Website__c;
  btn.style.backgroundColor = "#f99800";
  btn.style.padding = "12px 25px";
  btn.style.margin = "0px 16px";
  btn.style.color = "white";
  btn.style.borderRadius = "5px";

  var wrapperLink = document.createElement("A");
  wrapperLink.href = workshops[i].Registration_Website__c;
  wrapperLink.target = "_blank";
  wrapperLink.style.color = "#333";

  // append all of workshop card's children to itself
  // some differences depending on whether or not it is a virtual workshop
  infoContainer.appendChild(type);
  infoContainer.appendChild(date);
  if (workshops[i].RecordType.Name === "Virtual Workshop") {
    infoContainer.appendChild(timezoneTitle);
    infoContainer.appendChild(timezone);
  }

  if (workshops[i].RecordType.Name !== "Virtual Workshop") {
    infoContainer.appendChild(eventLocation);
    infoContainer.appendChild(hostSiteTitle);
    infoContainer.appendChild(hostSite);
  }
  infoContainer.appendChild(affiliateTitle);
  infoContainer.appendChild(affilaiteName);

  workshopCard.appendChild(banner);
  workshopCard.appendChild(infoContainer);
  workshopCard.appendChild(btn);

  wrapperLink.appendChild(workshopCard);

  workshopsContainer.appendChild(wrapperLink);
}
