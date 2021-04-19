function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

function handleFilterAlumni(year) {
  var alumni = document.getElementsByClassName("alumni-members");

  //iterate through alumni and set display to none for nonmatching year
  for (let alum of alumni) {
    var display = "table-row";
    //if filter applied and year !== year param set display to none
    if (year !== "All") {
      if (alum.getAttribute("year") !== year) {
        display = "none";
      }
    }
    alum.style.display = display;
  }
}

//set default selected year to this year
var selectedYear = new Date().getFullYear();
var yearRange = [];

for (let i = 2019; i <= selectedYear; i++) {
  yearRange.push(i.toString());
}

//Grab container div by id
var thisDiv = document.getElementById("%%ELEMENT_ID%%"); //prefills in Oxygn
thisDiv.style.display = "inline-block";

//Create filter select element
var alumniYearFilterEl = document.createElement("SELECT");
alumniYearFilterEl.setAttribute("id", "alumni-member-filter");
alumniYearFilterEl.style.margin = "12px 12px";
alumniYearFilterEl.style.height = "40px";
alumniYearFilterEl.style.width = "20%";

//Add event listener to call handleAlumniFilter
alumniYearFilterEl.addEventListener("change", function (e) {
  selectedYear = e.target.value;
  handleFilterAlumni(selectedYear);
});

//Add All as first option for filter, then add available years
var allAlumniFilterOption = document.createElement("OPTION");
allAlumniFilterOption.innerHTML = "All Years";
allAlumniFilterOption.value = "All";
alumniYearFilterEl.appendChild(allAlumniFilterOption);

for (year of yearRange) {
  var filterOption = document.createElement("OPTION");
  filterOption.value = year;
  filterOption.innerHTML = year;
  alumniYearFilterEl.appendChild(filterOption);
}

thisDiv.appendChild(alumniYearFilterEl);
