let score = 0;
let lives = 3;
let timer = 0;
let correctAnswer = 0;
let timerInterval;

window.onload = () => {
    document.getElementById('game-box').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
};

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('game-box').classList.remove('hidden');

    score = 0;
    lives = 3;
    timer = 0;
    
    document.getElementById('score').innerText = score;
    document.getElementById('timer').innerText = timer;
    updateLives();
    
    clearInterval(timerInterval);
    generateQuestion();
    startTimer();
}

function generateQuestion() {
    if (score === 10) {
        winGame();
        return;
    }

    const operators = ['+', '-'];
    const op = operators[Math.floor(Math.random() * operators.length)];
    let n1 = Math.floor(Math.random() * 10) + 1;
    let n2 = Math.floor(Math.random() * 10) + 1;

    if (op === '+') correctAnswer = n1 + n2;
    else if (op === '-') correctAnswer = n1 - n2;

    document.getElementById('question').innerText = `${n1} ${op} ${n2}`;
    document.getElementById('answer-input').value = '';
    document.getElementById('answer-input').focus();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').innerText = timer;

        if (timer >= 60) {
            clearInterval(timerInterval);
            finishGame("Time Up! Try again.");
        }
    }, 1000);
}

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-input').value);
    
    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById('score').innerText = score;
        generateQuestion();
    } else {
        lives--;
        updateLives();
        if (lives === 0) {
            finishGame("No Lives Left! Try again.");
        } else {
            generateQuestion();
        }
    }
}

function updateLives() {
    document.getElementById('lives').innerText = "❤️".repeat(lives);
}

function winGame() {
    let msg = "";
    if (timer < 30) msg = "Excellent! 🏆";
    else if (timer < 40) msg = "Best! ⭐";
    else if (timer < 50) msg = "Good! 👍";
    else msg = "Nice Performance!";
    
    finishGame(msg);
}

function finishGame(message) {
    clearInterval(timerInterval);
    document.getElementById('game-box').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-msg').innerText = message;
    document.getElementById('final-time').innerText = timer;
}

document.getElementById('submit-btn').addEventListener('click', checkAnswer);
document.getElementById('answer-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});