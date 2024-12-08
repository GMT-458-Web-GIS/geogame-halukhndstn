var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

let selectedPoint = null;
let marker = null;
let gameStarted = false;

map.on('click', function (e) {
    if (!gameStarted) {
        return;
    }
    selectedPoint = e.latlng;

    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(selectedPoint).addTo(map);
});

document.getElementById('submitAnswer').addEventListener('click', function () {
    if (!selectedPoint) {
        alert("Please select a point on the map first!");
        return;
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedPoint.lat}&lon=${selectedPoint.lng}&accept-language=en`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.address && data.address.country) {
                const selectedCountry = data.address.country.trim();
                const correctCountry = currentQuestion.answer.trim();

                if (selectedCountry === correctCountry) {
                    score += 10;
                    alert("Correct! +10 Points");
                } else {
                    score -= 5;
                    alert(`Wrong! You selected ${selectedCountry}. The correct answer was ${correctCountry}.`);
                }
            } else {
                alert("Unable to determine the selected country's name. Please try again.");
            }
            updateGameInfo();
            nextQuestion();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while checking the location. Please try again.");
        });
});

