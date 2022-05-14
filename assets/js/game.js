console.log("hello from game");

// game variables

const mapApiKey = "AIzaSyAOCM-c2ZcfA_BS9BZSCd8a-fbiL9hz7a8";
const crimeData = [];
let score = 0;
let money = 0;
let time = 0;
let crimeIndex = 0;
let crimeInterval = 3000;

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
  resetInfo();
});

// get and display map from Google API

const initMap = async () => {
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

  const sortedPoliceData = await getPoliceData(map);

  startTimer();

  // getInitialMarkers(map);
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
      "https://data.police.uk/api/crimes-street/all-crime?lat=52.474282&lng=-1.898623&date=2020-01"
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

// sort police data into objects in an array with co-ordinates and crime category

const getPoliceData = async (map) => {
  const data = await callPoliceApi();
  for (let i = 0; i < data.length; i++) {
    const dataObject = {
      position: new google.maps.LatLng(
        data[i].location.latitude,
        data[i].location.longitude
      ),
      type: data[i].category,
    };
    crimeData.push(dataObject);
  }

  // show crime markers at certain intervals
  setInterval(getInitialMarkers, crimeInterval, map);
};

// display x amount of crimes on map to begin

const getInitialMarkers = (map) => {
  const marker = new google.maps.Marker({
    position: crimeData[crimeIndex].position,
    map: map,
  });

  const infowindow = new google.maps.InfoWindow({
    content: crimeData[crimeIndex].type,
  });

  marker.addListener("mouseover", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });

  marker.addListener("mouseout", () => {
    infowindow.close();
  });

  crimeIndex++;
};

// load resources and reset time, money & score

const resetInfo = () => {
  $("#money").text(money);
  $("#time").text(time);
  $("#score").text(score);
};

// start and update timer

const startTimer = () => {
  window.setInterval(() => {
    time++;
    $("#time").text(time);
  }, 1000);
};

// display more crimes on map the longer the time goes on

// when resource is placed, work out radius and solvable crimes generating in that radius

// when crime is solved, increase money and score and remove crime from map

// create map
