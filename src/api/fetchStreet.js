import axios from 'axios';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const accessToken =
  'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg';
// 'pk.eyJ1IjoiZG9ua2FuZWxpb24iLCJhIjoiY2xyemI3NG9vMXVleTJrbXh4ZTJ2dTU1OSJ9.GhotX4S_qU8d3_5kwAs9gg'; // Palienko token

export const getPlaces = debounce(async query => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: accessToken,
          country: 'ua',
          language: 'uk',
          proximity: '-73.990593,2C40.74012',
          types: 'address',
          autocomplete: 'true',
          place_type: 'address',
          geometries: 'polyline',
        },
      }
    );
    console.log('response: FEATURES', response?.data?.features);
    return response.data.features;
  } catch (error) {
    console.error('There was an error while fetching places:', error);
  }
}, DEBOUNCE_DELAY);
