// Fisrt save all the required Querries in variables
const intro = document.querySelector("#intro");
const optO = document.querySelector("#o");
const optX = document.querySelector("#x");
const Conf = document.querySelector("#oxc");
let EndBtn = document.querySelector("#end");
let restartBtn = document.querySelector("#reset");
let continueBtn = document.querySelector("#conti");
let Result = document.querySelector(".Re");
let ScorePlyr1 = document.querySelector("#p1");
let ScorePlyr2 = document.querySelector("#p2");
let box = document.querySelectorAll(".box");
let turn = true;
let count = 0;
let gameEnded = false;

// Add some animations
$(document).ready(function () {
  $("#str").click(function () {
    $("#intro").text("LET THE GAME BEGIN....");
    $("#intro").slideUp(1500);
    $("#choice").slideDown(1500);
  });
  $("#can").click(function () {
    $("#intro").text("THANK YOU FOR VISITING THIS SITE ");
    $("#intro").append(" &#x263A; ");
  });
  $("#oxc").click(function () {
    if (optO.checked) {
      startGame("O");
    } else if (optX.checked) {
      startGame("X");
    } else {
      document.querySelector("#notc").textContent =
        "PLEASE CHOOSE AN OPTION TO START";
    }
  });
  $("#end").click(function () {
    $("#Game").css("color", "azure");
    endGame();
  });
});

//  Initialise Options to Start the game
Conf.onclick = function () {
  if (optO.checked || optX.checked) {
    startGame(optO.checked ? "O" : "X");
  } else {
    document.querySelector("#notc").textContent =
      "PLEASE CHOOSE AN OPTION TO START";
  }
};

// Store the required logics
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];
// Initialise or Start the game
function startGame(player1Symbol) {
  $("#Game").slideDown(1500);
  const player1Text =
    player1Symbol === "O" ? "*PLAYER-1 IS :- O" : "*PLAYER-1 IS :- X";
  const player1Color = player1Symbol === "O" ? "aqua" : "yellow";
  $("#notc")
    .text(player1Text)
    .css({ "font-size": "larger", color: player1Color });
  $("#choice").slideUp(1000);
}
// Check the winner using the Stored logic
function checkWin() {
  const options = Array.from(box).map((element) => element.innerText);

  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (
      options[a] !== "" &&
      options[a] === options[b] &&
      options[a] === options[c]
    ) {
      declareWinner(options[a], [a, b, c]);
      return;
    }
  }
  count++;
  if (count === 9) {
    declareWinner("draw");
  }
}
//Declare the winner and update the score
function declareWinner(winner, winningBoxes) {
  if (winner === "draw") {
    Result.textContent = "It's a Draw!";
  } else {
    Result.textContent = `Player ${winner} Wins!`;
    if (winner === "O") {
      ScorePlyr1.textContent = parseInt(ScorePlyr1.textContent) + 1;
    } else if (winner === "X") {
      ScorePlyr2.textContent = parseInt(ScorePlyr2.textContent) + 1;
    }

    winningBoxes.forEach((index) => {
      box[index].classList.add("win-animation");
    });
  }
  gameEnded = true;
  box.forEach((button) => (button.disabled = true));
}
// On Clicking the boxes Add the String- O / X
box.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameEnded && box.innerText === "") {
      box.innerText = turn
        ? optO.checked
          ? "O"
          : "X"
        : optO.checked
        ? "X"
        : "O";
      turn = !turn;
      box.disabled = true;
      checkWin();
    }
  });
});
// Funtion on clicking End Button
function endGame() {
  document.querySelector("#Game").textContent =
    "THANK YOU FOR TRYING THIS GAME \nBYE BYE";
  document.querySelector("#Game").style.color = "azure";
  document.querySelector("#notc").textContent = "";
}
// Funtion on clicking Reset Button
function resetGame() {
  box.forEach((button) => {
    button.innerText = "";
    button.disabled = false;
    button.classList.remove("win-animation");
  });
  Result.textContent = "Complete a Game";
  turn = true;
  count = 0;
  gameEnded = false;
}
// Funtion on clicking Continue Button
function newGame() {
  resetGame();
  ScorePlyr1.textContent = "0";
  ScorePlyr2.textContent = "0";
}
restartBtn.addEventListener("click", newGame);
continueBtn.addEventListener("click", resetGame);
EndBtn.addEventListener("click", endGame);
