import { lazy, Suspense } from 'react';

const MapContainer = lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })));
const Marker = lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));
const Popup = lazy(() => import('react-leaflet').then(module => ({ default: module.Popup })));

interface LazyMapProps {
  lat: number;
  lng: number;
  locationName: string;
}

export function LazyMap({ lat, lng, locationName }: LazyMapProps) {
  return (
    <Suspense fallback={
      <div className="h-[300px] w-full border-2 border-ink flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    }>
      <div className="h-[300px] w-full border-2 border-ink mb-4 relative z-0">
        <MapContainer 
          center={[lat, lng]} 
          zoom={16} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]}>
            <Popup>
              {locationName}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </Suspense>
  );
}
