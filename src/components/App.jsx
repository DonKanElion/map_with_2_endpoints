import { useState } from 'react';
import { Container } from './Container/Container';
import MapBox from './MapBox/MapBox';

export const App = () => {
  const [newCoordinates, setNewCoordinates] = useState({});
  const [distance, setDistance] = useState(null);

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
      >
        <MapBox changeDistance={changeDistance} coordinates={newCoordinates} />
      </Container>
    </div>
  );
};
