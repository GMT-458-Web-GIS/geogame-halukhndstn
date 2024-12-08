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

## Sample Page Designs
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

## Why was Leaflet.js is Used?
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
- **Benefit**: Simplifies timer management and ensures the timer behaves as expected during the game.

## What I Learned from Artificial Intelligence and Why is it Used?
Helped to draw a roadmap for how to do the project. Decided on the API required to determine the country of the locations selected by the user. Learned how to use Nominatim (OpenStreetMap Geocoding API). Learned why I should use OpenSteerMap's CARTO and how to use it. Helped to get a cleaner code and tested color palettes in a shortcut way. Helped to solve errors and thus the function structure in JavasScript was understood more clearly.

**Chat Link:** https://chatgpt.com/share/6755cf9f-3d14-8013-8028-1ffaf65e4f14

## Interactions with the DOM
The **DOM (Document Object Model)** is a structured representation of the HTML document, enabling JavaScript to interact with and manipulate webpage content dynamically. This project heavily utilized the DOM to create a seamless and interactive user experience.

### Examples
- **Updating Game Information:** This function dynamically updates the displayed score, time, and question progress as the game advances.
  
    ```javascript
    function updateGameInfo() {
        document.getElementById('score').innerText = `Score: ${score}`;
        document.getElementById('time').innerText = `Time: ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;
        document.getElementById('questionNumber').innerText = `Questions: ${questionsAnswered}/${totalQuestions}`;
    }
    ```

- **Showing and Hiding Elements:** These functions manage the visibility of the question card and buttons by toggling the `hidden` class, ensuring the user only sees relevant elements.

    ```javascript
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
    ```
    
### Benefit of DOM Interaction
By leveraging DOM interaction, the game delivers a dynamic and responsive user experience. It updates the interface in real-time, providing immediate feedback on user actions such as selecting a country or submitting an answer. This interactivity ensures the game state is always visually accurate, and simplifies navigation and usability. The ability to show, hide, and modify elements on the fly creates a seamless and intuitive interface that enhances the overall gameplay experience.

