// import { TestMap } from 'components/TestMap/TestMap';

import { useState } from 'react';

export const Container = ({ distance, addCoordinates, children }) => {
  const [route, setRoute] = useState([]);

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

  const handleClick = () => {
    console.log('Distance: ', distance?.toFixed(5));
    console.log('Route: ', { ...route, distance: distance });
    const saveLocalStorage = JSON.stringify({ ...route, distance: distance });
    setDistanceInLocalStorege(saveLocalStorage);
  };

  return (
    <>
      <div style={{ display: 'block' }}>
        <form
          autoComplete="off"
          style={{ display: 'flex', flexDirection: 'column' }}
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
      {/* <TestMap></TestMap> */}
    </>
  );
};
