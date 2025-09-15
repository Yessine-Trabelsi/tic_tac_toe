const restartBtn = document.getElementById("restart-btn");
const statusBar = document.getElementById("status-bar");
const blocks = document.querySelectorAll(".block");
let board = Array(9).fill("");
let isGameFinished = false;
let currentPlayer = "X";
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Col 1
    [1, 4, 7], // Col 2
    [2, 5, 8], // Col 3
    [0, 4, 8], // Diag 1
    [2, 4, 6], // Diag 2
  ];
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] != "" && board[a] == board[b] && board[a] == board[c]) {
      return board[a];
    }
  }
  return board.includes("") ? null : "draw";
}

function updateStatus(winner) {
  if (winner == "draw") {
    statusBar.textContent = `It is a Draw!`;
  } else if (winner) {
    statusBar.textContent = `Player ${winner} is the Winner!`;
  } else {
    statusBar.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function handleBlockClick(block, index) {
  if (board[index] !== "" || isGameFinished) return;
  block.textContent = currentPlayer;
  block.classList.add(currentPlayer == "X" ? "playerX" : "playerO");
  board[index] = currentPlayer;
  const winner = checkWinner();
  if (winner) {
    isGameFinished = true;
  } else {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
  }
  updateStatus(winner);
}

function restartGame() {
  blocks.forEach((b) => {
    b.textContent = "";
    b.classList.remove("playerX", "playerO");
  });
  board = Array(9).fill("");
  currentPlayer = "X";
  isGameFinished = false;
  updateStatus();
}

restartBtn.addEventListener("click", restartGame);
blocks.forEach((b, i) =>
  b.addEventListener("click", () => handleBlockClick(b, i))
);
