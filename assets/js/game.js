console.log("hello from game");

const mapApiKey = "AIzaSyAOCM-c2ZcfA_BS9BZSCd8a-fbiL9hz7a8";
let crimeData = [];

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

$(document).ready(async () => {
  handleNavBarToggle();
});

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
  map.setOptions({ styles: styles["hide"] });
};

window.initMap = initMap;

// google API styles to remove default markers

const styles = {
  default: [],
  hide: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};

// get data from police API

const callPoliceApi = async () => {
  try {
    const response = await fetch(
      "https://data.police.uk/api/crimes-street/all-crime?poly=52.268,0.543:52.794,0.238:52.130,0.478&date=2020-01"
    );

    if (response.ok) {
      const policeData = response.json();
      return policeData;
    } else {
      throw new Error("Failed");
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

const getPoliceData = async () => {
  const data = await callPoliceApi();
  for (let i = 0; i < data.length; i++) {
    const dataObject = {
      category: data[i].category,
      lat: data[i].location.latitude,
      long: data[i].location.longitude,
    };
    crimeData.push(dataObject);
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

const sortedPoliceData = getPoliceData();
console.log(crimeData);
