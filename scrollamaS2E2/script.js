
const scroller = scrollama();
const flourishStoryURL = "https://flo.uri.sh/story/2551498/embed#slide-"
let currentScene = 0;
scroller
  .setup({
    step: ".step",
    offset: 0.5,
    debug: true
  })
  .onStepEnter(response => {
    const scene = response.element.getAttribute('data-scene');
    document.getElementById('flourish-iframe').setAttribute('src', flourishStoryURL + scene);
    console.log(scene);

  });


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
