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
    if (response.index === 1) {
      map.flyTo({ center: [104.9282, 11.5564], zoom: 12 }); // Phnom Penh
    } else if (response.index === 2) {
      map.flyTo({ center: [103.1996, 13.0957], zoom: 12 }); // Battambang
    } else if (response.index === 3) {
      map.flyTo({ center: [103.8552, 13.3671], zoom: 12 }); // Siem Reap
    } else {
      map.flyTo({center: [104.9282, 11.5564], zoom: 7 }); // Zoom Out})
    }

  });

map.scrollZoom.disable();

const cities = [
  { name: 'Phnom Penh', coordinates: [104.9282, 11.5564], population: 2282000 },
  { name: 'Battambang', coordinates: [103.1996, 13.0957], population: 119251 },
  { name: 'Siem Reap', coordinates: [103.8552, 13.3671], population: 245494 }
];

map.on('load', function () {
  map.addSource('cities', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: cities.map(city => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: city.coordinates,
          },
          properties: {
            name: city.name,
            population: city.population
          }
        };
      })
    }
  });

  map.addLayer({
    id: 'cities-circle',
    type: 'circle',
    source: 'cities',
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['get', 'population'], 100000, 5, 1500000, 15],
      'circle-color': '#11b4da',
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 1,
      'circle-opacity': 0.8
    }
  });
});
