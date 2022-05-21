// game variables

const MAP_API_KEY = "AIzaSyAOCM-c2ZcfA_BS9BZSCd8a-fbiL9hz7a8";
let crimeData = [];
let stats = {
  score: 0,
  money: 0,
  time: 0,
};
let score = 0;
let crimeIndex = 0;
let totalCrimes = 0;
let solvedCrimes = 0;
let crimeInterval = 2000;

// timers
let markerTimer;
let gameTimer;
let resourceTimer;

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
    zoomControl: true,
    styles: [
      {
        featureType: "poi",
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
  markerTimer = setInterval(getMarkers, crimeInterval, map);
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

// reset game data

const resetInfo = () => {
  $("#money").text(0);
  $("#time").text(0);
  $("#score").text(0);
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

const resetResources = () => {
  const initialResources = {
    officer: 20,
    dog: 15,
    car: 10,
    helicopter: 2,
  };
  refreshCounters(initialResources);
  writeToLocalStorage("resources", initialResources);
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
    displayModal(modal, marker, clickedIndex, map);
  });

  $("#close-modal-btn").click(() => {
    modal.hide();
  });

  updateCrimeMeter();

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

const displayModal = (modal, marker, clickedIndex, map) => {
  const typeOfCrime = crimeData[clickedIndex].type;
  const variableIndex = crimeVariables.findIndex(
    ({ type }) => type === typeOfCrime
  );
  const solveTimes = crimeVariables[variableIndex];
  $("#modal-crime").text(typeOfCrime);
  $("#modal-reward").text(`£${solveTimes.reward}`);
  $("#choice-footer").empty();
  $("#insufficient-resources-error").remove();
  addModalButtons(solveTimes);
  modal.show();
  resourceListener(modal, marker, typeOfCrime, solveTimes, map);
};

// see which resource was selected and remove marker once crime is solved

const resourceListener = (modal, marker, typeOfCrime, solveTimes, map) => {
  $("#choice-officer").click(() => {
    resourceSelected(
      "officer",
      solveTimes.officerSolveTime,
      solveTimes.reward,
      marker
    );
  });
  $("#choice-dog").click(() => {
    resourceSelected("dog", solveTimes.dogSolveTime, solveTimes.reward, marker);
  });
  $("#choice-car").click(() => {
    resourceSelected("car", solveTimes.carSolveTime, solveTimes.reward, marker);
  });
  $("#choice-helicopter").click(() => {
    resourceSelected(
      "helicopter",
      solveTimes.helicopterSolveTime,
      solveTimes.reward,
      marker
    );
  });
  $("#choice-cancel").click(() => {
    closeModal();
  });
};

const resourceSelected = (type, timeRemaining, reward, marker, map) => {
  if (removeResource(type)) {
    // createSolvingMarker(marker, map);
    resourceTimer = setTimeout(
      crimeSolved,
      timeRemaining,
      reward,
      marker,
      type
    );
    marker.setVisible(false);

    closeModal();

    // const newMarker = new google.maps.Marker({
    //   position: marker.position,
    //   map: map,
    //   id: marker.id,
    //   // label: "5",
    // });
  }

  // setInterval(crimeClock, 1000, timeRemaining, marker);
};

const removeResource = (type) => {
  const remainingResources = readFromLocalStorage("resources", {});
  if (isSufficientResources(remainingResources[type])) {
    remainingResources[type]--;
    refreshCounters(remainingResources);
    writeToLocalStorage("resources", remainingResources);
    return true;
  } else {
    insufficientResources();
    return false;
  }
};

const addResource = (type) => {
  const remainingResources = readFromLocalStorage("resources", {});
  remainingResources[type]++;
  remainingResources["crimesSolved"]++;
  refreshCounters(remainingResources);
  writeToLocalStorage("resources", remainingResources);
};

const isSufficientResources = (amount) => {
  return amount-- > 0 ? true : false;
};

const insufficientResources = () => {
  $("#insufficient-resources-error").remove();
  $("#modal-body").append(
    `<p id="insufficient-resources-error" class="error">
      Error: Insufficient Resources
    </p>`
  );
};

const createSolvingMarker = (marker, map) => {
  new google.maps.Marker({
    position: marker.position,
    map: map,
    id: marker.id,
    label: "5",
  });
};

// when crime is completed

const crimeSolved = (reward, marker, type) => {
  // marker.setMap(null);
  stats.money += reward;
  solvedCrimes++;
  updateInfo();
  addResource(type);
  clearTimeout(resourceTimer);
};

const updateCrimeMeter = () => {
  totalCrimes++;
  const crimeValue = totalCrimes - solvedCrimes;
  $("#crime-level").val(crimeValue);
  if (crimeValue >= 25) {
    gameOver();
  }
  return totalCrimes;
};

const updateInfo = () => {
  $("#money").text(stats.money);
  $("#crimes-solved").text(solvedCrimes);
};

const gameOver = () => {
  // stop all timers
  clearInterval(markerTimer);
  clearInterval(gameTimer);
  const getUserName = readFromLocalStorage("username", "");
  const pastUserHistory = readFromLocalStorage("pastUserHistory", []);
  // get time value & money & set to local storage
  const gameStats = {
    money: stats.money,
    time: stats.time,
    crimesSolved: solvedCrimes,
    userName: getUserName,
  };
  pastUserHistory.push(gameStats);
  writeToLocalStorage("gameStats", gameStats);
  writeToLocalStorage("pastUserHistory", pastUserHistory);

  // display something to tell user the game has stopped and give option to move to highscores page
  $("#final-money").append(
    `<i class="fa-solid fa-sack-dollar"> £${gameStats.money}</i>`
  );
  $("#final-time").append(
    `<i class="fa-solid fa-clock"> ${gameStats.time}</i>`
  );
  $("#final-crimes-solved").append(
    `<i class="fa-solid fa-handcuffs"> ${gameStats.crimesSolved}</i>`
  );
  $("#scores-page").click(function () {
    window.location.href = "../../scores.html";
  });
  $("#modal-game-over").show();

  console.log("Game Over");
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
  gameTimer = setInterval(() => {
    stats.time++;
    $("#time").text(stats.time);
  }, 1000);
};

const onReady = () => {
  gameInProgress = true;
  handleNavBarToggle();
  resetInfo();
  resetResources();
};

window.initMap = initMap;
$(document).ready(onReady);
