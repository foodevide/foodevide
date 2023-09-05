import styles from './minimap.module.css'
import mapboxgl, { Map, Marker, LngLatLike } from 'mapbox-gl';
import { useEffect ,useState} from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibW5hYmVlbDQ0NzciLCJhIjoiY2xpZ2Uwc3EwMGVpeDNkbndmdGV1aXc1cyJ9.9SwWDVi1jwmzmapVgHwHDw';
export default function MiniMap({ location }: { location: string }) {

    
    useEffect(() => {
        if (location) {
          const [longitude, latitude] = location?.split(',').map((coord) => parseFloat(coord.trim()));
          if (!isNaN(longitude) && !isNaN(latitude)) {
            const map: Map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11', // Use your preferred map style
              center: [longitude, latitude], // Use 'location' prop as the center
              zoom: 1, // Set the initial zoom level
            });
    
            // Add a marker at the 'location' prop coordinates
            new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
          } else {
            console.error('Invalid location format:', location);
          }
        }
      }, [location]);
      


    return (
        <>
            <div className={styles.map}>
                <div id="map">
                </div>
                <span>
                    <span className="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </span>
            </div>

        </>
    )
}
