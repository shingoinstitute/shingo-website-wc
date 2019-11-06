// This file contains any javascript util functions needed for any workshop related pages

const filterWorkshops = function() {
    var typeSelector = document.getElementsByName("workshopType")[0];
    var selectedType = typeSelector.options[typeSelector.selectedIndex].value;

    var countrySelector = document.getElementsByName("workshopCountry")[0];
    var selectedCountry = countrySelector.options[countrySelector.selectedIndex].value;
    
    const workshops = document.getElementsByClassName("workshop-card");

    for(let i = 0; i < workshops.length; i++) {
        if(workshops[i].firstChild.innerHTML == selectedType && workshops[i].children[1].children[2].innerHTML == selectedCountry) {
            workshops[i].style.display = 'inline-block';
        } 
        else if (selectedType == 'All' && workshops[i].children[1].children[2].innerHTML == selectedCountry) {
            workshops[i].style.display = 'inline-block';
        }
        else if (selectedCountry == 'All' && workshops[i].firstChild.innerHTML == selectedType) {
            workshops[i].style.display = 'inline-block';
        }
        else if (selectedCountry == 'All' && selectedType == 'All') {
            workshops[i].style.display = 'inline-block';
        }
        else {
            workshops[i].style.display = 'none';
        }
    }
}

const clearFilters = function() {
    document.getElementsByName("workshopType")[0].selectedIndex = 0;
    document.getElementsByName("workshopCountry")[0].selectedIndex = 0;
    filterWorkshops();
}

exports.formatWorkshopName = function(workshop) {
    switch(workshop) {
        case 'Discover':
            workshop = 'Discover Excellence';
            break;
        case 'Systems':
            workshop = 'Systems Design';
            break;
        case 'Enable':
            workshop = 'Cultural Enablers';
            break;
        case 'Improve':
            workshop = 'Continuous Improvement';
            break;
        case 'Align':
            workshop = 'Enterprise Alignment';
            break;
        case 'Build':
            workshop = 'Build Excellence';
            break;
    }

    return workshop;
}

exports.formatWorkshopDate = function(workshopDate) {
    if(workshopDate.substring(2,5) == 'Jun' || workshopDate.substring(3,6) == 'Sep' || workshopDate.substring(3,6) == 'Jul') {
        var newDateName = workshopDate.replace('Jun','June');
        workshopDate = newDateName;

        var newDateName = workshopDate.replace('Sep','Sept');
        workshopDate = newDateName;

        var newDateName = workshopDate.replace('Jul','July');
        workshopDate = newDateName;
    }

    return workshopDate;
}


