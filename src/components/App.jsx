import { Container } from './Container/Container';
// import { TestMap } from "./TestMap/TestMap";

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
      <Container style={{ display: 'block' }}></Container>
      {/* <TestMap></TestMap> */}
    </div>
  );
};
