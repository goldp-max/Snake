const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; 
let snake = [{ x: 5, y: 5 }];
let food = generateFood();
let score = 0;
let direction = { x: 1, y: 0 };
let gameInterval;

// Generar comida en posición aleatoria
function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)),
    y: Math.floor(Math.random() * (canvas.height / box))
  };
}

// Dibujar todo en pantalla
function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar serpiente (cuerpo redondeado)
  ctx.fillStyle = "limegreen";
  snake.forEach((part, index) => {
    ctx.beginPath();
    ctx.arc(
      part.x * box + box / 2,
      part.y * box + box / 2,
      box / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  });

  // Dibujar cabeza diferente (más oscura)
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(
    snake[0].x * box + box / 2,
    snake[0].y * box + box / 2,
    box / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();

  // Dibujar manzana
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    food.x * box + box / 2,
    food.y * box + box / 2,
    box / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();

  // Dibujar tallo de la manzana
  ctx.fillStyle = "brown";
  ctx.fillRect(
    food.x * box + box / 2 - 2,
    food.y * box + box / 2 - box / 2,
    4,
    8
  );

  // Dibujar hoja
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(
    food.x * box + box / 2 + 6,
    food.y * box + box / 2 - box / 2,
    5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  document.getElementById("score").textContent = `Puntuación: ${score}`;
}

// Actualizar juego
function update() {
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop();
  }

 // Colisión
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width / box || head.y >= canvas.height / box ||
    snake.some(part => part.x === head.x && part.y === head.y)
  ) {
    clearInterval(gameInterval);
    document.getElementById("finalScore").textContent = `Tu puntuación fue: ${score}`;
    document.getElementById("gameOverScreen").style.display = "block";
    return;
  }

  snake.unshift(head);
}

// Bucle del juego
function gameLoop() {
  update();
  draw();
}

// Controles
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (event.key === "ArrowDown" && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (event.key === "ArrowLeft" && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (event.key === "ArrowRight" && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
});

// Iniciar juego
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameOverScreen").style.display = "none";
  
  // Mostrar canvas y puntuación
  document.getElementById("gameCanvas").style.display = "block";
  document.getElementById("score").style.display = "block";

  score = 0;
  snake = [{ x: 5, y: 5 }];
  direction = { x: 1, y: 0 };
  gameInterval = setInterval(gameLoop, 150);
});

// Reintentar
document.getElementById("retryBtn").addEventListener("click", () => {
  document.getElementById("gameOverScreen").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
  document.getElementById("score").style.display = "block";

  score = 0;
  snake = [{ x: 5, y: 5 }];
  direction = { x: 1, y: 0 };
  food = generateFood();
  clearInterval(gameInterval); 
  gameInterval = setInterval(gameLoop, 150);
});

// Volver al menú
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("gameOverScreen").style.display = "none";
  document.getElementById("menu").style.display = "flex";
});