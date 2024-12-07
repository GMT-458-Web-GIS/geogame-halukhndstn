let questions = [];
let currentQuestion = null;
let score = 0;
let timeLeft = 300;
let timerInterval = null;
let nextQuestionLimit = 5;

fetch('./data/quesitons.json')
    .then(response => response.json())
    .then(data => questions = data);

document.getElementById('startGame').addEventListener('click', (e) => {
    e.preventDefault();
    score = 0;
    timeLeft = 300;
    nextQuestionLimit = 5;
    updateGameInfo();
    showQuestionCard();
    startTimer();
    nextQuestion();
});

document.getElementById('submitAnswer').addEventListener('click', () => {
    checkSelectedPoint();
});

function checkSelectedPoint() {
    if (!selectedPoint) {
        alert("Please select a point on the map first!");
        return;
    }

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedPoint.lat}&lon=${selectedPoint.lng}`)
        .then(response => response.json())
        .then(data => {
            const country = data.address.country;
            if (country === currentQuestion.answer) {
                score += 10;
                alert("Correct! +10 Points");
            } else {
                score -= 5;
                alert(`Wrong! The correct answer was ${currentQuestion.answer}.`);
            }
            updateGameInfo();
            nextQuestion();
        })
        .catch(error => console.error('Error:', error));
}

function showQuestionCard() {
    document.getElementById('questionCard').classList.remove('hidden');
    document.getElementById('submitAnswer').classList.remove('hidden');
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
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').innerText = `Time: ${minutes}:${String(seconds).padStart(2, '0')}`;
}

function nextQuestion() {
    if (questions.length === 0 || nextQuestionLimit <= 0) {
        document.getElementById('nextQuestion').classList.add('hidden');
        return;
    }
    currentQuestion = questions.splice(Math.floor(Math.random() * questions.length), 1)[0];
    displayQuestion(currentQuestion.question);
}

function displayQuestion(questionText) {
    document.getElementById('questionContent').innerText = questionText;
}

function endGame() {
    alert(`Game Over! Your Score: ${score}`);
    location.reload();
}
