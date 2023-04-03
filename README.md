# Explore-Beyond

Explore Beyond is a web application that lets users explore the world beyond their immediate surroundings. It combines several APIs and functionalities to provide an all-encompassing experience.

It features an interactive map using the Google Maps API, which displays nearby places based on the user's location and search type. The OpenWeatherMap API provides real-time weather updates for the selected location, while the News API displays the latest news headlines. The Google Places API enables autocomplete for the search box and destination input, and provides place details and reviews.

In addition to these features, Explore Beyond also allows users to calculate their route and get directions to their desired destination. Users can also leave comments on the site, which are stored in local storage, and login with their credentials.

The application also provides live flight data through a connection to the OpenSky Network API, and updates markers on the map accordingly. It includes a function to translate input text to the selected language using the Google Translate API.

Explore Beyond is an all-encompassing tool for exploring new places, planning trips, and staying informed about the latest news and weather updates.

## Code Overview

The JavaScript code integrates several APIs to create a web application that displays information based on the user's location. It includes event listeners that wait for user interactions such as form submission, and functions that handle responses from the APIs. Here's a summary of what the code does:

	loadMapsAPI() function loads the Google Maps API with a callback to the initMap() function. 

	The initMap() function initializes a new map instance and sets the view to the specified location and zoom level.

	navigator.geolocation.getCurrentPosition() method gets the user's location and displays a map centered on the user's location.

	setInterval() method displays the current time on the page and updates it every second.

	OpenWeatherMap API retrieves current weather information for the user's location and displays it on the page.

	News API retrieves the latest news based on the user's location and displays it on the page.

	Google Places Autocomplete enables users to search for places and get directions.

	Retrieve nearby places based on the user's location and selected search type, and display them on the map and in the results container.

	Allow users to leave reviews for the places they visit and store the reviews in local storage. Display the reviews in the place details.

	DOMContentLoaded event listener: This waits for the DOM to finish loading before calling the loadMapsAPI() function.

	commentForm event listener waits for the submission of a comment form, validates the input fields, stores the comment in local storage, displays a confirmation message, and clears the form fields after submission.

	loginForm event listener waits for the submission of a login form, validates the input fields, displays a message based on the correctness of the email and password entered, and reloads the page after one second.

	WebSocket connection creates a new connection with the OpenSky Network API, which provides live flight data. It sends a message to subscribe to state updates, listens for incoming data, and updates the markers on the map with information about each flight.

	getFlightData() function retrieves flight data from the OpenSky Network API by making a fetch request, removes existing markers on the map, adds new markers for each flight in the data, adds a new row to a table displaying information about each flight, and schedules the function to be called again after four hours.

	Google Translate function listens for a form submission event, retrieves the input text, detects the language of the text, translates it to the selected language using the Google Translate API, and displays the translated text on the page.

	form event listener waits for the submission of a form, detects the language of the input text, translates it to the selected language, and displays the translated text.

	Our web application offers an all-encompassing and personalized travel experience, providing users with the latest news and weather updates, nearby places of interest, and live flight data.


## Features

	Google Maps API - The app uses the Google Maps API to display maps, add markers, and retrieve nearby places based on the user's location and selected search type.

	OpenWeatherMap API - We fetch weather information from OpenWeatherMap API to provide users with up-to-date weather forecasts for their travel destinations.

	News API - The app integrates the News API to provide users with the latest news based on their location.

	Google Places API - We use the Google Places API to implement autocomplete for the search box and destination input, retrieve place details, and display reviews.

	Calculate Route - The app offers a route calculation functionality that helps users plan their travel routes and provides detailed information on distance and estimated travel time.

	Live Flight Data - We connect to the OpenSky Network API to receive live flight data and update the markers on the map.

	Translation Service - The app includes a translation service that allows users to translate input text to the selected language using the Google Translate API.

	Login Validation - The app validates a login form and refreshes the page after submission.


## Technologies

The app is developed using the following technologies:

	HTML/CSS/JavaScript - The frontend of our app is built using these three core web technologies.

	Google Maps API - We use the Google Maps API to display maps, add markers, and retrieve nearby places based on the user's location and selected search type.

	OpenWeatherMap API - We use the OpenWeatherMap API to fetch weather information for user-selected locations.

	News API - We use the News API to get the latest news based on the user's location.

	Google Places API - We use the Google Places API to implement autocomplete for the search box and destination input, retrieve place details, and display reviews.

	OpenSky Network API - We connect to the OpenSky Network API to receive live flight data and update the markers on the map.

	Google Translate API - We use the Google Translate API to provide translation services for input text.


## Getting Started

To get started with Explore Beyond, you'll need a web browser and an internet connection. Simply navigate to the website and start exploring!

## Usage

To use Explore Beyond, simply open the web application in your browser. The map will automatically display your current location and nearby places based on the selected search type. You can also search for specific locations using the search box and destination input.

You can submit comments and feedback using the comment form, which will be saved to your local storage. The login form allows you to log in securely and refresh the page after submission.

Explore Beyond also provides live flight data, which can be viewed on the map with markers and in a table. The web application also supports language translation, allowing you to translate input text to the selected language.

## Credits

Explore Beyond was created by Muhammad Moghal. The web application uses several APIs, including the Google Maps API, OpenWeatherMap API, News API, Google Places API, and Google Translate API..

## License

Explore Beyond is licensed under the MIT License. Feel free to use this code for your own projects or modify it to suit your needs.

## Screenshots

1.  Visit [Deployed Application](https://mmoghal.github.io/explore-beyond/) for explore-beyond

2.  Screenshot of Weather Dashboard ![alt Image of the application](https://github.com/mmoghal/explore-beyond/blob/main/assets/images/explore.png)

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## Contact

If you have any questions or issues, please contact me at mmoghal29@gmail.com
