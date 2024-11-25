var map = L.map('map').setView([39.9334, 32.8597], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var locations = [
    {lat: 38.676963089350345, lon: 26.750876194015795, popup: "Deneme"},
];

locations.forEach(function(location, index) {
    var marker = L.marker([location.lat, location.lon]).addTo(map);
    marker.bindPopup(location.popup);

    var li = document.createElement('li');
    li.textContent = location.popup.split('<strong>')[1].split('</strong>')[0];
    li.onclick = function() {
        map.setView([location.lat, location.lon], 10); 
        marker.openPopup(); 
    };
    document.getElementById('locations').appendChild(li);
});