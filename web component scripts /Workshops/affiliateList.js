function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

var response = httpGet(
  "https://shingo-website-wc.herokuapp.com/api/affiliates"
);
var affiliatesContainer = document.getElementById("div_block-99-97");
affiliatesContainer.style.display = "inline-block";

var affiliates = response;

for (let i = 0; i < affiliates.length; i++) {
  // create workshop card
  var affiliateCard = document.createElement("DIV");
  affiliateCard.classList.add("workshop-schedule-cards");

  affiliateCard.style.width = "275px";
  affiliateCard.style.verticalAlign = "top";
  affiliateCard.style.display = "inline-block";
  affiliateCard.style.border = "solid .5px #ccc";
  affiliateCard.style.margin = "12px";
  affiliateCard.style.padding = "16px 16px 25px 16px";
  affiliateCard.style.backgroundSize = "200px";
  affiliateCard.style.backgroundRepeat = "no-repeat";
  affiliateCard.style.backgroundPositionX = "165px";
  affiliateCard.style.backgroundPositionY = "250px";

  // create a container for affiliate info
  var infoContainer = document.createElement("DIV");
  infoContainer.style.minHeight = "200px";
  infoContainer.style.marginTop = "18px";
  infoContainer.style.textAlign = "left";

  // create element for affilaite name
  var affiliateName = document.createElement("H4");
  affiliateName.innerHTML = affiliates[i].Name;

  // create element for languages title
  var languagesTitle = document.createElement("H5");
  languagesTitle.innerHTML = "Languages: ";
  languagesTitle.style.marginTop = "18px";

  // create element for affilaite languages
  var languages = document.createElement("H5");
  languages.innerHTML = affiliates[i].Languages__c;
  languages.style.fontWeight = "200";

  //create element for affiliate image
  var affiliateLogo = document.createElement("DIV");
  affiliateLogo.style.backgroundImage = "url(" + affiliates[i].Logo__c + ")";
  affiliateLogo.style.backgroundRepeat = "no-repeat";
  affiliateLogo.style.backgroundSize = "contain";
  affiliateLogo.style.backgroundPosition = "center center";
  affiliateLogo.style.height = "80px";

  var btn = document.createElement("A");
  btn.innerHTML = "Learn More";
  btn.href = "http://shingo.org/" + affiliates[i].Page_Path__c;
  btn.style.backgroundColor = "#f99800";
  btn.style.padding = "12px 25px";
  btn.style.color = "white";
  btn.style.borderRadius = "5px";

  var wrapperLink = document.createElement("A");
  wrapperLink.href = "http://shingo.org/affiliates/" + affiliates[i].Page_Path__c;
  wrapperLink.target = "_blank";
  wrapperLink.style.color = "#333";

  // append all of affiliate card's children to itself
  infoContainer.appendChild(affiliateName);
  infoContainer.appendChild(languagesTitle);
  infoContainer.appendChild(languages);

  affiliateCard.appendChild(affiliateLogo);
  affiliateCard.appendChild(infoContainer);
  affiliateCard.appendChild(btn);

  wrapperLink.appendChild(affiliateCard);

  affiliatesContainer.appendChild(wrapperLink);
}
