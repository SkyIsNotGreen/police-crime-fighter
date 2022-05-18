// game variables

// add the start game form
// on submit create game object and store in LS and then render map as current implementation

// on click on modal read from LS and add buttons with remaining resources (10 offices | 3 helicopters, etc)

// on click of a resource button (officer) start a timer and add a callback function

// in callback function console log after x seconds

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

  randomiseArray();

  // show crime markers at certain intervals
  setInterval(getMarkers, crimeInterval, map);
};

const randomiseArray = () => {
  for (i = crimeData.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = crimeData[i];
    crimeData[i] = crimeData[j];
    crimeData[j] = x;
  }
  return crimeData;
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

const getRemainingResources = () => {
  console.log("Getting resources");
  const remainingResources = readFromLocalStorage("resources", {});
  console.log(remainingResources);
};

const generateInfoWindow = (marker) => {
  const infoWindow = new google.maps.InfoWindow({
    content: "Crime: " + crimeData[crimeIndex].type,
    // "<br>" +
    // "<p>Time Remaining: 4 seconds</p>",
  });

  marker.addListener("mouseover", () => {
    infoWindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });

  marker.addListener("mouseout", () => {
    infoWindow.close();
  });
};

// begin displaying crimes

const getMarkers = (map) => {
  const marker = new google.maps.Marker({
    position: crimeData[crimeIndex].position,
    map: map,
    id: crimeData[crimeIndex].id,
    // label: "5",
  });

  generateInfoWindow(marker);

  const modal = $("#crimeModal");

  marker.addListener("click", () => {
    const clickedIndex = crimeData.findIndex(({ id }) => id === marker.id);
    displayModal(modal, marker, clickedIndex);
  });

  $("#close-modal-btn").click(() => {
    modal.hide();
  });

  if (crimeIndex <= crimeData.length) {
    crimeIndex++;
  } else {
    crimeIndex = 0;
  }
};

// create, display and remove modal

const closeModal = () => {
  const modal = $("#crimeModal");
  // marker.removeListener("click");
  $("#choice-footer").empty();
  modal.hide();
};

const addModalButtons = (solveTimes) => {
  $("#choice-footer")
    .append(`<button id="choice-officer" class="button is-success choice-btn">Officer<br>(${
    solveTimes.officerSolveTime / 1000
  } secs)</button>
  <button id="choice-dog" class="button is-success choice-btn">Dog<br>(${
    solveTimes.dogSolveTime / 1000
  } secs)</button>
  <button id="choice-car" class="button is-success choice-btn">Car<br>(${
    solveTimes.carSolveTime / 1000
  } secs)</button>
  <button id="choice-helicopter" class="button is-success choice-btn">Helicopter<br>(${
    solveTimes.helicopterSolveTime / 1000
  } secs)</button>
  <button id="choice-cancel" class="button">Cancel</button>`);
};

const displayModal = (modal, marker, clickedIndex) => {
  const typeOfCrime = crimeData[clickedIndex].type;
  const variableIndex = crimeVariables.findIndex(
    ({ type }) => type === typeOfCrime
  );
  const solveTimes = crimeVariables[variableIndex];
  $("#modal-crime").text(typeOfCrime);
  $("#modal-reward").text(`£${solveTimes.reward}`);
  $("#choice-footer").empty();
  addModalButtons(solveTimes);
  modal.show();
  resourceListener(modal, marker, typeOfCrime, solveTimes);
};

// see which resource was selected and remove marker once crime is solved

const resourceListener = (modal, marker, typeOfCrime, solveTimes) => {
  $("#choice-officer").click(() => {
    resourceSelected(
      "officer",
      solveTimes.officerSolveTime,
      solveTimes.reward,
      marker
    );
    closeModal();
  });
  $("#choice-dog").click(() => {
    resourceSelected("dog", solveTimes.dogSolveTime, solveTimes.reward, marker);
    closeModal();
  });
  $("#choice-car").click(() => {
    resourceSelected("car", solveTimes.carSolveTime, solveTimes.reward, marker);
    closeModal();
  });
  $("#choice-helicopter").click(() => {
    resourceSelected(
      "helicopter",
      solveTimes.helicopterSolveTime,
      solveTimes.reward,
      marker
    );
    closeModal();
  });
  $("#choice-cancel").click(() => {
    closeModal();
  });
};

const resourceSelected = (type, timeRemaining, reward, marker) => {
  removeResource(type);
  setTimeout(crimeSolved, timeRemaining, reward, marker, type);
  // setInterval(crimeClock, 1000, timeRemaining, marker);
};

const removeResource = (type) => {
  const remainingResources = readFromLocalStorage("resources", {});
  remainingResources[type]--;
  refreshCounters(remainingResources);
  writeToLocalStorage("resources", remainingResources);
};

const addResource = (type) => {
  const remainingResources = readFromLocalStorage("resources", {});
  remainingResources[type]++;
  refreshCounters(remainingResources);
  writeToLocalStorage("resources", remainingResources);
};

const crimeSolved = (reward, marker, type) => {
  marker.setMap(null);
  money += reward;
  updateInfo();
  addResource(type);
};

const crimeClock = (timeRemaining, marker) => {
  // display countdown until crime is solved
  console.log(marker.label);
};

const updateInfo = () => {
  $("#money").text(money);
  $("#score").text(score);
};

const resetResources = () => {
  const initialResources = {
    officer: 20,
    dog: 15,
    car: 10,
    helicopter: 5,
  };
  refreshCounters(initialResources);
  writeToLocalStorage("resources", initialResources);
};

// local storage

const readFromLocalStorage = (key, defaultValue) => {
  // get from LS using key name
  const dataFromLS = localStorage.getItem(key);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

const refreshCounters = (resources) => {
  $("#officer-counter").text(resources.officer);
  $("#dog-counter").text(resources.dog);
  $("#car-counter").text(resources.car);
  $("#helicopter-counter").text(resources.helicopter);
};

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
  resetResources();
};

window.initMap = initMap;
$(document).ready(onReady);

// display more crimes on map the longer the time goes on

// when resource is placed, work out radius and solvable crimes generating in that radius

// when crime is solved, increase money and score and remove crime from map

// create map
