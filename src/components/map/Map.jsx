import React from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import { gpxPoints } from '../../points'
import './Map.css'
import { centroid } from './MapService'


export default function App() {
  const limeOptions = { color: 'lime' }
  const mapCenter = centroid(gpxPoints)

  return (
    <MapContainer center={mapCenter} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline pathOptions={limeOptions} positions={gpxPoints} />
    </MapContainer>
  )
}
