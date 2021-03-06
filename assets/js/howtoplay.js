// render all speech texts
// object array

let speechIndex = 0;

const speech = [
  {
    text: "Hello, I am constable Sam. I am here to eradicate the crime in Birmingham. Unfortunately, I cannot do this alone.",
    value: 1,
  },
  {
    text: "Here is where you come in. Please help my team and me to solve the crimes by distributing our resources. We never have enough time- so please try to solve as many crimes as possible to make as much money as possible to buy even more resources.",
    value: 2,
  },
  {
    text: "Make good decisions to earn more money. Good Luck, I know you will make us proud.",
    value: 3,
  },
];
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

const typeWriterEffect = () => {};

const renderSpeechAlerts = () => {
  console.log("hello");
  const speechText = $("#speech-text");
  const speechToDisplay = speech[speechIndex].text;
  speechText.text(speechToDisplay);
};
const renderGame = () => {
  const button = `<a href= "./user-input.html" class="button game-start-btn" id="submit">
            <i class="fa-solid fa-circle-play"> Begin </i>
          </a>`;
  $(".container-nav").append(button);
};
const showNext = () => {
  console.log(speechIndex);
  speechIndex = speechIndex === 2 ? 0 : speechIndex + 1;
  if (speechIndex === 2) {
    renderGame();
    next.remove();
    previous.remove();
  }

  renderSpeechAlerts();
};

const showPrevious = () => {
  speechIndex = speechIndex === 0 ? 2 : speechIndex - 1;
  renderSpeechAlerts();
};

const checkboxChecked = () => {
  if ($("input:checked")) {
    return writeToLocalStorage("keys", "checked");
  } else {
    return writeToLocalStorage("", "");
  }
};
const whenDeleted = () => {
  console.log("working");
  window.location.href = "./user-input.html";
};
const next = $("#next").click(showNext);
const previous = $("#previous").click(showPrevious);
$(".delete").click(whenDeleted);
$("input").click(checkboxChecked);

const startHowToPlay = () => {
  handleNavBarToggle();
  renderSpeechAlerts();
};

$(document).ready(() => {
  startHowToPlay();
});
