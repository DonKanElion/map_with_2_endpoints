import { useState } from 'react';
import { Container } from './Container/Container';
import MapBox from './MapBox/MapBox';

export const App = () => {
  const [newCoordinates, setNewCoordinates] = useState({});
  const [distance, setDistance] = useState(null);
  const [onOpenMap, setOnOpenMap] = useState(false);

  const [address, setAddress] = useState({
    streetAndNumber: '',
    place: '',
    region: '',
    postcode: '',
    country: '',
    latitude: '',
    longitude: '',
  });

  const updateCoordinates = (latitude, longitude) => {
    console.log('updateCoordinates: ', latitude, longitude);
    setAddress({ ...address, latitude, longitude });
  };

  function changeDistance(data) {
    setDistance(data);
  }

  function addCoordinates(data) {
    setNewCoordinates(data);
  }

  return (
    <div
      style={{
        // height: '100vh',
        marginTop: '40px',
        padding: '0 30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 24,
        color: '#010101',
      }}
    >
      <Container
        style={{ display: 'block' }}
        distance={distance}
        addCoordinates={addCoordinates}
        // onSubmit={handleFormSubmit}
        address={address}
        setAddress={setAddress}
      >
        {onOpenMap ? (
          <MapBox
            changeDistance={changeDistance}
            coordinates={newCoordinates}
            updateCoordinates={updateCoordinates}
          />
        ) : null}

        <button onClick={() => setOnOpenMap(!onOpenMap)}>Open map</button>
      </Container>
    </div>
  );
};
