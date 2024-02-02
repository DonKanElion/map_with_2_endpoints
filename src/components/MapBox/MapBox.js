import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
// import geoJson from './chicago-parks.json';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZG9ua2FuZWxpb24iLCJhIjoiY2xyemI3NG9vMXVleTJrbXh4ZTJ2dTU1OSJ9.GhotX4S_qU8d3_5kwAs9gg';

const MapBox = ({ changeDistance }) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(30.5241);
  const [lat, setLat] = useState(50.45);
  const [zoom, setZoom] = useState(9);

  const [newDistance, setNewDistance] = useState('');

  const distance = document.getElementsByClassName(
    'mapbox-directions-route-summary'
  );

  useEffect(() => {
    if (
      newDistance !== '' ||
      newDistance !== distance[0]?.children[2]?.innerText
    )
      changeDistance(newDistance);

    return;
  }, [newDistance]);

  if (distance[0]?.children[2]?.innerText !== newDistance)
    setNewDistance(distance[0]?.children[2]?.innerText);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      //   attributionControl: true,
      language: 'uk-UA',
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // current location
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: false,
      })
    );

    // Initialize the GeolocateControl.
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    // Add the control to the map.
    map.addControl(geolocate);
    // Set an event listener that fires
    // when a trackuserlocationstart event occurs.
    geolocate.on('trackuserlocationstart', () => {
      console.log('A trackuserlocationstart event has occurred.');
    });
    geolocate.on('error', () => {
      console.log('An error event has occurred.');
    });

    // Directions

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      alternatives: true,
      //   interactive: false,
      //   controls: false,
      geometries: false,
      controls: { instructions: true },
      flyTo: false,
      interactive: false,
      language: 'uk-UA',
    });

    map.addControl(directions, 'top-left');

    // ✅ SET coordinates A and B
    map.on('load', function () {
      const start = [30.524153, 50.450024];
      //   const startT = 'Дніпро';
      const end = [30.732607, 46.484282];
      //   const endT = 'Львів';

      directions.setOrigin(start); // can be address in form setOrigin("12, Elm Street, NY")
      directions.setDestination(end); // can be address
    });

    // ✅ GET coordinates
    map.on('load', function () {
      const getOrigin = directions.getOrigin();
      const getDestination = directions.getDestination();

      console.log('getOrigin A: ', getOrigin.geometry.coordinates);
      console.log('getDestination B: ', getDestination.geometry.coordinates);

      const getWaypoints = directions.getWaypoints();

      console.log('waypoint: ', getWaypoints);
    });

    map.on('load', function () {
      const getWaypoints = directions.getWaypoints();

      console.log('waypoint: ', getWaypoints);
    });

    if (map) {
      map.on('click', e => {
        console.log('{onclick} focus:');
      });
    }
    return () => {
      //unsubcribe here.
      map.off('click', e => {
        console.log('clickkkkkk');
      });
    };

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {/* <div className="sidebarStyle">
        <div>
          TEST Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div> */}
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default MapBox;
