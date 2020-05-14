var buttonsContainer = document.getElementById("%%ELEMENT_ID%%");

buttonsContainer.style.display = "inline-block";

var buttons = [
  { 
    id : "button-1",
    img: "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/DiscoverButton.png",
   path: "/discover-excellence"  
  },
  {
    id : "button-2",
    img: "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/SystemsButton.png",
   path: "/systems-design"  
  },
  {
    id : "button-3",
    img: "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/EnableButton.png",
   path: "/cultural-enablers"  
  },
  {
    id : "button-4",
    img: "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/ImproveButton.png",
   path: "/continuous-improvement"  
  },
  {
    id : "button-5",
    img: "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/AlignButton.png",
   path: "/enterprise-alignment"  
  },
  {
    id : "button-6",
    img: "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/BuildButton.png",
   path: "/build-excellence"  
  }
  
]

for(let i = 0; i < buttons.length; i++) {
  var buttonImg = document.createElement("IMG");
  buttonImg.id = buttons[i].id;
  buttonImg.src = buttons[i].img;
  buttonImg.style.width = "12%";
  buttonImg.style.minWidth = "125px";
  buttonImg.style.margin = "15px";
  
  buttonLink = document.createElement("A");
  buttonLink.href = "/shingo-workshops" + buttons[i].path;
  
  buttonLink.addEventListener("mouseover", () => {
    var buttonImg = document.getElementById(buttons[i].id);
    buttonImg.style.opacity = ".75";
    
  });
  buttonLink.addEventListener("mouseout", () => {
    var buttonImg = document.getElementById(buttons[i].id);
    buttonImg.style.opacity = "1";
  });
  
  buttonLink.appendChild(buttonImg);
  
  // append children to parent container
  buttonsContainer.appendChild(buttonLink)
}
