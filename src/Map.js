import React from 'react'
import {MapContainer,TileLayer} from 'react-leaflet';
import "./Map.css";
function Map() {
    return (
        <div className="map">
            <MapContainer center={[51.0505,-0.09]} zoom={3} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>

            
        </div>
    )
}

export default Map
