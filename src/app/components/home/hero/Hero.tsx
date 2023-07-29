"use client";
import { Meow_Script } from 'next/font/google'
import styles from './hero.module.css'
// import { Dropdown } from "@nextui-org/react";
import  DropdownMenuRadioGroupDemo  from '../../common/dropdown/dropdown'
import { useEffect, useState } from 'react';

const meow = Meow_Script({ subsets: ['latin'], weight: ['400'] })
interface MapboxFeature {
    id: string;
    text: string;
  }

export default function Hero() {
    const [userCity, setUserCity] = useState<string>('');
    useEffect(() => {
        // Function to get the user's location
        const getLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              position => {
                const { latitude, longitude } = position.coords;
                // Call a reverse geocoding API to get the address based on the coordinates
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibW5hYmVlbDQ0NzciLCJhIjoiY2xpZ2Uwc3EwMGVpeDNkbndmdGV1aXc1cyJ9.9SwWDVi1jwmzmapVgHwHDw`)
                  .then(response => response.json())
                  .then(data => {
                    if (data && data.features && data.features.length > 0) {
                      const city = data.features[0].context.find((context: MapboxFeature) => context.id.includes('place'));
                      setUserCity(city.text);
                    } else {
                      // Handle error or fallback to a default city
                      setUserCity('City not found');
                    }
                  })
                  .catch(error => {
                    // Handle error or fallback to a default city
                    console.error('Error fetching location:', error);
                    setUserCity('City not found');
                  });
              },
              error => {
                // Handle geolocation error or fallback to a default city
                console.error('Geolocation error:', error);
                setUserCity('City not found');
              }
            );
          } else {
            // If geolocation is not supported, handle the fallback to a default city
            setUserCity('Geolocation not supported');
          }
        };
    
        // Call the function to get the user's location
        getLocation();
      }, []);
    return (
        <>
            <section className={styles.hero}>
                <div className={meow.className}>
                    <h1>foodevide</h1>
                </div>
                <div>
                    <h3>Find The Best Places <span>Near You</span></h3>
                </div>
                <div>
                    <p>{userCity}</p>
                    <span>
                    <DropdownMenuRadioGroupDemo/>
                    </span>

                </div>
            </section>

        </>
    )
}
