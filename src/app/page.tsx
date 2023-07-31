"use client";
import Card from "./components/home/card/Card"
import placesData from "./components/data/placesData"
import styles from './layout.module.css'
import Hero from "./components/home/hero/Hero"
import { motion } from "framer-motion"
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);
  const placesDataArray = Object.values(placesData)
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
        {placesDataArray.map((item: any, index: number) => (
          <Card key={index} card_data={item} />
        ))}
      </motion.div>
    </main>
  )
}
