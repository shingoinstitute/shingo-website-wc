// this script inserts a row for each faculty fellow member into a tabel that is contained
// in a container element, just insert the id of the container element below

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

var response = httpGet(
  "https://shingo-website-wc.herokuapp.com/api/about/faculty-fellows"
);
var members = response;
var facultyContainer = document.getElementById("ELEMENT ID"); // INSERT ID HERE***
facultyContainer.style.display = "inline-block";

// create element to hold all the seab members
var membersMainContainer = document.createElement("DIV");
membersMainContainer.id = "membersMainContainer";

// create element for member profile to be displayed
var memberProfile = document.createElement("DIV");
memberProfile.id = "memberProfile";
memberProfile.style.textAlign = "left";
memberProfile.style.display = "none";

// create element for back button
var backButton = document.createElement("IMG");
backButton.id = "backButton";
backButton.style.height = "96px";
backButton.style.marginLeft = "20px";
backButton.src = "https://img.icons8.com/color/96/000000/circled-left-2.png";
backButton.addEventListener("click", function () {
  var membersMainContainer = document.getElementById("membersMainContainer");
  membersMainContainer.style.display = "";

  var memberProfile = document.getElementById("memberProfile");
  memberProfile.style.display = "none";
});

// create container for member profile info
var profileInfo = document.createElement("DIV");
profileInfo.style.width = "85%";
profileInfo.style.margin = "0 auto";
profileInfo.style.textAlign = "center";

// create element for profile image
var profileImg = document.createElement("IMG");
profileImg.style.height = "300px";
profileImg.style.maxWidth = "100%";
profileImg.id = "profileImg";

// create element for member name
var profileMemberName = document.createElement("H2");
profileMemberName.id = "profileMemberName";

// create element for member position;
var profileMemberPosition = document.createElement("H4");
profileMemberPosition.id = "profileMemberPosition";
profileMemberPosition.style.fontWeight = "200";

// create element for member company
var profileMemberCompany = document.createElement("H4");
profileMemberCompany.id = "profileMemberCompany";
profileMemberCompany.style.fontWeight = "200";

// create element for member summary
var profileMemberSummary = document.createElement("DIV");
profileMemberSummary.id = "profileMemberSummary";
profileMemberSummary.style.margin = "25px 0px";
profileMemberSummary.style.textAlign = "left";

// append all of profileInfo's children to itself
profileInfo.appendChild(profileImg);
profileInfo.appendChild(profileMemberName);
profileInfo.appendChild(profileMemberPosition);
profileInfo.appendChild(profileMemberCompany);
profileInfo.appendChild(profileMemberSummary);

// append memberProfile's children to itself
memberProfile.appendChild(backButton);
memberProfile.appendChild(profileInfo);

for (let i = 0; i < members.length; i++) {
  // create div for each member
  var memberContainer = document.createElement("DIV");
  memberContainer.style.width = "200px";
  memberContainer.style.display = "inline-block";
  memberContainer.style.margin = "12px";
  memberContainer.style.verticalAlign = "top";

  // this event listener handles making the member profile appear and the rest of the,
  // cards disappear
  // assigning the correct values to the corresponding parts of the profile
  memberContainer.addEventListener("click", function () {
    // change display of members to none
    var membersMainContainer = document.getElementById("membersMainContainer");
    membersMainContainer.style.display = "none";

    // make profile visible
    var memberProfile = document.getElementById("memberProfile");
    memberProfile.style.display = "";

    // fetch selected profile's data
    var member = httpGet(
      "https://shingo-website-wc.herokuapp.com/api/faculty-fellows/" +
        members[i].Id
    );
    console.log(member);

    // assign all the elements in the profile their correct values
    var profileImg = document.getElementById("profileImg");
    profileImg.src = member.Photograph__c;

    var profileMemberName = document.getElementById("profileMemberName");
    profileMemberName.innerHTML = member.Name;

    var profileMemberPosition = document.getElementById(
      "profileMemberPosition"
    );
    profileMemberPosition.innerHTML = member.Title;

    var profileMemberCompany = document.getElementById("profileMemberCompany");
    profileMemberCompany.innerHTML = member.Account.Name;

    var profileMemberSummary = document.getElementById("profileMemberSummary");
    profileMemberSummary.innerHTML = member.Biography__c;

    // scroll to beginning of profie
    location.href = "#backButton";
  });

  // create element for profile img
  var profilePic = document.createElement("IMG");
  profilePic.src = members[i].Photograph__c;
  profilePic.style.height = "200px";
  profilePic.style.maxWidth = "100%";

  // create element to contain member info
  var infoContainer = document.createElement("DIV");
  infoContainer.style.padding = "0 5px";

  // create element for member name
  var memberName = document.createElement("H4");
  memberName.innerHTML = members[i].Name;

  // create element for member position
  var memberPosition = document.createElement("P");
  memberPosition.innerHTML = members[i].Title;

  // create element for member company
  var memberCompany = document.createElement("P");
  memberCompany.innerHTML = members[i].Account.Name;

  // append all of infoContainer's children to itself
  infoContainer.appendChild(memberName);
  infoContainer.appendChild(memberPosition);
  infoContainer.appendChild(memberCompany);

  // append all of memberContainer's children to itself
  memberContainer.appendChild(profilePic);
  memberContainer.appendChild(infoContainer);

  // append all of the members to the parent container
  membersMainContainer.appendChild(memberContainer);
}

// append everything to the seabContainer
facultyContainer.appendChild(memberProfile);
facultyContainer.appendChild(membersMainContainer);
