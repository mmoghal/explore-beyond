let map;

// Initialize the Google Maps API
function initMap() {
  // Set up a map centered on the user's location
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      map = new google.maps.Map(document.getElementById("map-container"), {
        center: { lat: lat, lng: lng },
        zoom: 15,
      });

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