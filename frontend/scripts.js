const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const scoreEL = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const gameoverEL = document.getElementById("game-over");
const resetBtn = document.getElementById("reset-btn");
const finalScore = document.getElementById("final-score");

let score = 0;
let playerX = gameContainer.offsetWidth / 2;
let gameRunning = false;
let starInterval;

function createStar(){
    if (!gameRunning) return;

    const star = document.createElement("div");
    star.classList.add("star");

    const starX = Math.random() * (gameContainer.offsetWidth - 20);
    star.style.left = `${starX}px`;
    star.style.top = `0px`;

    gameContainer.appendChild(star);

    let posY = 0;
    const fallSpeed = 10;

    const fallInterval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(fallInterval);
            return;
        }

        posY += fallSpeed;
        star.style.top = `${posY}px`;

        if (posY > gameContainer.offsetHeight - 60){
            const starX = parseInt(star.style.left);
            if(Math.abs(starX - playerX) < 30){
                score += 10;
                scoreEL.textContent = `Score: ${score}`;
                gameContainer.removeChild(star);
                clearInterval(fallInterval);
                return;
            }
        }

        if (posY > gameContainer.offsetHeight){
            gameContainer.removeChild(star);
            gameoverEL.style.display = "block";
            finalScore.textContent = `${score}`;
            scoreEL.textContent = `Score: 0`;
            stopGame();
            clearInterval(fallInterval);
            return;
        }
    },20)
}

const stopGame = () => {
    gameRunning = false;
    clearInterval(starInterval);
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => star.remove());
}

const resetGame = () => {
    stopGame()
    score = 0;
    scoreEL.textContent = `Score: ${score}`;
    gameoverEL.style.display = "none";
}



startBtn.addEventListener("click", () => {
    gameRunning = true;
    document.addEventListener("mousemove", (e) => {
        const react = gameContainer.getBoundingClientRect();
        playerX = e.clientX - react.left;
    
        if (playerX < 30) player = 30;
        if (playerX > gameContainer.offsetWidth - 30) playerX = gameContainer.offsetWidth - 30;
    
        player.style.left = `${playerX}px`;
    })
    setInterval(createStar, 2000);
})

resetBtn.addEventListener("click", resetGame);