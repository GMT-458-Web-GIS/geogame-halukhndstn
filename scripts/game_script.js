let questions = [];
let currentQuestion = null;
let score = 0;
let timeLeft = 300;
let timerInterval = null;
let totalQuestions = 10;
let questionsAnswered = 0;
let passRights = 3;

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

function startNewGame() {
    gameStarted = true;
    score = 0;
    timeLeft = 300;
    questionsAnswered = 0;
    passRights = 3;
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

document.getElementById('startGame').addEventListener('click', (e) => {
    e.preventDefault();
    gameStarted = true;
    score = 0;
    timeLeft = 300;
    questionsAnswered = 0;
    passRights = 3;
    updatePassButton();
    updateGameInfo();
    showQuestionCard();
    startTimer();
    nextQuestion();
});

document.getElementById('submitAnswer').addEventListener('click', checkSelectedPoint);
document.getElementById('passQuestion').addEventListener('click', passQuestion);

function showQuestionCard() {
    document.getElementById('questionCard').classList.remove('hidden');
    document.getElementById('submitAnswer').classList.remove('hidden');
    document.getElementById('passQuestion').classList.remove('hidden');
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
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
        endGame();
        alert(`Game Over! Your Score: ${score}`);
    }

    if (questions.length === 0) {
        alert("No more questions available!");
        endGame();
        return;
    }
    currentQuestion = questions.splice(Math.floor(Math.random() * questions.length), 1)[0];

    if (currentQuestion && currentQuestion.question) {
        questionsAnswered++;
        displayQuestion(currentQuestion.question);
    } else {
        alert("No question available.");
    }
    updateGameInfo();
}


function displayQuestion(questionText) {
    const questionContent = document.getElementById('questionContent');
    if (questionContent) {
        questionContent.innerText = questionText || "No question available.";
    } else {
        console.error("Question content element not found!");
    }
}

function passQuestion() {
    if (passRights > 0) {
        passRights--;
        updatePassButton();
        nextQuestion();
    }
}

function updatePassButton() {
    const passQuestion = document.getElementById('passQuestion');
    passQuestion.innerText = `Pass Question (${passRights} left)`;
    if (passRights <= 0) {
        passQuestion.classList.add('disabled');
        passQuestion.disabled = true;
    }
}

function endGame() {
    location.reload();
}
