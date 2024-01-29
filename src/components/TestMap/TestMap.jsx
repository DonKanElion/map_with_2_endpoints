import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import Routing from 'components/Routing/Routing';
// import { LocationMarker } from 'components/LocationMarket/LocationMarket';

export const TestMap = () => {
  const position = [51.505, -0.09];

  return (
    <div
      style={{
        display: 'block',
        margin: ' 10px 100px',
      }}
    >
      <h3>КАРТА</h3>

      <MapContainer
        style={{
          display: 'block',
          height: '500px',
          width: '900px',
        }}
        width={900}
        height={500}
        center={[51.505, -0.09]}
        zoom={12}
        scrollWheelZoom={false}
        position={position}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Routing />
        {/* <LocationMarker/> */}
      </MapContainer>
    </div>
  );
};
