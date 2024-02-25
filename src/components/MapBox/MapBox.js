import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken =
  // 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg';
  'pk.eyJ1IjoiZG9ua2FuZWxpb24iLCJhIjoiY2xyemI3NG9vMXVleTJrbXh4ZTJ2dTU1OSJ9.GhotX4S_qU8d3_5kwAs9gg'; // Palienko token

// pk.eyJ1Ijoic2tvcmFzYXVydXMiLCJhIjoiY2s5dmRjbnZpMDVlZzNlcjN3MHowYzVrbSJ9.AcSdcVS034Hhl0RhBHoC2A

const MapBox = ({ coordinates, changeDistance }) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(30.5241);
  const [lat, setLat] = useState(50.45);
  const [zoom, setZoom] = useState(9);

  const [mapOrigin, setMapOrigin] = useState([]);
  const [mapDestination, setMapDestination] = useState([]);
  const [distance, setDistance] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      //   attributionControl: true,
      language: 'uk-UA',
      geometries: 'polyline6',
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Directions
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/walking',
      alternatives: false,
      language: 'uk-UA',
      controls: false,
      interactive: false,
      flyTo: false,
      // autocomplete: true,

      //   geometries: false,
      //   controls: { instructions: true },
    });

    map.addControl(directions, 'top-left');

    // ✅ SET coordinates
    map.on('load', function () {
      const { origin, destination } = coordinates;

      // if (Object.keys(coordinates).length !== 0) {
      if (origin && destination) {
        directions.setOrigin(origin);
        directions.setDestination(destination);
        setMapOrigin(origin);
        setMapDestination(destination);
        return;
      }
    });

    // ✅ GET coordinates
    if (!mapOrigin && !mapDestination) {
      map.on('load', function () {
        const getOrigin = directions.getOrigin();
        const getDestination = directions.getDestination();

        console.log('getOrigin A: ', getOrigin?.geometry?.coordinates);
        if (mapOrigin !== getOrigin?.geometry?.coordinates)
          setMapOrigin(getOrigin.geometry.coordinates);

        console.log(
          'getDestination B: ',
          getDestination?.geometry?.coordinates
        );
        if (mapDestination !== getDestination?.geometry?.coordinates)
          setMapDestination(getDestination.geometry.coordinates);
        return;
      });
    }

    // ✅ Distance
    // Docs for route event is here:
    // https://github.com/mapbox/mapbox-gl-directions/blob/master/API.md#on`enter code here`
    directions.on('route', e => {
      // routes is an array of route objects as documented here:
      // Each route object has a distance property

      // setDistance(e.route[0].distance);
      // changeDistance(distance);

      // Chat GPT
      if (e.route && e.route[0] && e.route[0].distance) {
        const routeDistance = e.route[0].distance;
        setDistance(routeDistance);
        changeDistance(routeDistance);
      }
    });

    // Clean up on unmount
    return () => map.remove();
  }, [coordinates, distance]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Distance: {distance ? distance / 1000 : ''} {distance ? 'km' : ''}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default MapBox;
