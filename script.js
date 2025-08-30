let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let winner = document.querySelector(".winner-name");
let newBtn = document.querySelector(".new-btn");

let turnO = true; // true = O's turn, false = X's turn
let gameOver = false;

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const printWinner = (name) => {
  if (name === "Draw") {
    winner.innerHTML = 'Game is ${name}';
  } else {
    winner.innerHTML = 'Winner is ${name}';
  }
  winner.classList.remove("hide");
  newBtn.classList.remove("hide");
  resetBtn.classList.add("hide");
  gameOver = true;
};

const enableButton = () => {
  boxes.forEach((box) => {
    box.disabled = false;
  });
};

const disableButton = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

resetBtn.addEventListener("click", () => {
  resetGame();
});

const resetGame = () => {
  turnO = true;
  gameOver = false;
  enableButton();
  boxes.forEach((box) => {
    box.innerText = "";
  });
};

newBtn.addEventListener("click", () => {
  newGame();
});

const newGame = () => {
  turnO = true;
  gameOver = false;
  enableButton();
  boxes.forEach((box) => {
    box.innerText = "";
  });
  winner.classList.add("hide");
  newBtn.classList.add("hide");
  resetBtn.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver) return;

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner(); // winner check first
    if (!gameOver) {
      checkNoWinner(); // draw only if no winner yet
    }
  });
});

const checkWinner = () => {
  for (let pattern of winningPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      disableButton();
      printWinner(pos1);
      return;
    }
  }
};

const checkNoWinner = () => {
  let count = 0;
  boxes.forEach((box) => {
    if (box.innerText !== "") {
      count++;
    }
  });
  if (count === 9) {
    printWinner("Draw");
  }
};
