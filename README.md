
# Geoclone: A Geoguessr Clone

Welcome to Geoclone, an engaging and interactive game inspired by the popular online game Geoguessr. This project is a tribute to the original Geoguessr, utilizing Google Street View and Google Maps API to create a similar, immersive, and free experience.

## Table of Contents
- [About Geoclone](#about-geoclone)
- [Access](#access)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About Geoclone
Geoclone is a web-based game that challenges players to guess their location in the world using only the clues available in a randomly generated Google Street View image. This project not only aims to replicate the fun and educational aspects of Geoguessr but also introduces unique features and improvements in the gameplay.

## Access
- **Try Geoclone**: [Geoclone App](https://geoclone.vercel.app)
- **Original Geoguessr Game**: [Geoguessr](https://www.geoguessr.com)

## Features
- **Random Location Generation**: Utilizes an intelligent algorithm to generate coordinates while avoiding oceans and reducing bias towards larger countries.
- **Distance Calculation**: Employs the Haversine formula to accurately calculate the distance between the guessed location and the actual location.
- **Interactive Map Interface**: Powered by Google Maps API, providing a seamless and realistic exploration experience.
- **Responsive Design**: Ensures a great user experience across various devices and screen sizes.

## Technology Stack
- **Frontend**: Angular
- **APIs**: Google Street View and Google Maps API
- **Other Technologies**: Haversine formula for distance calculation

## Setup and Installation
To run this project locally, follow these steps:
1. Clone the repository: `git clone https://github.com/SaiPaladugu/geoclone.git`
2. Navigate to the main directory.
3. Create a `.env` file with the following content: `NG_APP_GOOGLE_MAPS_API_KEY=YOUR_API_KEY`
    - Obtain a Google Maps API key [here](https://developers.google.com/maps/documentation/javascript/get-api-key).
4. Install dependencies: `npm install`
5. Serve the application: `ng serve`
6. Access the app at `localhost:4200`.

## Usage
Once the application is running, you can start playing by simply clicking on the 'Start Game' button. Use the clues in the Street View image to guess your location and submit your guess on the map. The game will then reveal the actual location and calculate your score based on the accuracy of your guess.

## Contributing
Contributions to Geoclone are welcome! Whether it's feature improvements, bug fixes, or documentation, your help is appreciated. Please read the contributing guidelines before submitting your pull requests.

## Contact
For any queries or suggestions, feel free to reach out to me at saipaladugu@cmail.carleton.ca

---

Enjoy playing and exploring the world with Geoclone!
