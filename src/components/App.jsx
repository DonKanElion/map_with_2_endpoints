// import { Container } from './Container/Container';
import MapBox from './MapBox/MapBox';

export const App = () => {
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
      <MapBox />
      {/* <Container style={{ display: 'block' }}></Container> */}
    </div>
  );
};
