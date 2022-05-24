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

const gameStat = readFromLocalStorage("pastUserHistory");
if (gameStat) {
  gameStat.sort((a, b) => {
    return b.money - a.money;
  });
}

// convert time format
const displayTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  let newSeconds;
  if (seconds < 10) {
    newSeconds = `0${seconds}`;
  } else {
    newSeconds = seconds;
  }
  return `0${minutes} : ${newSeconds}`;
};

// for each function to render ranking table
const renderRankingSection = () => {
  // const data = readFromLocalStorage("pastUserHistory");
  console.log("the data is:" + JSON.stringify(gameStat[3]));

  const renderRankingBoard = (element, index) => {
    const tableInfo = `<tr class="tableRow">
    <th class="tableText">${index + 1}</th>
    <td>
      <i class="fa-solid fa-user"></i>
      <p class="userNameOnTable">${element.userName}</p>
    </td>
    <td class="tableText">${displayTime(element.time)}</td>
    <td class="tableText">${element.crimesSolved}</td>
    <td class="tableText">${element.money}</td>
    `;
    $("#thead").append(tableInfo);
  };
  for (let i = 0; i < gameStat.length - 3; i++) {
    // 4 times
    // we have 7 items
    // we want to skip the first 3
    // and pass the 4th,5,6,7
    let temp = gameStat.length - 3 - i; // 7-3-2 = 2
    let temp2 = gameStat.length - temp; // 7-2 = 5
    renderRankingBoard(gameStat[temp2], temp2);
  }
  // data.forEach(renderRankingBoard);
};

