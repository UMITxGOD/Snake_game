const gameBoard = document.querySelector("#gameBoard");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const scoreCard = document.querySelector("#scoreCard");
const restartBtn = document.querySelector("#restartBtn");
const canvasBackground = "white";
const snakeColor = "green";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let food_X_Coordinate;
let food_Y_Coordinate;
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 }, //    ...............................
  { x: unitSize * 3, y: 0 }, //    :=:=:=:=>  initial(0,100)     :
  { x: unitSize * 2, y: 0 }, //    :                             :
  { x: unitSize * 1, y: 0 }, //    :                             :
  { x: unitSize * 0, y: 0 }, //    :.............................:
];

window.addEventListener("keydown", changeDirection);

restartBtn.addEventListener("click", restartGame);

window.addEventListener("load", gameStart);

function gameStart() {
  running = true;
  scoreCard.textContent = score;
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100);
  } else displayGameOver();
}

function clearBoard() {
  context.fillStyle = canvasBackground;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
}

function createFood() {
  function randomFood(min, max) {
    const randomFoodLocation =
      Math.floor((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randomFoodLocation;
  }
  food_X_Coordinate = randomFood(0, canvasWidth - unitSize);
  food_Y_Coordinate = randomFood(0, canvasHeight - unitSize);
  context.fillStyle = foodColor;
  context.fillRect(food_X_Coordinate, food_Y_Coordinate, unitSize, unitSize);
}

function drawFood() {
  createFood();
}

function drawSnake() {
  context.fillStyle = snakeColor;
  context.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  //if food is eaten
  if (snake[0].x == food_X_Coordinate && snake[0].y == food_Y_Coordinate) {
    score += 1;
    scoreCard.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}

function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x > canvasWidth:
      running = false;
      break;

    case snake[0].y < 0:
      running = false;
      break;

    case snake[0].y > canvasHeight:
      running = false;
      break;
  }
}

function displayGameOver() {
  context.font = "50px MV Boli";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("You Lose!", canvasWidth / 2, canvasHeight / 2);
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const left = 37;
  const up = 38;
  const right = 39;
  const down = 40;
  const isGoingUp = yVelocity == -unitSize;
  const isGoingDown = yVelocity == unitSize;
  const isGoingLeft = xVelocity == -unitSize;
  const isGoingRight = xVelocity == unitSize;
  switch (true) {
    case keyPressed == left && !isGoingRight:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == right && !isGoingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == up && !isGoingDown:
      yVelocity = -unitSize;
      xVelocity = 0;
      break;
    case keyPressed == down && !isGoingUp:
      yVelocity = unitSize;
      xVelocity = 0;
      break;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
      break;
    }
  }
}

function restartGame() {
  score = 0;
  xVelocity = 0;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 }, //    ...............................
    { x: unitSize * 3, y: 0 }, //    :=:=:=:=>  initial(0,100)     :
    { x: unitSize * 2, y: 0 }, //    :                             :
    { x: unitSize * 1, y: 0 }, //    :                             :
    { x: unitSize * 0, y: 0 }, //    :.............................:
  ];
  gameStart();
}
