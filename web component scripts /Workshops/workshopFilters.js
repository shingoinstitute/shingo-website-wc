function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.response);
}

function handleFilterWorkshops(type, country, isVirtualChecked) {
  type = type.replace(/\s+/g, "");
  var workshops = document.getElementsByClassName("workshop-schedule-cards");

  // iterates through all the workshops and if any don't match the current selected
  // filters, their display is set to 'none'
  for (let i = 0; i < workshops.length; i++) {
    // by default, each workshop will display, if any of the filter checks are not met, display will be set to "none"
    var display = "inline-block";

    // handles filtering for workshop type
    if (selectedType !== "All") {
      if (workshops[i].getAttribute("type") !== type) {
        display = "none";
      }
    }

    // handles filtering for workshop country
    if (selectedCountry !== "All") {
      if (workshops[i].getAttribute("country") !== country) {
        display = "none";
      }
    }

    if (isVirtualChecked === true) {
      if (workshops[i].getAttribute("workshop_type") !== "Virtual Workshop") {
        display = "none";
      }
    }
    workshops[i].style.display = display;
  }
}

// These variables track what the current selections
// are for workshop type and country
var selectedType = "All";
var selectedCountry = "All";
var isVirtualWorkshopsChecked = false;

// makes call to api for all workshops
var response = httpGet("https://shingo-website-wc.herokuapp.com/api/workshops");

var workshopTypes = response.workshopTypes;
var workshopCountries = response.workshopCountries;

// grab this div so we can insert elements into it
var workshopFilters = document.getElementById("div_block-5-632");
workshopFilters.style.display = "inline-block";

// create element for workshop type filter
var workshopTypeFilter = document.createElement("SELECT");
workshopTypeFilter.setAttribute("id", "workshop-type-filter");
workshopTypeFilter.style.margin = "12px 12px";
workshopTypeFilter.style.height = "40px";

// add an event listener to handler filter changes
workshopTypeFilter.addEventListener("change", function (e) {
  selectedType = e.target.value;
  handleFilterWorkshops(
    selectedType,
    selectedCountry,
    isVirtualWorkshopsChecked
  );
});

// add the first option to workshopTypeFilter element
var firstWorkshopType = document.createElement("OPTION");
firstWorkshopType.innerHTML = "Workshop Type";
firstWorkshopType.value = "All";
workshopTypeFilter.appendChild(firstWorkshopType);

// iterate through all the workshop types and
// append them to the workshopTypeFilter element
for (let i = 0; i < workshopTypes.length; i++) {
  workshopType = document.createElement("OPTION");
  workshopType.value = workshopTypes[i];
  workshopType.innerHTML = workshopTypes[i];
  workshopTypeFilter.appendChild(workshopType);
}

// create element for workshop country filter
var workshopCountryFilter = document.createElement("SELECT");
workshopCountryFilter.id = "workshop-country-filter";
workshopCountryFilter.style.margin = "12px 12px";
workshopCountryFilter.style.height = "40px";

// create the first option for the workshopCountryFilter element
var firstWorkshopCountry = document.createElement("OPTION");
firstWorkshopCountry.innerHTML = "Country";
firstWorkshopCountry.value = "All";
workshopCountryFilter.appendChild(firstWorkshopCountry);

// iterate through all the countries and
// append them to workshopCountryFilter element
for (let i = 0; i < workshopCountries.length; i++) {
  country = document.createElement("OPTION");
  country.value = workshopCountries[i];
  country.innerHTML = workshopCountries[i];
  workshopCountryFilter.appendChild(country);
}

// adds an onChange event handler to the menu
// to update the selectedCountry value
// add an event listener to handler filter changes
workshopCountryFilter.addEventListener("change", function (e) {
  selectedCountry = e.target.value;
  handleFilterWorkshops(
    selectedType,
    selectedCountry,
    isVirtualWorkshopsChecked
  );
});

// create filter for virtual workshops
var virtualWorkshopLabel = document.createElement("DIV");
virtualWorkshopLabel.id = "virtualWorkshopLabel";
virtualWorkshopLabel.style.width = "150px";
virtualWorkshopLabel.style.display = "inline-block";
virtualWorkshopLabel.style.verticalAlign = "middle";

var virtualWorkshopCheckBox = document.createElement("INPUT");
virtualWorkshopCheckBox.id = "virtual-workshop-checkBox";
virtualWorkshopCheckBox.type = "checkbox";
virtualWorkshopCheckBox.style.marginRight = "8px";
virtualWorkshopCheckBox.addEventListener("change", function (e) {
  isVirtualWorkshopsChecked = e.target.checked;
  handleFilterWorkshops(
    selectedType,
    selectedCountry,
    isVirtualWorkshopsChecked
  );
});

var virtualWorkshopText = document.createElement("SPAN");
virtualWorkshopText.innerHTML = "Display Only Virtual Workshops";

// append al of virualWorkshopLabel's children to itself
virtualWorkshopLabel.appendChild(virtualWorkshopCheckBox);
virtualWorkshopLabel.appendChild(virtualWorkshopText);

// create a clear filters button
var clearFilters = document.createElement("BUTTON");
clearFilters.id = "clear-filters-button";
clearFilters.innerHTML = "Clear Filters";
clearFilters.style.margin = "12px 12px";
clearFilters.style.height = "40px";
clearFilters.style.borderRadius = "5px";
clearFilters.style.backgroundColor = "#eee";

clearFilters.addEventListener("click", function () {
  // reset all the filters and filter values
  selectedType = "All";
  selectedCountry = "All";
  isVirtualWorkshopsChecked = false;
  document.getElementById("workshop-type-filter").selectedIndex = 0;
  document.getElementById("workshop-country-filter").selectedIndex = 0;
  document.getElementById("virtual-workshop-checkBox").checked = false;

  var workshops = document.getElementsByClassName("workshop-schedule-cards");
  for (let i = 0; i < workshops.length; i++) {
    workshops[i].style.display = "inline-block";
  }
});

workshopFilters.appendChild(workshopTypeFilter);
workshopFilters.appendChild(workshopCountryFilter);
workshopFilters.appendChild(virtualWorkshopLabel);
workshopFilters.appendChild(clearFilters);
