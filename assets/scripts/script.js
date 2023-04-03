let map;

// Initialize the Google Maps API
function initMap() {
  // Set up a map centered on the user's location
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Get the current date and time
      const updateTime = () => {
        const date = new Date();
        const currentTime = date.toLocaleString();
        const timeContainer = document.getElementById("time-container");
        timeContainer.innerHTML = `Current Time: ${currentTime}`;
      };
      updateTime();
      setInterval(updateTime, 1000);

      // Make a request to the OpenWeatherMap API to get the weather information for the user's location
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=81822968b5a226abb1a2fbacd053f10a`
      )
        .then((response) => response.json())
        .then((data) => {
          const temp = Math.round((data.main.temp - 273.15) * 1.8 + 32);
          const desc = data.weather[0].description;
          // Display the weather information and current time on the page
          const weatherContainer = document.getElementById("weather-container");
          weatherContainer.innerHTML = `Temperature: ${temp}°C, ${desc}`;
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });

      map = new google.maps.Map(document.getElementById("map-container"), {
        center: { lat: lat, lng: lng },
        zoom: 15,
      });
      


// Make a request to the News API to get the latest news based on the user's location
const url = `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=10&apiKey=256a5356438c4e82bead4f37f7bd8746&lat=${lat}&lon=${lng}`;
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (!data || !data.articles || data.articles.length === 0) {
        // Handle case when no news articles are returned
        console.log("No news articles found");
    } else {
        // Process the data and display the news articles
    console.log(data);
    displayNewsArticles(data.articles);
    }
  })
  .catch((error) => {
    console.error("Error fetching news data:", error);
  });

function displayNewsArticles(articles) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = ""; // Clear previous articles

  articles.forEach((article) => {
    // Create a new div to hold the article
    const articleDiv = document.createElement("div");
    articleDiv.classList.add("article");

    // Create elements to display the article's title, description, and image (if available)
    const title = document.createElement("h3");
    title.textContent = article.title;
    articleDiv.appendChild(title);

    if (article.description) {
      const description = document.createElement("p");
      description.textContent = article.description;
      articleDiv.appendChild(description);
    }

    if (article.urlToImage) {
      const image = document.createElement("img");
      image.src = article.urlToImage;
      image.alt = article.title;
      articleDiv.appendChild(image);
    }

    // Add the article to the news container
    newsContainer.appendChild(articleDiv);
  });
}

      // Add a marker for the user's location
      const userMarker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: "You are here",
      });

      // function to initialize the Google Places Autocomplete feature
      const input = document.getElementById("map-search-box");
      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);


      // function to add a listener for place changes
      autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          map.setCenter(place.geometry.location);
          map.setZoom(15);
        } else {
          alert("No details available for input: '" + place.name + "'");
        }
      });


    // function to initialize the Google Places Autocomplete feature for destination
      const destinationInput = document.getElementById("destination");
      const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
      destinationAutocomplete.bindTo("bounds", map);
      

       // Initialize the directions renderer
       directionsRenderer = new google.maps.DirectionsRenderer();
       directionsRenderer.setMap(map);

// Get the button element and add a click event listener to it
const calculateRouteButton = document.getElementById("calculate-route");
calculateRouteButton.addEventListener("click", calculateRoute);

function calculateRoute() {
  // Get the origin and destination from the autocomplete inputs
  const origin = input.value;
  const destination = destinationInput.value;

  // Initialize the DirectionsService and DirectionsRenderer
  const directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);



  //const directionsButton = document.getElementById("directions-button");
  //console.log(directionsButton); // Adding this line to test
 // const directionsContainer = document.getElementById("directions-container");
  //directionsButton.addEventListener("click", function() {
   // console.log("Clicked"); // Adding this line to test
 // directionsContainer.style.display = "block";
//});



  // Set up the request for the DirectionsService
  const request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING,
  };




  // Call the DirectionsService to get the route
  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // Display the route on the map using the DirectionsRenderer
      directionsRenderer.setDirections(result);
    } else {
      console.error("Error getting directions:", status);
    }
  });
}


const directionsService = new google.maps.DirectionsService();

document.getElementById("calculate-route").addEventListener("click", function () {
  const start = new google.maps.LatLng(lat, lng);
  const destination = destinationAutocomplete.getPlace().geometry.location;

  const request = {
    origin: start,
    destination: destination,
    travelMode: "DRIVING",
  };

  directionsService.route(request, function (result, status) {
    if (status == "OK") {
      directionsRenderer.setDirections(result);
    }
  });
});




    },
    function () {
      alert("Could not retrieve your location.");
    }
  );
}


 








// Retrieve nearby places based on user's location and selected search type
const searchTypes = document.getElementById("search-type");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  const lat = map.getCenter().lat();
  const lng = map.getCenter().lng();
  const selectedType = searchTypes.value;
  const request = {
    location: { lat: lat, lng: lng },
    radius: 1000, // Search radius in meters
    type: selectedType,
  };
  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, displayResults);
});

// Display the search results on the map and in the results container
function displayResults(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      const resultsContainer = document.getElementById("results-container");
      resultsContainer.innerHTML = "";
      // Keep track of the markers added to the map
      const markers = [];
      for (let i = 0; i < results.length; i++) {
        const place = results[i];
        // Add a marker for each place
        const placeMarker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name,
        });
        // Add the marker to the markers array
        markers.push(placeMarker);
        // Add place details and review form to the results container
      const resultDiv = document.createElement("div");
      resultDiv.classList.add("result");
      resultDiv.innerHTML = `
        <h2>${place.name}</h2>
        <p>${place.vicinity}</p>
        <div class="rating">
          <img src="${place.rating ? "star.png" : "no-star.png"}" alt="star" />
          <span>${place.rating ? place.rating.toFixed(1) : "N/A"}</span>
        </div>
        <a href="${place.website}" target="_blank">${place.website}</a>
        <form class="review-form">
          <h3>Leave a review</h3>
          <div class="form-group">
            <label for="name-input">Name:</label>
            <input type="text" id="name-input" required />
          </div>
          <div class="form-group">
            <label for="rating-input">Rating:</label>
            <select id="rating-input" required>
              <option value="">Select a rating</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>
          <div class="form-group">
            <label for="comment-input">Comment:</label>
            <textarea id="comment-input" required></textarea>
          </div>
          <button type="submit">Submit review</button>
        </form>
        <ul class="review-list"></ul>
      `;
      resultsContainer.appendChild(resultDiv);
      // Listen for submission of review form
      const reviewForm = resultDiv.querySelector(".review-form");
      reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = this.querySelector("#name-input").value;
        const rating = this.querySelector("#rating-input").value;
        const comment = this.querySelector("#comment-input").value;
        const review = {
          name: name,
          rating: rating,
          comment: comment,
        };
        // Store the review in local storage
        const reviews = JSON.parse(localStorage.getItem("reviews")) || {};
        const placeId = place.place_id;
        if (!reviews[placeId]) {
          reviews[placeId] = [];
        }
        reviews[placeId].push(review);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Show the modal when the review is submitted
        const modal = document.getElementById("modal");
        const modalCloseBtn = document.getElementById("modal-close-btn");
        modal.classList.add("active");
        modalCloseBtn.addEventListener("click", function () {
          modal.classList.remove("active");
        });

        // Display the review in the place details
        const reviewList = resultDiv.querySelector(".review-list");
        const newReview = document.createElement("li");
        newReview.innerHTML = `
            <div class="review-header">
              <h4>${name}</h4>
              <img src="${
                rating > 0 ? "star.png" : "no-star.png"
              }" alt="star" />
              <span>${rating > 0 ? rating + " stars" : "N/A"}</span>
            </div>
            <div class="review-body">
              <p>${comment}</p>
            </div>
          `;
        reviewList.appendChild(newReview);
      });
    }
  }
}

// Load the Google Maps API
function loadMapsAPI() {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyADJ534OZMnSqGaHgy3zHYwIkKHXiy_1Ig&libraries=places&callback=initMap";
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
  }
  
  // Wait for the DOM to load before initializing the application
  document.addEventListener("DOMContentLoaded", function () {
    loadMapsAPI();
  });
  
  // Listen for submission of comment form
  const commentForm = document.getElementById("comment-form");
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = this.querySelector("#name-input").value;
    const email = this.querySelector("#email-input").value;
    const message = this.querySelector("#comment-input").value;
    const comment = {
      name: name,
      email: email,
      message: message,
    };
    // Store the comment in local storage
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
  
    // Show the confirmation message
    const confirmationMsg = document.getElementById("confirmation-msg");
    confirmationMsg.style.display = "block";
    setTimeout(function () {
      confirmationMsg.style.display = "none";
    }, 2000);
  
    // Clear the form fields
    this.reset();
  });

  // This will display a message saying "Welcome!" if the email is "example@example.com"
// and the password is "password", and display a message saying "Incorrect email or password." otherwise.

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;

  if (email === "example@example.com" && password === "password") {
    alert("Welcome!");
  } else {
    alert("Incorrect email or password.");
  }
  // Refresh the page after 1 seconds
  setTimeout(function () {
    location.reload();
  }, 1000);
});











// Create a new web socket connection
const socket = new WebSocket('wss://opensky-network.org/api/states/all');

// When the connection is established, send a message to request flight data
socket.addEventListener('open', (event) => {
  socket.send(JSON.stringify({
    "action": "subscribe",
    "params": {
      "type": "states"
    }
  }));
});

// When a message is received from the server, update the markers on the map
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.states) {
    data.states.forEach(state => {
      if (state !== null) {
        // Update the marker position on the map
        const marker = L.marker([state[6], state[5]]);
        marker.bindPopup(`<b>${state[1]}</b><br>Altitude: ${state[7]}<br>Speed: ${state[9]}<br>Heading: ${state[10]}`);
        marker.addTo(mymap);
      }
    });
  }
});


// Live flight data
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(mymap);

// Function to get flight data and update markers on the map
function getFlightData() {
  fetch('https://opensky-network.org/api/states/all')
    .then(response => response.json())
    .then(data => {
      // Remove all existing markers
      mymap.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          mymap.removeLayer(layer);
        }
      });
      
      // Add new markers for each flight
      data.states.forEach(state => {
        if (state !== null) { // add null/undefined check
          var marker = L.marker([state[6], state[5]]).addTo(mymap);
          marker.bindPopup(`<b>${state[1]}</b><br>Altitude: ${state[7]}<br>Speed: ${state[9]}<br>Heading: ${state[10]}`);
        }

        var flightDataRow = document.createElement('tr');
        flightDataRow.innerHTML = `
          <td>${state[1]}</td>
          <td>${state[2]}</td>
          <td>${state[4]}</td>
          <td>${state[7]}</td>
          <td>${state[9]}</td>
          <td>${state[10]}</td>
        `;

        document.getElementById('flight-data-body').appendChild(flightDataRow);
      });
      
      // Call the function again after 10 seconds
      setTimeout(getFlightData, 10000);
    })
    .catch(error => console.error('Error fetching flight data:', error));
}

// Call the function to start getting flight data
getFlightData();







// Google Translate function https://rapidapi.com/googlecloud/api/google-translate1/

const apiKey = '1026af66aemsh9e3509bb409a9f6p172636jsn9b110786c0c4';
const form = document.querySelector('#translate-section form');
const input = document.querySelector('#translate-input');
const select = document.querySelector('#translate-language');
const output = document.querySelector('#translation');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form submission

  const inputText = input.value;

  // Detect the language of the input text 
  const detectOptions = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: new URLSearchParams({
      q: inputText
    })
  };

  axios.request(detectOptions).then(function (response) {
    const sourceLanguage = response.data.data.detections[0][0].language;
    const targetLanguage = select.value;

    // Translate the input text to the selected language
    const translateOptions = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: new URLSearchParams({
        q: inputText,
        source: sourceLanguage,
        target: targetLanguage
      })
    };

    axios.request(translateOptions).then(function (response) {
      const translatedText = response.data.data.translations[0].translatedText;
      output.textContent = translatedText; // display translated text
    }).catch(function (error) {
      console.error('Error translating text:', error);
    });

  }).catch(function (error) {
    console.error('Error detecting language:', error);
  });
});
