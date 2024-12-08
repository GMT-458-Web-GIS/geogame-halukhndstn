let questions = [];
let currentQuestion = null;
let score = 0;
let timeLeft = 300;
let timerInterval = null;
let totalQuestions = 10;
let questionsAnswered = 0;
let passRights = 3;

document.addEventListener("DOMContentLoaded", () => {
    const animatedText = document.getElementById("animatedText");
    animatedText.innerText = "Test your knowledge about capital cities and country locations!";

    setTimeout(() => {
        animatedText.classList.add("show");

        setTimeout(() => {
            animatedText.classList.remove("show");
            animatedText.classList.add("hide");

            setTimeout(() => {
                animatedText.innerText = "";
                animatedText.classList.remove("hide");
            }, 1000);
        }, 3000); 
    }, 500);

    hideQuestionCard();
});

document.getElementById('startGame').addEventListener('click', (e) => {
    e.preventDefault();

    if (gameStarted) {
        const confirmRestart = confirm("Are you sure you want to restart the game?");
        if (confirmRestart) {
            startNewGame();
        }
    } else {
        startNewGame();
    }
});

function resetGameVariables() {
    gameStarted = true;
    score = 0;
    timeLeft = 300;
    questionsAnswered = 0;
    passRights = 3;
}

function startNewGame() {
    resetGameVariables();

    const passButton = document.getElementById('passQuestion');
    passButton.classList.remove('disabled');
    passButton.disabled = false;

    updatePassButton();
    updateGameInfo();
    showQuestionCard();
    startTimer();
    nextQuestion();

    const startGameButton = document.getElementById('startGame');
    startGameButton.innerText = "Restart Game";
    
    const howToPlaySection = document.getElementById('gameInstructions');
    if (howToPlaySection) {
        howToPlaySection.classList.add('hidden');
    }
}

fetch('./data/questions.json')
    .then(response => response.json())
    .then(data => questions = data);

document.getElementById('submitAnswer').addEventListener('click', checkSelectedPoint);
document.getElementById('passQuestion').addEventListener('click', passQuestion);

function showQuestionCard() {
    document.getElementById('questionCard').classList.remove('hidden');
    document.getElementById('submitAnswer').classList.remove('hidden');
    document.getElementById('passQuestion').classList.remove('hidden');
}

function hideQuestionCard() {
    document.getElementById('questionCard').classList.add('hidden');
    document.getElementById('submitAnswer').classList.add('hidden');
    document.getElementById('passQuestion').classList.add('hidden');
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Time's up! Your score: ${score}`);
            endGame();
        } else {
            timeLeft--;
            updateGameInfo();
        }
    }, 1000);
}

function updateGameInfo() {
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('time').innerText = `Time: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;
    document.getElementById('questionNumber').innerText = `Questions: ${questionsAnswered}/${totalQuestions}`;
}

function nextQuestion() {
    if (questionsAnswered >= totalQuestions) {
        alert(`Maximum number of questions reached. Your score: ${score}`);
        endGame();
        return;
    }
    questionsAnswered++;
    currentQuestion = questions.splice(Math.floor(Math.random() * questions.length), 1)[0];
    displayQuestion(currentQuestion.question);
    updateGameInfo();
}

function displayQuestion(questionText) {
    document.getElementById('questionContent').innerText = questionText || "No question available.";
}

function checkSelectedPoint() {
    if (!selectedPoint) {
        alert("Select a point on the map first!");
        return;
    }
}

function passQuestion() {
    if (passRights > 0) {
        passRights--;
        updatePassButton();
        currentQuestion = questions.splice(Math.floor(Math.random() * questions.length), 1)[0];
        displayQuestion(currentQuestion.question);
    }
}

function updatePassButton() {
    const passButton = document.getElementById('passQuestion');
    passButton.innerText = `Pass Question (${passRights} left)`;
    if (passRights <= 0) {
        passButton.classList.add('disabled');
        passButton.disabled = true;
    }
}

function endGame() {
    location.reload();
}
