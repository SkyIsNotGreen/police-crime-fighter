// render all speech texts
// object array
const speech = [
  {
    text: "Hello, I am constable Sam. I am here to eradicate the crime in Birmingham. Unfortunately, I cannot do this alone.",
    value: 1,
  },
  {
    text: "Here is where you come in. Please help my team and me solve the crime by distributing the resources. Watch out if you go too slow; your progress will be less than 50%, and the game will be over",
    value: 2,
  },
  {
    text: "Here is where you come in. Please help my team and me solve the crime by distributing the resources. Watch out if you go too slow; your progress will be less than 50%, and the game will be over.",
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
const renderSpeechAlerts = () => {};
const startHowToPlay = () => {};
$(document).ready(startHowToPlay);
