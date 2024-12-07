var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

let selectedPoint = null;
let marker = null;

map.on('click', function (e) {
    selectedPoint = e.latlng;
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(selectedPoint).addTo(map);
    alert("You selected a point. Click 'Submit Answer' to check.");
});
