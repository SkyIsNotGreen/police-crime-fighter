console.log("hello from game");

const mapApiKey = "AIzaSyAOCM-c2ZcfA_BS9BZSCd8a-fbiL9hz7a8";

const handleNavBarToggle = () => {
  const navBurgerBtn = $(".navbar-burger");

  const toggleNavBar = () => {
    // get the nav container id (the div to show and hide)
    const navContainerId = navBurgerBtn.attr("data-target");
    const navContainer = $(`#${navContainerId}`);

    // toggle the class for hamburger button to show/hide
    navBurgerBtn.toggleClass("is-active");

    // toggle the class for nav container to show/hide
    navContainer.toggleClass("is-active");
  };

  navBurgerBtn.click(toggleNavBar);
};

$(document).ready(() => {
  handleNavBarToggle();
});

const displayMap = () => {
  console.log("Here");
};

// get and display map from Google API

const initMap = () => {
  // https://developers.google.com/maps/documentation/javascript/interaction
  const birminghamLocation = { lat: 52.474282, lng: -1.898623 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: birminghamLocation,
    mapTypeId: "terrain",
    disableDefaultUI: true,
    zoomControl: false,
    gestureHandling: "none",
  });

  map.setTilt(45);
};

window.initMap = initMap;

// get data from police API

const getPoliceData = async () => {
  try {
    const response = await fetch(
      "https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2020-01"
    );

    if (response.ok) {
      const policeData = response.json();
      console.log(policeData);
    } else {
      throw new Error("Failed");
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

// sort police data into objects in an array with co-ordinates and crime category

// load resources and reset time, money & score

// display x amount of crimes on map to begin

// start timer

// display more crimes on map the longer the time goes on

// when resource is placed, work out radius and solvable crimes generating in that radius

// when crime is solved, increase money and score and remove crime from map

// create map
getPoliceData();
