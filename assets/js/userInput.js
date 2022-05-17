// create a resources object
const resources = {
  officer: 20,
  dog: 15,
  car: 10,
  helicopter: 5,
};
const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};
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

const onSubmit = () => {
  const value = $("#input").val();
  writeToLocalStorage("username", value);
  if (readFromLocalStorage("username")) {
    $("#enter-username").remove();
    window.location.href = "./game.html";
  } else {
    $("#enter-username").text("please enter username to continue");
  }
};
// target button
$("#submit").click(onSubmit);
$(document).ready(() => {
  handleNavBarToggle();
});
