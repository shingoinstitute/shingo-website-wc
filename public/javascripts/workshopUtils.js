// This file contains any javascript util functions needed for any workshop related pages

const filterWorkshops = function() {
  var typeSelector = document.getElementsByName("workshopType")[0];
  var selectedType = typeSelector.options[typeSelector.selectedIndex].value;

  var countrySelector = document.getElementsByName("workshopCountry")[0];
  var selectedCountry =
    countrySelector.options[countrySelector.selectedIndex].value;

  var virtualWorkshopCheckBox = document.getElementsByName("virtualWorkshops");

  const workshops = document.getElementsByClassName("workshop-card");

  for (let i = 0; i < workshops.length; i++) {
    // by default, each workshop will display, if any of the filter checks are not met, display will be set to "none"
    var display = "";

    // handles filtering for workshop type
    if (selectedType !== "All") {
      if (workshops[i].children[1].innerHTML !== selectedType) {
        display = "none";
      }
    }

    // handles filtering for workshop country
    if (selectedCountry !== "All") {
      if (workshops[i].children[2].children[2].innerHTML !== selectedCountry) {
        display = "none";
      }
    }

    // handles filtering for virtual workshops
    if (virtualWorkshopCheckBox[0].checked) {
      if (workshops[i].children[0].innerHTML !== "Virtual Workshop") {
        display = "none";
      }
    }

    workshops[i].style.display = display;
  }
};

const clearFilters = function() {
  document.getElementsByName("workshopType")[0].selectedIndex = 0;
  document.getElementsByName("workshopCountry")[0].selectedIndex = 0;
  document.getElementsByName("virtualWorkshops")[0].checked = false;
  filterWorkshops();
};

exports.formatWorkshopName = function(workshop) {
  switch (workshop) {
    case "Discover":
      workshop = "Discover Excellence";
      break;
    case "Systems":
      workshop = "Systems Design";
      break;
    case "Enable":
      workshop = "Cultural Enablers";
      break;
    case "Improve":
      workshop = "Continuous Improvement";
      break;
    case "Align":
      workshop = "Enterprise Alignment";
      break;
    case "Build":
      workshop = "Build Excellence";
      break;
  }

  return workshop;
};

exports.formatWorkshopDate = function(workshopDate) {
  if (
    workshopDate.substring(2, 5) == "Jun" ||
    workshopDate.substring(3, 6) == "Sep" ||
    workshopDate.substring(3, 6) == "Jul"
  ) {
    var newDateName = workshopDate.replace("Jun", "June");
    workshopDate = newDateName;

    var newDateName = workshopDate.replace("Sep", "Sept");
    workshopDate = newDateName;

    var newDateName = workshopDate.replace("Jul", "July");
    workshopDate = newDateName;
  }

  return workshopDate;
};
