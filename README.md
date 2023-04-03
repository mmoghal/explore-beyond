# Explore-Beyond

Explore Beyond is a web application that lets users explore the world beyond their immediate surroundings. It combines several APIs and functionalities to provide an all-encompassing experience.

It features an interactive map using the Google Maps API, which displays nearby places based on the user's location and search type. The OpenWeatherMap API provides real-time weather updates for the selected location, while the News API displays the latest news headlines. The Google Places API enables autocomplete for the search box and destination input, and provides place details and reviews.

In addition to these features, Explore Beyond also allows users to calculate their route and get directions to their desired destination. Users can also leave comments on the site, which are stored in local storage, and login with their credentials.

The application also provides live flight data through a connection to the OpenSky Network API, and updates markers on the map accordingly. It includes a function to translate input text to the selected language using the Google Translate API.

Explore Beyond is an all-encompassing tool for exploring new places, planning trips, and staying informed about the latest news and weather updates.

## Code Overview

The code consists of several event listeners that wait for user interactions such as form submission, and functions that handle the responses from the APIs.

The loadMapsAPI() function loads the Google Maps API with a callback to the initMap() function. The initMap() function initializes a new map instance and sets the view to the specified location and zoom level.

The commentForm event listener waits for the submission of a comment form, validates the input fields, and stores the comment in local storage. It also displays a confirmation message and clears the form fields after submission.

The loginForm event listener waits for the submission of a login form, validates the input fields, and displays a message based on the correctness of the email and password entered. It also refreshes the page after submission.

The socket variable creates a new WebSocket connection to the OpenSky Network API and sends a request to subscribe to the flight data. The getFlightData() function fetches the flight data and updates the markers on the map. It also updates a table with the flight data and calls itself again after a specified time interval.

The form event listener waits for the submission of a form, detects the language of the input text, translates it to the selected language, and displays the translated text.

This comprehensive web application combines different APIs and functionalities to provide the user with a variety of features, from displaying a map to providing live flight data. It showcases the power of APIs and how they can be used to create dynamic and engaging web applications.

## Features

Google Maps API: The Google Maps API is used to initialize and display the map, add markers, and retrieve nearby places based on the user's location and selected search type.

OpenWeatherMap API: The OpenWeatherMap API is used to fetch the weather information for the user's location.

News API: The News API is used to get the latest news based on the user's location.

Google Places API: The Google Places API is used to implement autocomplete for the search box and destination input, and to retrieve place details and reviews.

Saving Comments: The app saves comments submitted in a form to local storage.

Login Validation: The app validates a login form and refreshes the page after submission.

Live Flight Data: The app connects to OpenSky Network API to receive live flight data and updates the markers on the map.

Translation Functionality: The app translates input text to the selected language using the Google Translate API.

## Technologies Used

.   HTML

.   CSS

.   JavaScript

.   OpenWeatherMap API

.   Google Places API

.   Google Translate API

.   Google Maps API

.   News API

.   Live Flight Data


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
