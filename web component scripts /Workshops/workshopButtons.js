var buttonsContainer = document.getElementById("div_block-18-632");
buttonsContainer.style.display = "inline-block";

var buttons = [
  {
    id: "button-1",
    img:
      "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/DiscoverButton.png",
    path: "/discover",
  },
  {
    id: "button-2",
    img:
      "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/SystemsButton.png",
    path: "/systems",
  },
  {
    id: "button-3",
    img:
      "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/EnableButton.png",
    path: "/enable",
  },
  {
    id: "button-4",
    img:
      "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/ImproveButton.png",
    path: "/improve",
  },
  {
    id: "button-5",
    img:
      "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/AlignButton.png",
    path: "/align",
  },
  {
    id: "button-6",
    img:
      "https://res.cloudinary.com/shingo/image/upload/v1582927002/Web%20Content/workshop%20icons/BuildButton.png",
    path: "/build",
  },
];

for (let i = 0; i < buttons.length; i++) {
  var buttonImg = document.createElement("IMG");
  buttonImg.id = buttons[i].id;
  buttonImg.src = buttons[i].img;
  buttonImg.style.width = "15%";
  buttonImg.style.minWidth = "125px";
  buttonImg.style.margin = "12px";

  buttonLink = document.createElement("A");
  buttonLink.href = "http://shingo.org/education" + buttons[i].path;

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
  buttonsContainer.appendChild(buttonLink);
}
