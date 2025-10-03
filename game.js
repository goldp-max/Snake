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

  // Dibujar manzana🍎
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