const renderWinnerBoard = () => {
  if (!gameStat) {
    const renderNoScore = `      <section class="tableContainer">
  <table class="table is-fullwidth">
    <tbody>
      <thead>
        <tr class="tableTitle">
          <th>Rank</th>
          <th>User Name</th>
          <th>Time Used</th>
          <th>Crime Solved</th>
          <th>Money</th>
          <th>Total Score</th>
        </tr>
      </thead>
    </tbody>
  </table>
</section>
<article class="message is-warning">
  <div class="message-body">
    Oops, you do not have any score yet...
    <br><a href="./index.html">Click here to start playing the game</a>
  </div>
</article>`;
    $("#main").append(renderNoScore);
  } else if (gameStat.length === 1) {
    // render top three winnerboard and scores table
    const topOneWinner = `      <section class="winnerCardContainer">
  <div class="goldCardContainer">
    <p><strong class="text" id="firstWinnerName">${
      gameStat[0].userName
    }</strong></p>
    <div class="goldCardItem">
      <img class="image" src="./assets/images/goldMadel.png" />
      <p class="text">
        1 / ${gameStat.length}
      </p>
      <p class="subText">
      <Strong class="money">Money : ${gameStat[0].money}</Strong><br />
        Time: ${displayTime(gameStat[0].time)} <br />
        Crime Solved: ${gameStat[0].crimesSolved} 
      </p>
    </div>
  </div>
</section>`;
    const winnerTable = `      <section class="tableContainer">
<table class="table is-fullwidth">
  <tbody>
    <thead>
      <tr class="tableTitle">
        <th>Rank</th>
        <th>User Name</th>
        <th>Time Used</th>
        <th>Crime Solved</th>
        <th>Money</th>
        <th>Total Score</th>
      </tr>
    </thead>
  </tbody>
</table>
</section>`;
    $("#main").append(topOneWinner, winnerTable);
  } else if (gameStat.length === 2) {
    const topTwoWinner = `      <section class="winnerCardContainer">
  <div class="silverCardContainer">
    <p><strong class="text" id="secondWinnerName">${
      gameStat[1].userName
    }</strong></p>
    <div class="silverCardItem">
      <img class="image" src="./assets/images/silverMadel.png" />
      <p class="text">
        2  / ${gameStat.length}
      </p>
      <p class="subText">
        <Strong class="money">Money : ${gameStat[1].money}</Strong><br />
        Time: ${displayTime(gameStat[1].time)}<br />
        Crime Solved: ${gameStat[1].crimesSolved}
      </p>
    </div>
  </div>

  <div class="goldCardContainer">
    <p><strong class="text" id="firstWinnerName">${
      gameStat[0].userName
    }</strong></p>
    <div class="goldCardItem">
      <img class="image" src="./assets/images/goldMadel.png" />
      <p class="text">
        1/ ${gameStat.length}
      </p>
      <p class="subText">
      <Strong class="money">Money : ${gameStat[0].money}</Strong><br />
        Time: ${displayTime(gameStat[0].time)} <br />
        Crime Solved: ${gameStat[0].crimesSolved} 
      </p>
    </div>
  </div>
</section>`;
    const winnerTable = `      <section class="tableContainer">
<table class="table is-fullwidth">
  <tbody>
    <thead>
      <tr class="tableTitle">
        <th>Rank</th>
        <th>User Name</th>
        <th>Time Used</th>
        <th>Crime Solved</th>
        <th>Money</th>
        <th>Total Score</th>
      </tr>
    </thead>
  </tbody>
</table>
</section>`;
    $("#main").append(topTwoWinner, winnerTable);
  } else if (gameStat.length === 3) {
    const topThreeWinner = `      <section class="winnerCardContainer">
  <div class="silverCardContainer">
    <p><strong class="text" id="secondWinnerName">${
      gameStat[1].userName
    }</strong></p>
    <div class="silverCardItem">
      <img class="image" src="./assets/images/silverMadel.png" />
      <p class="text">
        2  / ${gameStat.length}
      </p>
      <p class="subText">
        <Strong class="money">Money : ${gameStat[1].money}</Strong><br />
        Time: ${displayTime(gameStat[1].time)}<br />
        Crime Solved: ${gameStat[1].crimesSolved}
      </p>
    </div>
  </div>

  <div class="goldCardContainer">
    <p><strong class="text" id="firstWinnerName">${
      gameStat[0].userName
    }</strong></p>
    <div class="goldCardItem">
      <img class="image" src="./assets/images/goldMadel.png" />
      <p class="text">
        1 / ${gameStat.length}
      </p>
      <p class="subText">
        <Strong class="money">Money : ${gameStat[0].money}</Strong><br />
        Time: ${displayTime(gameStat[0].time)} <br />
        Crime Solved: ${gameStat[0].crimesSolved} 
      </p>
    </div>
  </div>
  <div class="bronzeCardContainer">
  <p><strong class="text" id="thirdWinnerName">${
    gameStat[2].userName
  }</strong></p>
  <div class="bronzeCardItem">
    <img class="image" src="./assets/images/bronzeMadel.png" />
    <p class="text">
      3 / ${gameStat.length}
    </p>
    <p class="subText">
      <Strong class="money">Money : ${gameStat[2].money}</Strong><br />
      Time: ${displayTime(gameStat[2].time)}  <br />
      Crime Solved: ${gameStat[2].crimesSolved}  
    </p>
  </div>
</div>
</section>`;
    const winnerTable = `      <section class="tableContainer">
<table class="table is-fullwidth">
  <tbody>
    <thead>
      <tr class="tableTitle">
        <th>Rank</th>
        <th>User Name</th>
        <th>Time Used</th>
        <th>Crime Solved</th>
        <th>Money</th>
        <th>Total Score</th>
      </tr>
    </thead>
  </tbody>
</table>
</section>`;
    $("#main").append(topThreeWinner, winnerTable);
  } else if (gameStat.length > 3) {
    const topThreeWinner = `      <section class="winnerCardContainer">
  <div class="silverCardContainer">
    <p><strong class="text" id="secondWinnerName">${
      gameStat[1].userName
    }</strong></p>
    <div class="silverCardItem">
      <img class="image" src="./assets/images/silverMadel.png" />
      <p class="text">
        2  / ${gameStat.length}
      </p>
      <p class="subText">
        <Strong class="money">Money : ${gameStat[1].money}</Strong><br />
        Time: ${displayTime(gameStat[1].time)}<br />
        Crime Solved: ${gameStat[1].crimesSolved}
      </p>
    </div>
  </div>

  <div class="goldCardContainer">
    <p><strong class="text" id="firstWinnerName">${
      gameStat[0].userName
    }</strong></p>
    <div class="goldCardItem">
      <img class="image" src="./assets/images/goldMadel.png" />
      <p class="text">
        1 / ${gameStat.length}
      </p>
      <p class="subText">
        <Strong class="money">Money : ${gameStat[0].money}</Strong><br />
        Time: ${displayTime(gameStat[0].time)} <br />
        Crime Solved: ${gameStat[0].crimesSolved}
      </p>
    </div>
  </div>
  <div class="bronzeCardContainer">
  <p><strong class="text" id="thirdWinnerName">${
    gameStat[2].userName
  }</strong></p>
  <div class="bronzeCardItem">
    <img class="image" src="./assets/images/bronzeMadel.png" />
    <p class="text">
      3 / ${gameStat.length}
    </p>
    <p class="subText">
      <Strong class="money">Money : ${gameStat[2].money}</Strong><br />
      Time: ${displayTime(gameStat[2].time)}  <br />
      Crime Solved: ${gameStat[2].crimesSolved} 
    </p>
  </div>
</div>
</section>`;
    const winnerTable = `      <section class="tableContainer">
<table class="table is-fullwidth">
  <tbody>
    <thead id="thead">
      <tr class="tableTitle">
        <th>Rank</th>
        <th>User Name</th>
        <th>Time Used</th>
        <th>Crime Solved</th>
        <th>Money</th>
      </tr>
    </thead>
  </tbody>
</table>
</section>`;
    $("#main").append(topThreeWinner, winnerTable);
    renderRankingSection();
  }
};

const onLoad = () => {
  handleNavBarToggle();
  renderWinnerBoard();
};

$(document).ready(() => {
  onLoad();
});
