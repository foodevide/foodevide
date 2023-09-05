"use client";
import Card from "./components/home/card/Card"
import placesData from "./components/data/placesData"
import styles from './layout.module.css'
import Hero from "./components/home/hero/Hero"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react";
import { fetchData, FoodSpots } from '@/api/api';
export default function Home() {
  const defaultData = [
    {
      "id": 1,
      "name": "Grand Bakers",
      "image": "https://foodevide.pythonanywhere.com/media/default/restarant.jpg",
      "rating": "4.00",
      "time": "9 am–9 pm",
      "location": "11.18427809170044, 75.84360128556725",
      "categories": [
        1,
        4,
        5
      ],
      "reel": "https://n48331.github.io/",
      "distance_km": "0.09"
    }
  ]
  const [data, setData] = useState<FoodSpots[] | null>(null);
  const [coordinates, setCoordinates] = useState({ latitude:1.1, longitude:1.1 });
  useEffect(() => {
    if ('geolocation' in navigator) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setCoordinates({ latitude, longitude });

        },
        (error) => {
          console.error('Error getting coordinates:', error);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
    }
  }, []);
  useEffect(() => {
    fetchData(coordinates.latitude, coordinates.longitude)
      .then((fetchedData) => setData(fetchedData ?? defaultData))
      .catch((error) => console.error('Error fetching data:', error));
  }, [coordinates]);
  const ref = useRef(null);

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
        {data?.length == 0 ? "No Foodspots near you" :
          data?.map((item: any, index: number) => (
            <Card key={index} card_data={item} />
          ))}

      </motion.div>
    </main>
  )
}
