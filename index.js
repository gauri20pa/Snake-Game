const foodSound = new Audio("music/food.mp3");
const gameOver = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const gameSound = new Audio("music/music.mp3");
let inputDir = { x: 0, y: 0 };
const speed = 7;
let score = 0;
let lastTime = 0;
let snakeArr = [
    {
        x: 13, y: 15
    }
]
let food = { x: 6, y: 7 };


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastTime) / 1000 < 1 / speed) {
        return;
    }
    lastTime = ctime;
    gameRun();
}
function isCollapse(sArr) {
    //if eat yourself
    for (let i = 1; i < sArr.length; i++) {
        if (sArr[i].x === sArr[0].x && sArr[i].y === sArr[0].y) {
            return true;
        }
    }
    if (sArr[0].x <= 0 || sArr[0].x >= 18 || sArr[0].y <= 0 || sArr[0].y >= 18) {
        return true;
    }
}
function gameRun() {
    //update the snake and food
    if (isCollapse(snakeArr)) {
        gameOver.play();
        gameSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over. Press any key to restart");
        snakeArr = [
            {
                x: 13, y: 15
            }
        ]
        //gameSound.play();
        score = 0;
        scoreBox.innerHTML = "Score:0";
    }
    //food has been eaten
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score:" + score;
        if (score > highScore) {
            highScore = score;
            highScoreBox.innerHTML = "HighScore: " + highScore;
            highscoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highscoreVal));
        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2, b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }
    }
    //move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //display the snake and food
    board.innerHTML = "";
    snakeArr.forEach((currentValue, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = currentValue.y;
        snakeElement.style.gridColumnStart = currentValue.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }

        board.appendChild(snakeElement);
    })
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}


let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    highscoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highscoreVal));
}
else {
    highscoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "HighScore: " + highScore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    moveSound.play();
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default: break;
    }
})




