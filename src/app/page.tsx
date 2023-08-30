"use client";
import Card from "./components/home/card/Card"
import placesData from "./components/data/placesData"
import styles from './layout.module.css'
import Hero from "./components/home/hero/Hero"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react";
import { fetchData, FoodItem } from '@/api/api';
export default function Home() {
  const [data, setData] = useState<FoodItem[] | null>(null);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude,longitude);
          setCoordinates({ latitude, longitude });
          fetchData(coordinates.latitude, coordinates.longitude)
            .then((fetchedData) => setData(fetchedData))
            .catch((error) => console.error('Error fetching data:', error));
            
        },
        (error) => {
          console.error('Error getting coordinates:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, []);

  const ref = useRef(null);
  console.log(data);
  
  return (
    <main className={styles.main}>
      <Hero />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 1,
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 20,
            stiffness: 100,
            restDelta: 0.001
          }
        }}
        className={styles.cards}>
        {data?.length == 0 ?
          `No Foodspots near you, Current location: ${coordinates.latitude}, ${coordinates.longitude}.`
          :
          data?.map((item: any, index: number) => (
            <Card key={index} card_data={item} />
          ))
        }
      </motion.div>
    </main>
  )
}
