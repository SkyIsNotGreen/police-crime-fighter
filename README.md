# Police: Crime-Fighter

## About this Project

```
This project is a fun, boredom-killing time-passer clicker game, which can save your high-score locally so you can compare how far you got with your friends.
```

## Links to the Project

- Click the link [here](https://github.com/SkyIsNotGreen/police-crime-fighter) to access our github repository.
- Click the link [here](https://skyisnotgreen.github.io/police-crime-fighter/) to access our deployed URL.

<br>

## User Story

```
As a user, I want to be able to be able to interact with real crime statistics in a quick and engaging way.

Before playing the game, I want to know how to interact with this app.

I want to be able to save my scores and compare my results with others on the same machine.

I want to see who created this game, and have access to more of their work!

I want to have the website to be responsive so I can still interact with all the features on a mobile viewport.

```

## Flowchart and Game Logic

<br>

### Logic diagrams

<br>

Here is our flow chart detailing the user journey
![game-logic](./assets/images/game-logic.png)

<br>

<details>
<summary>At function level - logic of the page </summary>

1. When a user clicks `Click to Start` on the _index.html_, LS is initiated. If there is a value of keys then on how to play tutorial is generated. If no, then the _user-input.html_ is generated.
2. On the how-to-play tutorial the donot show input stores value in LS.
3. On user-input pg username is stored in LS and game page is rendered and a key of resources object stored in LS.
4. In game when `marker is clicked ` an info banner appears.
5. When a `resource is clicked` the value in LS and the resource container is updated.
6. After the timer reaches the specified value LS/ resource container and money are updated.
7. When 25 markers are displayed(progress bar is 100%) game over modal is rendered.
8. The game over stops any more markers from being populated.
9. The values including username is stored in a key known as gameStats in LS.
10. The gameStats are stored in a key known as previousUserHistory that contains gameStats of previous games.
11. `On click of view scores` the _scores.html_ is initiated. (The scores page is also initated when quit is clicked on games-page)
12. `On load` the scores are read from local storage and sorted based on the money. The top 3 games will load on podium while the rest would load on separate leaderboard.
13. Using the responsive navbar the user can click on different navlinks with smaller viewports using a burger. This is important to access page like contacts.html.

</details>

<br>

## Mock-Up

The following screenshots within the toggles show the web application's appearance and functionality:

<details>

<summary>Desktop ViewPort | Home  </summary>

_*Index.html*_![index.html](./assets/images/HomePage.png)

</details>

<details>

<summary>Desktop ViewPort |  How-to-Play Tutorial  </summary>

_*how-to-play.html*_![how-to-play.html](./assets/images/how-to-play-page.png)

</details>

<details>

<summary>Desktop ViewPort | User Input  </summary>

_*user-input.html*_![user-input.html](./assets/images/user-input-page.png)

</details>

<details>

<summary>Desktop ViewPort | Game  </summary>

_*game.html*_![game.html](./assets/images/game-map.jpg)

</details>

<details>

<summary>Desktop ViewPort |  Scores </summary>

_*scores.html*_![scores.html](./assets/images/scores-page.png)

</details>

<details>

<summary>Desktop ViewPort |  Contacts </summary>

_*contacts.html*_![contacts.html](./assets/images/contacts.png)

</details>

<br>

<details>

<summary>Mobile ViewPort | Home  </summary>

_*Index.html*_![index.html](./assets/images/HomePage.png)

</details>

<details>

<summary>Mobile ViewPort |  How-to-Play Tutorial  </summary>

_*how-to-play.html*_![how-to-play.html](./assets/images/how-to-play-page.png)

</details>

<details>

<summary>Mobile ViewPort | User Input  </summary>

_*user-input.html*_![user-input.html](./assets/images/user-input-page.png)

</details>

<details>

<summary>Mobile ViewPort | Game  </summary>

_*game.html*_![game.html](./assets/images/game-map.jpg)

</details>

<details>

<summary>Mobile ViewPort |  Scores </summary>

_*scores.html*_![scores.html](./assets/images/scores-page.png)

</details>

<details>

<summary>Mobile ViewPort |  Contacts </summary>

_*contacts.html*_![contacts.html](./assets/images/contacts.png)

</details>
<br>
<br>

## Technologies Used

- Git
  <br>
- Languages:<br>
  1. HTML <br>
  2. CSS <br>
  3. JavaScript<br>
  4. JQuery<br>
     <br>
- APIs: <br>
  1. Police API<br>
  2. Google Maps API<br>
     <br>
- Frameworks:<br>
  1. Font awesome<br>
  2. Bulma (CSS framework)<br>
  3. Google Fonts<br>

<br>

## Future developments

There were many things we wanted to add but simply didn’t have the time to implement.

- Improve gameplay by adding an area radius to the units so they solve crimes in an area
- Add upgrades for units so you have ways of spending collected cash
- Add a functioning global highscores
- Add other map areas, so you can use your local area when you are playing the game
- Create a share button where you can share your scores on different social media platforms.
- Add onClick function to cards so that they flip on click then hover
- Add a pause and play button to demonstration video so that users can gain more understanding.

<br>

## How To Contact Us

### Jinyi Yu

- Email: yujinyiicxk@gmail.com
- Github: https://github.com/jinyiyu
- LinkedIn: https://www.linkedin.com/in/jinyiyu/
  <br>

### Ricky Palmer

- Github: https://github.com/SkyIsNotGreen
  <br>

### Josh Holmes

- Github: https://github.com/glowingmanagement
  <br>

### Amirtha Muthirulandi

- Github: https://github.com/amirtha-coder
  <br>
