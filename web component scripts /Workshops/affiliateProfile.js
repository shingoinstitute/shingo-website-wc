function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

var response = httpGet(
  "https://shingo-website-wc.herokuapp.com/api/affiliates/0011200001HUXZIAA5"
);
var affiliate = response.affiliate;
var facilitators = response.facilitators;

// grab this current div by id
var affiliateContainer = document.getElementById("div_block-8-152");

//  create element to store all the affiliate info
var affiliateInfo = document.createElement("DIV");
affiliateInfo.style.width = "85%";
affiliateInfo.style.margin = "0 auto";
affiliateInfo.style.textAlign = "left";

// create element to store logo, website, and bio
var bio = document.createElement("DIV");
bio.style.margin = "2%";

// create element for affilaite logo
var logo = document.createElement("IMG");
logo.src = affiliate.Logo__c;
logo.style.margin = "0 auto";
logo.style.width = "600px";
logo.style.maxWidth = "100%";
logo.style.display = "block";
logo.style.marginBottom = "12px";

// create element for affiliate website link
var websiteLink = document.createElement("A");
websiteLink.innerHTML = affiliate.Website;
websiteLink.href = affiliate.Website;

// create element for affiliate biography
var biography = document.createElement("P");
biography.innerHTML = affiliate.Summary__c;

// append all of the bio div's children to itself
bio.appendChild(logo);
bio.appendChild(websiteLink);
bio.appendChild(biography);

// create element to store details such as languages, locations, and industries
var details = document.createElement("DIV");
details.style.margin = "2%";

// create element for languages title
var languagesTitle = document.createElement("H4");
languagesTitle.innerHTML = "Languages";

// create element for languages
var languages = document.createElement("H4");
languages.innerHTML = affiliate.Languages__c;
languages.style.fontWeight = "200";

// create element for locations title
var locationsTitle = document.createElement("H4");
locationsTitle.innerHTML = "Locations";

// create element for locations
var locations = document.createElement("H4");
locations.innerHTML = affiliate.Locations__c;
locations.style.fontWeight = "200";

// create element for industries title
var industriesTitle = document.createElement("H4");
industriesTitle.innerHTML = "Industries";

// create element for industries
var industries = document.createElement("H4");
industries.innerHTML = affiliate.Industry_List__c;
industries.style.fontWeight = "200";

// append all of detail's children to itself
details.appendChild(languagesTitle);
details.appendChild(languages);
details.appendChild(locationsTitle);
details.appendChild(locations);
details.appendChild(industriesTitle);
details.appendChild(industries);

// create element for contact info
var contact = document.createElement("DIV");
contact.style.textAlign = "center";

var contactInfo = document.createElement("P");
contactInfo.innerHTML =
  "Contact: " +
  affiliate.Public_Contact__c +
  " | " +
  affiliate.Public_Contact_Email__c +
  " | " +
  affiliate.Public_Contact_Phone__c;

// append contactInfo to contact container
contact.appendChild(contactInfo);

// create container for facilitator info
var facilitatorInfo = document.createElement("DIV");

// create facilitators banner if there are any facilitators
var facilitatorsBanner = document.createElement("DIV");
facilitatorsBanner.style.height = "100px";
facilitatorsBanner.style.backgroundColor = "#3da9f4";
facilitatorsBanner.style.paddingTop = "25px";
facilitatorsBanner.style.paddingLeft = "5%";

// create title for facilitators banner
var bannerTitle = document.createElement("H2");
bannerTitle.innerHTML = "Certified Facilitators";
bannerTitle.style.color = "white";

facilitatorsBanner.appendChild(bannerTitle);

// append facilitaorInfo's children to itself
facilitatorInfo.appendChild(facilitatorsBanner);

// for each facilitator, append their bio and photograph
for (let i = 0; i < facilitators.length; i++) {
  var facilitatorBio = document.createElement("DIV");
  facilitatorBio.style.margin = "20px 0";

  // create a div for profile pic
  var profilePic = document.createElement("DIV");
  profilePic.style.height = "325px";
  profilePic.style.display = "inline-block";
  profilePic.style.width = "300px";
  profilePic.style.backgroundImage =
    "url(" + facilitators[i].Photograph__c + ")";
  profilePic.style.backgroundRepeat = "no-repeat";
  profilePic.style.backgroundSize = "cover";
  profilePic.style.verticalAlign = "middle";
  profilePic.style.marginRight = "20px";

  // create element for facilitator name
  var facilitatorName = document.createElement("H5");
  facilitatorName.innerHTML = facilitators[i].Name;
  facilitatorName.style.color = "white";
  facilitatorName.style.backgroundColor = "#777";
  facilitatorName.style.width = "300px";
  facilitatorName.style.paddingLeft = "12px";
  facilitatorName.style.marginTop = "297px";

  // append name to profile pic
  profilePic.appendChild(facilitatorName);

  // create element for facilitator summary container
  var facilitatorSummaryContainer = document.createElement("DIV");
  facilitatorSummaryContainer.style.display = "inline-block";
  facilitatorSummaryContainer.style.width = "500px";
  facilitatorSummaryContainer.style.maxWidth = "100%";
  facilitatorSummaryContainer.style.verticalAlign = "middle";

  // create element for facilitator summary
  var facilitatorSummary = document.createElement("P");
  facilitatorSummary.innerHTML = facilitators[i].Biography__c;

  facilitatorSummaryContainer.appendChild(facilitatorSummary);

  // append all facilitatorBio's children to itself
  facilitatorBio.appendChild(profilePic);
  facilitatorBio.appendChild(facilitatorSummaryContainer);

  // append facilitatorBio to facilitatorsInfo
  facilitatorInfo.appendChild(facilitatorBio);
}

// append bio and details to affiliateInfo div
affiliateInfo.appendChild(bio);
affiliateInfo.appendChild(details);
affiliateInfo.appendChild(contact);

// if there are facilitators, append them to affiliate info
if (facilitators.length > 0) {
  affiliateInfo.appendChild(facilitatorInfo);
}

// append affilaite info and facilitators to the main container
affiliateContainer.appendChild(affiliateInfo);
