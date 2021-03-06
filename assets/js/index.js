console.log("hello from index");
const title = "Police Crime Fighter";

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

const clickToStart1 = `<a
                  href="./how-to-play.html"
                  id="button"
                  class="button is-medium is-responsive is-link"
                >
                  Click to start
                </a>`;

const clickToStart2 = ` <a
                  href="./user-input.html"
                  id="button"
                  class="button is-medium is-responsive is-link "
                >
                  Click to start
                </a>`;

if (readFromLocalStorage("keys")) {
  $(".button-div").append(clickToStart2);
} else {
  $(".button-div").append(clickToStart1);
}

$(document).ready(() => {
  handleNavBarToggle();
});
