// import { TestMap } from 'components/TestMap/TestMap';

import { useEffect } from 'react';

export const Container = ({ distance = '0km', children }) => {
  function setDistanceInLocalStorege(data) {
    localStorage.setItem('distance', data);
  }

  useEffect(() => {
    setDistanceInLocalStorege(distance);
  }, [distance]);

  return (
    <>
      <div style={{ display: 'block' }}>
        <form action="" style={{ display: 'flex', flexDirection: 'column' }}>
          <label>
            Origin
            <input type="text" />
          </label>
          <label>
            Destination
            <input type="text" />
          </label>

          <button>Submit</button>
        </form>
      </div>

      <div>
        <p>Distance: {distance}</p>
        <button>Save distance</button>
      </div>
      {children}
      {/* <TestMap></TestMap> */}
    </>
  );
};
