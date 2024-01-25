import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const TestMap = () => {
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
          width: '700px',
        }}
        width={700}
        height={500}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
