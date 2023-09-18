"use client";
import { ReactNode } from "react";

import Card from "./components/home/card/Card"
import placesData from "./components/data/placesData"
import styles from './layout.module.css'
import Hero from "./components/home/hero/Hero"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react";
import { fetchData, FoodSpots } from '@/api/api';
export default function Home() {
  const [data, setData] = useState<FoodSpots[] | null>(null);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
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
    if (coordinates.latitude != 0 && coordinates.longitude != 0) {
      close()
      fetchData(coordinates.latitude, coordinates.longitude)
        .then((fetchedData) => setData(fetchedData))
        .catch((error) => console.error('Error fetching data:', error));


    } else {
      open()
    }
  }, [coordinates]);
  const ref = useRef(null);

  return (
    <main className={styles.main}>
      <AnimatePresence
        initial={false}
        // exitBeforeEnter={true}
        onExitComplete={() => null}
      >

        {modalOpen && (
          <Modal
            key="modal" // Use a unique key to ensure proper animation
            handleClose={close}
          />
        )}
      </AnimatePresence>
      {/* <div onClick={() => (modalOpen ? close() : open())}>Button</div> */}
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
interface BackdropProps {
  children: ReactNode;
  onClick: () => void;
}


const Backdrop: React.FC<BackdropProps> = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface ModalProps {
  handleClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ handleClose }) => {
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={stopPropagation}
        className="modal"
        variants={dropIn} // Assuming you have defined the `dropIn` animation
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h4>⚠️ Please enable Location ⚠️</h4>
        <ul>
          <li>Turn on location services on your Android by going to "<b>Chrome</b> &gt; <b>Settings</b> &gt; <b>Site settings</b> &gt; <b>Location</b>".</li>
          <li>If you're using an iPhone or iPad, go to your phone's "<b>Settings</b> &gt; <b>Chrome</b> &gt; <b>Location</b> &gt; <b>While using the app</b>".
          </li>
          <li>If you're using a computer, in Chrome, go to "<b>Settings</b> &gt; <b>Site settings</b> &gt; <b>Location</b> &gt; <b>Sites can ask for your location</b> ".
          </li>

        </ul>
        <div className="close-icon" onClick={handleClose}></div>
        {/* <button onClick={handleClose}>Close</button> */}
      </motion.div>
    </Backdrop>
  );
};