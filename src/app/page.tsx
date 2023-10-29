"use client";
import { ReactNode } from "react";

import Card from "./components/home/card/Card"

import styles from './layout.module.css'
import Hero from "./components/home/hero/Hero"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react";
import { fetchData, FoodSpots } from '@/api/api';


export default function Home() {
  const categories=[
    'All',
    'Break Fast',
    'Lunch',
    'Dinner',
    'Snacks'
  ]
  const [data, setData] = useState<FoodSpots[] | null>(null);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState<boolean | null>(null);
  const [category, setCategory] = useState<string>('All');
  
  const updateCood = (newCount:any) => {
    setCoordinates(newCount);
  };
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  const updateCategory = (cat:string) => {
   
    setCategory(cat)
    
  }

  useEffect(() => {
    if ('geolocation' in navigator) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
          setLocationEnabled(true);
        },
        (error) => {
          console.error('Error getting coordinates:', error);
          setLocationEnabled(false);
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
      setLocationEnabled(false);
    }

  }, []);
  const handleRetry = () => {
    // Clear the previous location status
    setLocationEnabled(null);
  
    if ('geolocation' in navigator) {
      // Try to get the user's location again
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Location is enabled after retry
          setLocationEnabled(true);
        },
        (error) => {
          // Location is still not enabled or was denied by the user
          setLocationEnabled(false);
          // You can also check the error object for more details
          console.error('Error getting location:', error);
        }
      );
    } else {
      // Geolocation is not supported in this browser
      setLocationEnabled(false);
      console.error('Geolocation is not supported in this browser.');
    }
  };
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

  // const [coordinates, setCoordinates] = useState([12.345, 67.890]);
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
            handleRetry={handleRetry}
          />
        )}
      </AnimatePresence>
      {/* <div onClick={() => (modalOpen ? close() : open())}>Button</div> */}
      <Hero updateCood={updateCood} updateCategory={updateCategory}/>
      {/* {locationEnabled === true && <p>Location is enabled.</p>} */}
      {locationEnabled === false && (
        <div>
          <p>Location is not enabled.</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}
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
          data
          ?.filter((item) => categories.indexOf(category) === 0 || item.categories.includes(categories.indexOf(category)))
          .map((item: any, index: number) => (
            <Card key={index} card_data={item} categories={item.categories}/>
            
          ))}


      </motion.div>
   

      <div className={styles.footer__copy}>
        <span>©&nbsp;</span>
        <span>{new Date().getFullYear()}&nbsp;</span>
        <span>All Rights Reserved. Design &amp; Coded with ❤️️</span>
      </div>
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
  handleRetry: () => void;
}

const Modal: React.FC<ModalProps> = ({ handleClose,handleRetry }) => {
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
        <h4>⚠️ Please enable Location or Select location ⚠️</h4>
        <p>Tap below to retry or close this window and choose prefered location. If retry didn&apos;t work go to site setting and enable it.</p>
        <button onClick={handleRetry}>Retry</button>
        <div className="close-icon" onClick={handleClose}></div>

        {/* <button onClick={handleClose}>Close</button> */}
      </motion.div>
    </Backdrop>
  );
};