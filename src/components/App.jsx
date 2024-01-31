import { useState } from 'react';
import { Container } from './Container/Container';
import MapBox from './MapBox/MapBox';

export const App = () => {
  const [distance, setDistance] = useState('');

  function changeDistance(data) {
    setDistance(data);
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
        fontSize: 28,
        color: '#010101',
      }}
    >
      <Container style={{ display: 'block' }} distance={distance}>
        <MapBox changeDistance={changeDistance} />
      </Container>
    </div>
  );
};
