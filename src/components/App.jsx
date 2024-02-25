import { useState } from 'react';
import { createPortal } from 'react-dom';

// import { Container } from './Container/Container'; // mapBox search
import { ContainerLeaflet } from './Container/ContainerLeaflet';
import MapBox from './MapBox/MapBox';
import { ModalWindow } from './ModalWindow/ModalWindow';

export const App = () => {
  const [newCoordinates, setNewCoordinates] = useState({});
  const [distance, setDistance] = useState(null);
  const [onOpenMap, setOnOpenMap] = useState(false);

  const [address, setAddress] = useState({
    streetAndNumber: '',
    place: '',
    subregion: '',
    region: '',
    postcode: '',
    country: '',
    latitude: '',
    longitude: '',
  });

  // const updateCoordinates = (latitude, longitude) => {
  //   console.log('updateCoordinates: ', latitude, longitude);
  //   setAddress({ ...address, latitude, longitude });
  // };

  function changeDistance(data) {
    const metersToKilometersConversion = data / 1000;
    setDistance(metersToKilometersConversion);
  }

  function addCoordinates(data) {
    setNewCoordinates(data);
  }

  return (
    <div
      style={{
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
      <ContainerLeaflet
        style={{ display: 'block' }}
        distance={distance}
        addCoordinates={addCoordinates}
        // onSubmit={handleFormSubmit}
        changeDistance={changeDistance}
        address={address}
        setAddress={setAddress}
      >
        {/* {onOpenMap ? (
          <MapBox
            changeDistance={changeDistance}
            coordinates={newCoordinates}
            // updateCoordinates={updateCoordinates}
          />
        ) : null}

        <button onClick={() => setOnOpenMap(!onOpenMap)}>Open map</button> */}
      </ContainerLeaflet>

      <button type="button" onClick={() => setOnOpenMap(!onOpenMap)}>
        Open MODAL
      </button>

      {onOpenMap &&
        createPortal(
          <ModalWindow>
            <h1>Hello world!!!</h1>
            <button type="button" onClick={() => setOnOpenMap(!onOpenMap)}>
              Close
            </button>

            <MapBox
              changeDistance={changeDistance}
              coordinates={newCoordinates}
              // updateCoordinates={updateCoordinates}
            />
          </ModalWindow>,
          document.body
        )}

      {/* <Container
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
      </Container> */}
    </div>
  );
};
