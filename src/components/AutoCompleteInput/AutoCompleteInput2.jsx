import { useState } from 'react';
// import { getPlaces } from 'api/fetchStreet';
import { getAddress } from 'api/fetchAddress';

import css from './AutoCompleteInput.module.css';

export default function AutoCompleteInput2({
  handleManualInputChange,
  setAddress,
  streetAndNumber,
}) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = event => {
    handleManualInputChange(event, 'streetAndNumber');
    handleInputChange(event.target.value);
  };

  const handleInputChange = async query => {
    const suggesions = await getAddress(query);
    console.log('RESP sugg: ', suggesions);
    setSuggestions(suggesions);
  };

  const handleSuggestionClick = suggestion => {
    const streetAndNumber = suggestion.address.split(',')[0];
    const latitude = suggestion.location.x;
    const longitude = suggestion.location.y;
    const place = suggestion.attributes.City;
    const region = suggestion.attributes.region;
    const postcode = suggestion.attributes.postal;
    const country = suggestion.attributes.CntryName;

    const address = {
      streetAndNumber,
      place,
      region,
      postcode,
      country,
      latitude,
      longitude,
    };
    console.log(address.longitude, address.latitude);

    setAddress(address);
    setSuggestions([]);
  };

  return (
    <div>
      <div className={css.autoCompleteInputContainer}>
        <p>Тестовий</p>
        <input
          id="address"
          type="text"
          placeholder="Address"
          value={streetAndNumber}
          onChange={handleChange}
        />
        <ul className={css.addressSuggestions}>
          {suggestions?.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={css.addressSuggestions_item}
            >
              {suggestion.address}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
