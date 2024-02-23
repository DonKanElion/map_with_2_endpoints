import axios from 'axios';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const BASE_URL =
  'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';

export const getAddress = debounce(async query => {
  console.log('query: ', query);
  try {
    const response = await axios.get(
      //   `${BASE_URL}?SingleLine=${query}&category=&outFields=*&forStorage=false&f=pjson`
      `${BASE_URL}?SingleLine=${query}`,
      {
        params: {
        //   singleLine: `${query}`,
        //   category: 'outFields',
          //   outFields: 'PlaceName,Type,City,Country',
            outFields: '*',

          forStorage: false,
          f: 'pjson',

          // limit: 3,
          //   country: 'ua',
          //   language: 'uk',
          //   proximity: '-73.990593,2C40.74012',
          //   types: 'address',
          //   autocomplete: 'true',
          // q: query,
          // gl: 'ua',
          // hl: 'uk',
          //   place_type: 'address',
          //   geometries: 'polyline',
        },
      }
    );
    // console.log('response DATA: ', response);
    console.log('response: CANTIDATES', response?.data?.candidates);
    return response.data.candidates;
  } catch (error) {
    console.error('There was an error while fetching places:', error);
  }
}, DEBOUNCE_DELAY);

// https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text={partialText}&f=json&token=<ACCESS_TOKEN>

// https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=Івана Павла 8 Івано-Франківськ&category=&outFields=*&forStorage=false&f=pjson
