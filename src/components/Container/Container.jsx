import { useState } from 'react';

// import { getPlaces } from 'api/fetchStreet';
import { getAddress } from 'api/fetchAddress';
import AutoCompleteInput from 'components/AutoCompleteInput/AutoCompleteInput';
import AutoCompleteInput2 from 'components/AutoCompleteInput/AutoCompleteInput2';

export const Container = ({
  address,
  distance,
  addCoordinates,
  setAddress,
  children,
}) => {
  const [route, setRoute] = useState([]);
  const [endpoint1, setEndpoint1] = useState('');
  const [endpoint2, setEndpoint2] = useState('');

  function setDistanceInLocalStorege(data) {
    localStorage.setItem('route', data);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    const coordinates = {
      origin: form.elements.origin.value,
      destination: form.elements.destination.value,
    };
    setRoute(coordinates);
    addCoordinates(coordinates);
    form.reset();
  };

  const handleManualInputChange = (event, stateProperty) => {
    const newAddress = { ...address };
    newAddress[stateProperty] = event.target.value;

    setAddress(newAddress);
  };

  const onSearch = value => {
    const address = value.trim();

    if (address !== '' && address.length < 3) {
      console.log('промах: ', address.length, address);
      return;
    }

    // getPlaces(address)
    getAddress(address)
      .then(data => {
        console.log('DATA: ', data);

        // if (data.length > 2 && data.length <= 9) {
        //   // refs.countryInfo.innerHTML = '';
        //   // return renderCountryList(data);
        //   return console.log('RENRED street list');
        // }
        // refs.countryList.innerHTML = ''
        // else console.log('Щось там десь');
        // renderCountryInfo(data);
        return console.log('RENDER info...');
      })
      .catch(error => {
        console.error('Oops, there is no country with that name', error);
      });
  };

  const handleChange = evt => {
    const { name, value } = evt.target;

    switch (name) {
      case 'endpoint1':
        setEndpoint1(value);
        onSearch(value);
        return;
      case 'endpoint2':
        setEndpoint2(value);
        onSearch(value);
        return;
      default:
        throw new Error(`Unsupported type of ${name}`);
    }
  };

  const handleSubmit2 = e => {
    e.preventDefault();
    const form = e.currentTarget;

    const { endpoint1, endpoint2 } = form;

    console.log('form: ', endpoint1.value, endpoint2.value);
  };

  const handleClick = () => {
    console.log('Distance: ', distance?.toFixed(5));
    console.log('Route: ', { ...route, distance: distance });
    const saveLocalStorage = JSON.stringify({ ...route, distance: distance });
    setDistanceInLocalStorege(saveLocalStorage);
  };

  return (
    <>
      <div style={{ display: 'block' }}>
        <AutoCompleteInput
          handleManualInputChange={handleManualInputChange}
          setAddress={setAddress}
        />

        <p>TESTING 2</p>
        <AutoCompleteInput2
          handleManualInputChange={handleManualInputChange}
          setAddress={setAddress}
        />

        <form
          autoComplete="off"
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '30px',
            outline: '2px solid tomato',
            padding: '10px',
          }}
          onSubmit={handleSubmit2}
        >
          SearchStreet
          <label>
            Адрес 1
            <input
              type="text"
              name="endpoint1"
              value={endpoint1}
              onChange={handleChange}
            />
            <ul class="country-list"></ul>
          </label>
          <label>
            Адрес 2
            <input
              type="text"
              name="endpoint2"
              value={endpoint2}
              onChange={handleChange}
            />
            <ul class="country-list"></ul>
          </label>
          <button type="submit">Submit</button>
        </form>

        <form
          autoComplete="off"
          style={{
            display: 'flex',
            flexDirection: 'column',
            outline: '2px solid teal',
            padding: '10px',
          }}
          onSubmit={handleSubmit}
        >
          <label>
            Origin
            <input type="text" name="origin" />
          </label>
          <label>
            Destination
            <input type="text" name="destination" />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <p>
          Distance: {distance} {distance ? 'km' : ''}
        </p>
        <button type="button" onClick={handleClick}>
          Save distance
        </button>
      </div>
      {children}
    </>
  );
};
