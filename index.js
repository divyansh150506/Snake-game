let snake = [{x: 100, y: 100}, {x: 80, y: 100}, {x: 60, y: 100}];
let food = {x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20};
let direction = 'right';
let score = 0;
let speed = 100;

function drawSnake() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    snake.forEach(part => {
        const snakePart = document.createElement('div');
        snakePart.classList.add('snake-part');
        snakePart.style.left = part.x + 'px';
        snakePart.style.top = part.y + 'px';
        gameBoard.appendChild(snakePart);
    });
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    gameBoard.appendChild(foodElement);
}

function moveSnake() {
    const head = snake[0];
    let newHead;
    if (direction === 'right') {
        newHead = {x: head.x + 20, y: head.y};
    } else if (direction === 'left') {
        newHead = {x: head.x - 20, y: head.y};
    } else if (direction === 'up') {
        newHead = {x: head.x, y: head.y - 20};
    } else if (direction === 'down') {
        newHead = {x: head.x, y: head.y + 20};
    }
    snake.unshift(newHead);
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
        food = {x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20};
    } else {
        snake.pop();
    }
    if (snake[0].x < 0 || snake[0].x >= 400 || snake[0].y < 0 || snake[0].y >= 400 || checkCollision()) {
        const modal = new bootstrap.Modal(document.getElementById('gameOverModal'));
        modal.show();
        document.getElementById('final-score').innerText = score;
        return;
    }
    drawSnake();
    setTimeout(moveSnake, speed);
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (event.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    }
});

function setDifficulty(level) {
    if (level === 'easy') {
        speed = 150;
    }else if (level === 'hard') {
        speed = 50;
    }
    document.getElementById('difficultyModal').style.display = 'none';
    drawSnake();
    moveSnake();
}


