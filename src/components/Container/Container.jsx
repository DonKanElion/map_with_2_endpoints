import { TestMap } from 'components/TestMap/TestMap';

export const Container = () => {
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
        <p>Distance: 100 km</p>
        <button>Save distance</button>
      </div>

      <TestMap></TestMap>
    </>
  );
};
