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

function showQuestionCard() {
    const questionCard = document.getElementById('questionCard');
    questionCard.classList.remove('hidden');

    const nextButton = document.getElementById('nextQuestion');
    nextButton.classList.remove('hidden');
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

map.on('click', function (e) {
    if (!currentQuestion) return;

    fetch(`./data/countries/${currentQuestion.answer_geojson}`)
        .then(response => response.json())
        .then(geojson => {
            const userPoint = turf.point([e.latlng.lng, e.latlng.lat]);
            const countryPolygon = turf.featureCollection(geojson.features);

            if (turf.booleanPointInPolygon(userPoint, countryPolygon)) {
                score += 10;
                alert("Correct! +10 Points");
            } else {
                score -= 5;
                alert("Wrong! -5 Points");
            }
            updateGameInfo();
        });
});

document.getElementById('nextQuestion').addEventListener('click', () => {
    nextQuestionLimit--;
    updateNextQuestionButton();
    nextQuestion();
});

function updateNextQuestionButton() {
    const nextButton = document.getElementById('nextQuestion');
    if (nextQuestionLimit > 0) {
        nextButton.innerText = `Next Question (${nextQuestionLimit})`;
        nextButton.classList.remove('hidden');
    } else {
        nextButton.classList.add('hidden');
    }
}

function endGame() {
    alert(`Game Over! Your Score: ${score}`);
    location.reload();
}