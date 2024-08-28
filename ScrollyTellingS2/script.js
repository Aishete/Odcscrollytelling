function getcurrentDate(){
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString(undefined, options);

}
window.addEventListener("DOMContentLoaded", () => {
  const dateDisplay = document.getElementById("date-display");
  if (dateDisplay) {
    dateDisplay.innerHTML = getcurrentDate();
  }
});
// Create the map
const mapstyles = {
  "Streets": "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  "Satellite": "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  "Topographic": "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  "Dark": "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  "Light": "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  "No Labels": "https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json",
  "Positron": "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
}
const map = new maplibregl.Map({
  container: 'map', // The id of the div where the map will render
  style: mapstyles["Positron"], // A basic tile style for the map
  center: [104.9282, 11.5564], // Longitude and latitude of Phnom Penh
  zoom: 6.5 // Zoom level to show all of Cambodia
});

// Add the cities and display their Marker on the map
const cities = [
  { name: 'Phnom Penh', coordinates: [104.9282, 11.5564], detail: 'The capital city of Cambodia' },
  { name: 'Siem Reap', coordinates: [103.8603, 13.3616], detail: 'Siem ' },
  { name: 'Kampot', coordinates: [104.1816, 10.6343], detail: 'city' },
  { name: 'Pursat', coordinates: [103.9469, 12.5333], detail: 'city' },
  { name: 'Koh Kong', coordinates: [103.7429, 11.5654], detail: 'city' },
  { name: 'Sihanoukville', coordinates: [104.5314, 10.6097], detail: 'city' }
]

cities.forEach(city => {
  new maplibregl.Marker({
    color: 'red',
    draggable: false
  })
    .setLngLat(city.coordinates)
    .setPopup(new maplibregl.Popup({ offset: [0, -18] })
      .setHTML('<h3>' + city.name + '</h3><p>' + city.detail + '</p>'))
    .addTo(map);

});