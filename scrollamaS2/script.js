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
  container: 'map',
  style: mapstyles["Positron"],
  center: [104.9282, 11.5564],
  zoom: 7,
  pitch: 40,
  // bearing: -15
});

const scroller = scrollama();

scroller
  .setup({
    step: ".step",
    offset: 0.5,
    debug: false
  })
  .onStepEnter((response) => {
    const scene = response.element.getAttribute("data-scene");
    const yearStart = +response.element.getAttribute("year-start");
    const yearEnd = +response.element.getAttribute("year-end");
    let filter = ['all'];

    filter.push(['all', ['>=', 'year', yearStart],['<=', 'year', yearEnd]]);
    console.log(yearStart, yearEnd);

    map.setFilter('sez-layer', filter);

  });
map.scrollZoom.disable();

const cities = [
  { name: 'Phnom Penh', coordinates: [104.9282, 11.5564], population: 2282000 },
  { name: 'Battambang', coordinates: [103.1996, 13.0957], population: 119251 },
  { name: 'Siem Reap', coordinates: [103.8552, 13.3671], population: 245494 }
];

map.on('load', function () {
  map.addSource('sez', {
    type: 'geojson',
    data: './cambodia-sez-with-year.json'
  });
  map.scrollZoom.disable();
  map.addLayer({
    id: 'sez-layer',
    type: 'circle',
    source: 'sez',
    paint: {
      'circle-radius': 5,
      'circle-color': '#11b4da',
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 1,
      'circle-opacity': 0.8
    }
  });
});
