import styles from './minimap.module.css'
import mapboxgl, { Map, Marker, LngLatLike } from 'mapbox-gl';
import { useEffect, useState } from 'react';
interface MapProps {
    latitude: number;
    longitude: number;
}
mapboxgl.accessToken = 'pk.eyJ1IjoibW5hYmVlbDQ0NzciLCJhIjoiY2xpZ2Uwc3EwMGVpeDNkbndmdGV1aXc1cyJ9.9SwWDVi1jwmzmapVgHwHDw';
const MiniMap: React.FC<MapProps> = ({ latitude, longitude }) => {
    useEffect(() => {
        if (location) {

            if (!isNaN(longitude) && !isNaN(latitude)) {
                const map: Map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [longitude, latitude],
                    zoom: 15,
                });

                new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
            } else {
                console.error('Invalid location format:', location);
            }
        }
    }, [location]);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    console.log(navigator.userAgent);
    
    const mapUrl = isIOS
    ? `maps://maps?q=${latitude},${longitude}`
    : `https://maps.google.com/maps?q=${latitude},${longitude}`;
    const openMap = () => {
        if (isIOS) {
            window.open(mapUrl, '_blank');
          } else {
            window.open(mapUrl, '_blank', 'noopener noreferrer');
          }
      };

    return (
        <>
            <div className={styles.map}>
                <div id="map">
                </div>
                <span onClick={openMap} style={{ cursor: 'pointer' }}>

                    <span className="material-symbols-outlined">
                        arrow_forward_ios
                    </span>

                </span>
            </div>

        </>
    )
}
export default MiniMap;