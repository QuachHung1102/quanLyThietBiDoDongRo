mapboxgl.accessToken = "pk.eyJ1IjoicXVhY2huZ29jaHVuZyIsImEiOiJjbThmcWpuNW4wYXRkMmpzamp4NDl0aHFhIn0.y084N37bvwPq3FlTw5aY5A";

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913],
      },
      properties: {
        title: 'Device',
        description: 'Washington, D.C.'
      }
    },
    // {
    //   type: 'Feature',
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-122.414, 37.776]
    //   },
    //   properties: {
    //     title: 'Device',
    //     description: 'San Francisco, California'
    //   }
    // }
  ]
};

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
  zoom: 18, // starting zoom
  // pitch: 45, // starting pitch (tilt) in degrees
  center: [-77.032, 38.913], // starting position [lng, lat]
  // bearing: -60, // bearing in degrees (clockwise) 
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.enable();

map.on('style.load', () => {
  map.setFog({}); // Set the default atmosphere style
});

// add markers to map
for (const feature of geojson.features) {
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
          `
            <h3>${feature.properties.title}</h3>
            <p>${feature.geometry.coordinates}</p>
          `
        )
    )
    .addTo(map);
}

// The following values can be changed to control rotation speed:

// At low zooms, complete a revolution every two minutes.
const secondsPerRevolution = 200;
// Above zoom level 5, do not rotate.
const maxSpinZoom = 5;
// Rotate at intermediate speeds between zoom levels 3 and 5.
const slowSpinZoom = 3;

let userInteracting = false;
const spinEnabled = true;

function spinGlobe() {
  const zoom = map.getZoom();
  if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
    let distancePerSecond = 360 / secondsPerRevolution;
    if (zoom > slowSpinZoom) {
      // Slow spinning at higher zooms
      const zoomDif =
        (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
      distancePerSecond *= zoomDif;
    }
    const center = map.getCenter();
    center.lng -= distancePerSecond;
    // Smoothly animate the map over one second.
    // When this animation is complete, it calls a 'moveend' event.
    map.easeTo({ center, duration: 1000, easing: (n) => n });
  }
}

map.on('mousedown', () => {
  userInteracting = true;
});
map.on('dragstart', () => {
  userInteracting = true;
});

// When animation is complete, start spinning if there is no ongoing interaction
map.on('moveend', () => {
  spinGlobe();
});

spinGlobe();