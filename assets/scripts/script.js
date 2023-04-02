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