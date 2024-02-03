// // Create a new marker, set the longitude and latitude, and add it to the map.
// new mapboxgl.Marker()
//     .setLngLat([-65.017, -16.457])
//     .addTo(map);

// // Create a new marker, set the longitude and latitude, and add it to the map.
// new mapboxgl.Marker()
// .setLngLat([-65.017, -16.457])
// .addTo(map);

// Киїів Одесса
//  A:  (2) [30.524153, 50.450024]
//  B:  (2) [30.732607, 46.484282]

// map.on('load',  function() {
//     directions.setOrigin([12, 23]); // can be address in form setOrigin("12, Elm Street, NY")
//     directions.setDestinaion([11, 22]); // can be address
// })

// mapbox-directions-route-summary

// distance

// if (map) {
//     map.on('click', e => {
//       console.log('{onclick} focus:');
//     });
//   }
//   return () => {
//     //unsubcribe here.
//     map.off('click', e => {
//       console.log('clickkkkkk');
//     });
//   };

// Initialize the GeolocateControl.
// const geolocate = new mapboxgl.GeolocateControl({
//     positionOptions: {
//       enableHighAccuracy: true,
//     },
//     trackUserLocation: true,
//   });
//   // Add the control to the map.
//   map.addControl(geolocate);
//   // Set an event listener that fires
//   // when a trackuserlocationstart event occurs.
//   geolocate.on('trackuserlocationstart', () => {
//     console.log('A trackuserlocationstart event has occurred.');
//   });
//   geolocate.on('error', () => {
//     console.log('An error event has occurred.');
//   });

// and

// current location
// map.addControl(
//     new mapboxgl.GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true,
//       },
//       trackUserLocation: true,
//       showUserHeading: false,
//     })
//   );
