// This file contains any javascript util functions needed for any workshop related pages

const showDropdownItems = function(filterOption) {

    const dropDownItems = document.getElementsByClassName(filterOption);

    for(let i = 0; i < dropDownItems.length; i++) {
        if(dropDownItems[i].style.display == 'block') {
            dropDownItems[i].style.display = 'none'; 
        } else {
            dropDownItems[i].style.display = 'block'; 
        }
    }
}

const filterWorkshops = function() {
    var typeSelector = document.getElementsByName("workshopType")[0];
    var selectedType = typeSelector.options[typeSelector.selectedIndex].value;

    var countrySelector = document.getElementsByName("workshopCountry")[0];
    var selectedCountry = countrySelector.options[countrySelector.selectedIndex].value;
    
    const workshops = document.getElementsByClassName("workshop-card");

    for(let i = 0; i < workshops.length; i++) {
        if(workshops[i].firstChild.innerHTML == selectedType && workshops[i].children[3].innerHTML == selectedCountry) {
            workshops[i].style.display = 'inline-block';
        } 
        else if (selectedType == 'All' && workshops[i].children[3].innerHTML == selectedCountry) {
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

