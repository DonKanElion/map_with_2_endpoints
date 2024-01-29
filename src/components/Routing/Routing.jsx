import { useEffect } from 'react';
import L from 'leaflet';
import { control } from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});

export default function Routing() {
  const map = useMap();
  const map1 = useMap();

  function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
  }

  //   var ReversablePlan = L.Routing.Plan.extend({
  //     createGeocoders: function () {
  //       var container = L.Routing.Plan.prototype.createGeocoders.call(this),
  //         reverseButton = createButton('↑↓', container);

  //       return container;
  //     },
  //   });

  //   class=”<pre><code language-javascript”> L.DomEvent.on(reverseButton, ‘click’, function() { var waypoints = this.getWaypoints(); this.setWaypoints(waypoints.reverse()); }, this); </code></pre>

  map.on('click', function (e) {
    var container = L.DomUtil.create('div'),
      startBtn = createButton('Start from this location', container),
      destBtn = createButton('Go to this location', container);

    L.DomEvent.on(startBtn, 'click', function () {
      control.spliceWaypoints(0, 1, e.latlng);
      map1.closePopup();
    });

    L.DomEvent.on(destBtn, 'click', function () {
      control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
      map1.closePopup();
    });

    L.popup().setContent(container).setLatLng(e.latlng).openOn(map);
  });

  //   var plan = new ReversablePlan(
  //       [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
  //       {
  //         geocoder: L.Control.Geocoder.nominatim(),
  //         routeWhileDragging: true,
  //       }
  //     ),
  //     control = L.Routing.control({
  //       routeWhileDragging: true,
  //       plan: plan,
  //     }).addTo(map1);

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
      //   geocoder: L.Control.Geocoder.nominatim(),
      routeWhileDragging: true,
      reverseWaypoints: true,
      showAlternatives: true,
      altLineOptions: {
        styles: [
          { color: 'black', opacity: 0.15, weight: 9 },
          { color: 'white', opacity: 0.8, weight: 6 },
          { color: 'blue', opacity: 0.5, weight: 2 },
        ],
      },
      //   router: L.Routing.mapbox('your-token-here'),
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}
