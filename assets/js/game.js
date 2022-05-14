// game variables

const MAP_API_KEY = "AIzaSyAOCM-c2ZcfA_BS9BZSCd8a-fbiL9hz7a8";
let crimeData = [];
let score = 0;
let money = 0;
let time = 0;
let crimeIndex = 0;
let crimeInterval = 2000;

// get and display map from Google API

const initMap = async () => {
  // https://developers.google.com/maps/documentation/javascript/interaction
  const birminghamLocation = { lat: 52.474282, lng: -1.898623 };

  const mapElement = document.getElementById("map");

  const mapOptions = {
    zoom: 15,
    center: birminghamLocation,
    mapTypeId: "terrain",
    disableDefaultUI: true,
    zoomControl: false,
    gestureHandling: "none",
    styles: [
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

  const map = new google.maps.Map(mapElement, mapOptions);

  await renderPoliceData(map);

  startTimer();

  // getInitialMarkers(map);
};

// Get & sort police data into objects in an array extracting relevant information

const renderPoliceData = async (map) => {
  // get the police data
  const data = await callPoliceApi();

  // create markers
  crimeData = data.map((each) => {
    const latitude = each.location.latitude;
    const longitude = each.location.longitude;
    const category = each.category;
    const id = each.id;

    const position = new google.maps.LatLng(latitude, longitude);

    return {
      position: position,
      type: category,
      latitude: latitude,
      longitude: longitude,
      id: id,
    };
  });

  // show crime markers at certain intervals
  setInterval(getMarkers, crimeInterval, map);
};

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

const resetInfo = () => {
  $("#money").text(0);
  $("#time").text(0);
  $("#score").text(0);
};

// display x amount of crimes on map to begin

const getMarkers = (map) => {
  const marker = new google.maps.Marker({
    position: crimeData[crimeIndex].position,
    map: map,
    id: crimeData[crimeIndex].id,
  });

  generateInfoWindow(marker);
  modalOnMarker(marker);

  crimeIndex++;
};

const generateInfoWindow = (marker) => {
  const infowindow = new google.maps.InfoWindow({
    content:
      "Crime: " +
      crimeData[crimeIndex].type +
      "<br>" +
      "<p>Time Remaining: 4 seconds</p>",
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
};

const modalOnMarker = (marker) => {
  const modal = $("#myModal");
  marker.addListener("click", () => {
    displayModal(modal);
    const clickedElement = crimeData.find(({ id }) => id === marker.id);
    console.log(clickedElement);
  });

  $("#close-modal-btn").click(() => {
    modal.hide();
  });
};

const displayModal = (modal) => {
  $("#modal-crime").text(crimeData[crimeIndex].type);
  $("#modal-reward").text("£200");

  modal.show();
};

// load resources and reset time, money & score

// start and update timer

const startTimer = () => {
  window.setInterval(() => {
    time++;
    $("#time").text(time);
  }, 1000);
};

const onReady = () => {
  handleNavBarToggle();
  resetInfo();
};

window.initMap = initMap;
$(document).ready(onReady);
// modalOnMarker();

// display more crimes on map the longer the time goes on

// when resource is placed, work out radius and solvable crimes generating in that radius

// when crime is solved, increase money and score and remove crime from map

// create map
