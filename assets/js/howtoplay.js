// render all speech texts
// object array

let speechIndex = 0;

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
    text: "Make good decisions to earn more money and thereby. Good Luck, I know you will make us proud.",
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

//   const speechDiv = ` <div class="notification speech-bubble-1">
//             <button class="delete"></button>
//             <p>${speech.text}</p>
//             </div>`;
//   const showNext = () => {
//     $(".column speech-bubble-container").append(speechDiv);
//   };
// $(document).ready(function () {
//   $(".notification speech-bubble-1").each(function (e) {
//     if (e != 0) $(this).hide();
//   });
//   const showNext = () => {
//     if ($(".notification speech-bubble-1:visible").next().length != 0)
//       $(".notification speech-bubble-1:visible").next().show().prev().hide();
//     else {
//       $(".notification speech-bubble-1:visible").hide();
//       $(".notification speech-bubble-1:first").show();
//     }
//     return false;
//   };

//   const showPrevious = () => {
//     if ($(".notification speech-bubble-1:visible").prev().length != 0)
//       $(".notification speech-bubble-1:visible").prev().show().next().hide();
//     else {
//       $(".notification speech-bubble-1:visible").hide();
//       $(".notification speech-bubble-1:last").show();
//     }
//     return false;
//   };

//   );

//   //   const showNext = () => {
//   //     let nextDiv = $(this)
//   //       .parent()
//   //       .find(".notification speech-bubble-1:visible");
//   //       console.log(find(".notification speech-bubble-1:visible"))
//   //     if (nextDiv.length === 0) {
//   //       nextDiv = $(this).parent().find(".notification speech-bubble-1:first");
//   //     }
//   //     $(this).parent().find("notification speech-bubble-1").hide();
//   //     nextDiv.show();
//   //   };

//   //   const showPrevious = () => {
//   //     let prevDiv = $(this)
//   //       .parent()
//   //       .find(".notification speech-bubble-1:visible")
//   //       .prev(".notification speech-bubble-1");
//   //     if (prevDiv.length === 0) {
//   //       // wrap around to end
//   //       prevDiv = $(this).parent().find(".notification speech-bubble-1:last");
//   //     }
//   //     $(this).parent().find(".notification speech-bubble-1").hide();
//   //     prevDiv.show();
//   //     console.log("previous");

//   //   if(){

//   //   } else () {

//   //   }
// });

const renderSpeechAlerts = () => {
  console.log("hello");
  const speechText = $("#speech-text");
  const speechToDisplay = speech[speechIndex].text;
  speechText.text(speechToDisplay);
  // $(".notification").hide();x
  // $(".notification:eq(" + visibleDiv + ")").show();
};
const showNext = () => {
  console.log(speechIndex);
  speechIndex = speechIndex === 2 ? 0 : speechIndex + 1;

  renderSpeechAlerts();
};

const showPrevious = () => {
  speechIndex = speechIndex === 0 ? 2 : speechIndex - 1;
  renderSpeechAlerts();
};

$("#next").click(showNext);
$("#previous").click(showPrevious);

const startHowToPlay = () => {
  handleNavBarToggle();
  renderSpeechAlerts();
};
$(document).ready(() => {
  startHowToPlay();
});
