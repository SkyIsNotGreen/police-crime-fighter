console.log("hello from score");

// create an array that stores all past data

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
const scoresOnLoad = () => {
  // get game stats from LS
  writeToLocalStorage("pastUserHistory", {});
  const gameStat = readFromLocalStorage("gameStats");
  if (!gameStat) {
    // render messages target
  } else {
    const userLog = [
      { gameStat },
      //  add score here
    ];
    return writeToLocalStorage("pastUserHistory", userLog);
  }

  console.log(gameStat);
  // store value in an array

  // delete from LS resources and games stats
  //
};

$(document).ready(() => {
  handleNavBarToggle();
  scoresOnLoad();
});
