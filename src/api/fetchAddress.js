import axios from 'axios';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const BASE_URL =
  'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';

export const getAddress = debounce(async query => {
  try {
    const response = await axios.get(`${BASE_URL}?SingleLine=${query}`, {
      params: {
        //   outFields: 'PlaceName,Type,City,Country',
        outFields: '*',
        forStorage: false,
        f: 'pjson',
      },
    });
    return response.data.candidates;
  } catch (error) {
    console.error('There was an error while fetching places:', error);
  }
}, DEBOUNCE_DELAY);
