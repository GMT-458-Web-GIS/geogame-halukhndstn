# CounrtyGuesser - 

**Page:** https://gmt-458-web-gis.github.io/geogame-halukhndstn/

## Overview
A map-based WEB game where users answer location questions (capitals or tourist destinations) by clicking on the map within a set time limit.

## Layout Structure
### Navbar
- Title of the game
- Start Game - Restart Game buttons
### Main Content Area:
- Map display with **leaflet.js**
- Question and How to Play cards
### Question Card
- Score tracker
- Question counter
- Timer
### How to Play Card
- Texts

## Sample Pages
![Untitled Page (4) (1) (1)](https://github.com/user-attachments/assets/fd172edf-92c9-4587-b4f9-edf74c7c7f9f)

![Untitled Page (4) (1)](https://github.com/user-attachments/assets/056009f5-be29-404b-b500-16a52640a870)

## Requirements
- Interactive map display using **Leaflet.js**
- Time-limited question answering
- Score tracking and feedback for users
- Json files containing questions and answers
- HTML files containing views
- CSS files containing elemts of design
- Script files

## Why whas Leaflet.js is Used?
Leaflet is an open source JavaScript library used to create web-based interactive maps. Thanks to its lightweight structure and easy learning, it is ideal for quickly integrating various map features into web applications. For this project, it was advantageous to be able to detect clicks on the map, to be easy to use with OpenStreetMap's geolocaitonAPI, and to be able to easily access the CARTO base without location names.

## Event Handlers

### 1. Map Click Event
- The event handler captures the latitude and longitude when the user clicks on the map.

    ```javascript
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
    ```
  
### 2. Pass Question Button Click
- This event handler listens for a click event on the "Pass Question" button. When triggered, it decrements the number of available passes (passRights), updates the button text, disables it if no passes are left, and loads the next question.

    ```javascript
   document.getElementById('passQuestion').addEventListener('click', passQuestion);
    ```
    
### 3. Submit Answer Button
- This handler listens for a click event on the "Submit Answer" button. It fetches the country name from the Nominatim API based on the map location selected by the user, compares it with the correct answer, updates the score, and displays feedback.

    ```javascript
    document.getElementById('submitAnswer').addEventListener('click', checkSelectedPoint);
    ```

## Clousers
### Example: Timer Management
- **How it works**: 
  - The `startTimer` function leverages a closure to encapsulate the `timerInterval` variable, ensuring its state is maintained across intervals.
  - The `clearInterval` method resets the interval when necessary, preventing duplicate timers.
- **Benefit**: Simplifies timer management and ensures the timer behaves as expected during the game.

    ```javascript
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
    ```
## What I Learned from Artificial Intelligence and Why is it Used?



