//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const restartContainer = document.getElementById("restart-container");
const restartButton = document.getElementById("restart-game-button");

//Options values for buttons
let options = {
  nature: [
    "mountain",
    "forest",
    "lake",
    "river",
    "ocean",
    "tree",
    "flower",
    "sun",
    "moon",
    "star",
    "cloud",
    "rain",
    "snow",
    "beach",
    "island",
    "park",
    "bird",
    "butterfly",
    "wildlife",
    "landscape"
  ],
  space: [
    "planet",
    "galaxy",
    "star",
    "comet",
    "asteroid",
    "spaceship",
    "astronaut",
    "orbit",
    "moon",
    "satellite",
    "telescope",
    "cosmic",
    "nebula",
    "black hole",
    "meteor",
    "universe",
    "celestial",
    "constellation",
    "interstellar",
    "stellar"
],
  history: [
    "ancient",
    "civilization",
    "war",
    "revolution",
    "monarchy",
    "empire",
    "discovery",
    "renaissance",
    "industrial",
    "culture",
    "archaeology",
    "dynasty",
    "colonization",
    "liberty",
    "president",
    "independence",
    "constitution",
    "battle",
    "conquest",
    "reform",
  ]

};

let gameData= {
    winCount: 0,
    count: 0,
    chosenWord: ""
}
const saveGameData = () => {
    localStorage.setItem("gameData", JSON.stringify(gameData));
};

const loadGameData = () => {
    let storedGameData = localStorage.getItem("gameData");
        if (storedGameData) {
            gameData = JSON.parse(storedGameData);
        }
};

const setGameData = () => {
    winCount = gameData.winCount;
    count = gameData.count;
    chosenWord = gameData.chosenWord;
};

const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Pick Up A Topic</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });

  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  
  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_ </span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
    winCount = gameData.winCount;
    count = gameData.count;
    //Initially erase all content and hide letteres and new game button
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //character button click
        button.addEventListener("click", () => {
        let charArray = chosenWord.split("");
        let dashes = document.getElementsByClassName("dashes");
        //if array contains clciked value replace the matched dash with letter else dram on canvas
        if (charArray.includes(button.innerText)) {
            charArray.forEach((char, index) => {
            //if character in array is same as clicked button
            if (char === button.innerText) {
                //replace dash with letter
                dashes[index].innerText = char;
                //increment counter
                winCount += 1;
                //if winCount equals word lenfth
                if (winCount == charArray.length) {
                resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                //block all buttons
                blocker();
                }
            }
        });
        } else {
            
            count += 1;
            drawMan(count);
            if (count == 6) {
            resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
            blocker();
            }
        }
        //disable clicked button
        button.disabled = true;
        });
        letterContainer.append(button);
    }

    displayOptions();
    
    let { initialDrawing } = canvasCreator();
    initialDrawing();
};

//Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 1;
    
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(140, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(140, 40, 140, 80);
    };

    const leftArm = () => {
        drawLine(140, 50, 120, 70);
    };

    const rightArm = () => {
        drawLine(140, 50, 160, 70);
    };

    const leftLeg = () => {
        drawLine(140, 80, 120, 110);
    };

    const rightLeg = () => {
        drawLine(140, 80, 160, 110);
    };

    const initialDrawing = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        drawLine(10, 10, 10, 145);
        drawLine(280, 10, 280, 145);
        drawLine(10, 10, 280, 10);
        drawLine(140, 10, 140, 20);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
        head();
        break;
        case 2:
        body();
        break;
        case 3:
        leftArm();
        break;
        case 4:
        rightArm();
        break;
        case 5:
        leftLeg();
        break;
        case 6:
        rightLeg();
        break;
        default:
        break;
    }
};

const restoreGui = () => {
    loadGameData();
    setGameData();
    let { initialDrawing } = drawMan(gameData.count);
    initialDrawing();

    // Block buttons that were chosen before
    let chosenLetters = gameData.chosenWord.split("");
    let buttons = document.querySelectorAll("button");
    button.innerText = String.fromCharCode(i);
    buttons.forEach(button => {
        if (chosenLetters.includes(button.innerText)) {
            button.disabled = true;
        }
    });

    // Restore letters that have already been guessed
    let guessedLetters = gameData.guessedLetters;
    let dashes = document.getElementsByClassName("dashes");
    for (let i = 0; i < guessedLetters.length; i++) {
        let index = chosenLetters.indexOf(guessedLetters[i]);
        if (index !== -1) {
            dashes[index].innerText = guessedLetters[i];
        }
    }
};

newGameButton.addEventListener("click", initializer);
restartButton.addEventListener("click", initializer);
window.onload = initializer;
