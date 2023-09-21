"use client";
import { Meow_Script } from 'next/font/google'
import styles from './hero.module.css'
// import { Dropdown } from "@nextui-org/react";
import DropdownMenuRadioGroupDemo from '../../common/dropdown/dropdown'
import axios from 'axios';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui-components/ui/sheet"
import { Button } from "@/ui-components/ui/button"
import { Input } from '@/ui-components/ui/input';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import Select from 'react-select';
import { FaMagnifyingGlassLocation } from 'react-icons/fa6';

const meow = Meow_Script({ subsets: ['latin'], weight: ['400'] })
interface Props {
  updateCood: (newCount: any) => void;
}
interface MapboxFeature {
  id: string;
  text: string;
}
const acces_token = 'pk.eyJ1IjoibW5hYmVlbDQ0NzciLCJhIjoiY2xpZ2Uwc3EwMGVpeDNkbndmdGV1aXc1cyJ9.9SwWDVi1jwmzmapVgHwHDw'
export default function Hero({ updateCood  }: Props) {
  const [userCity, setUserCity] = useState<string>('');
  useEffect(() => {
    // Function to get the user's location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            // Call a reverse geocoding API to get the address based on the coordinates
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${acces_token}`)
              .then(response => response.json())
              .then(data => {
                if (data && data.features && data.features.length > 0) {
                  const city = data.features[0].context.find((context: MapboxFeature) => context.id.includes('place'));
                  setUserCity(city.text);
                } else {
                  // Handle error or fallback to a default city
                  setUserCity('Please enable location');
                }
              })
              .catch(error => {
                // Handle error or fallback to a default city
                console.error('Error fetching location:', error);
                setUserCity('Please enable location');
              });
          },
          error => {
            // Handle geolocation error or fallback to a default city
            console.error('Geolocation error:', error);
            setUserCity('Please enable/select location');
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
  const [inputValue, setInputValue] = useState<string>(userCity);
  const [options, setOptions] = useState<{ value: string; label: string; coordinates: number[] }[]>([]);
  useEffect(() => {
    // Fetch location data when the input value changes
    if (inputValue) {
      fetchLocations(inputValue).then((locations) => setOptions(locations));
    } else {
      // Clear options if the input is empty
      setOptions([]);
    }
  }, [inputValue]);

  const handleOptionChange = (selectedOption: any) => {
    // Handle the selected option and its coordinates
    if (selectedOption) {
      setUserCity(selectedOption.label)
  console.log(selectedOption.coordinates);
  updateCood({ latitude: selectedOption.coordinates[1], longitude: selectedOption.coordinates[0] })
     
    }
  };

  return (
    <>

      <section className={styles.hero}>
        <div className={meow.className}>
          <motion.h1
            viewport={{ once: true }}
            initial={{ y: -60, opacity: 0, scale: 0.5 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              transition: { type: "spring", mass: 1.25, delay: 0.5 },
            }}
          >foodevide</motion.h1>
        </div>
        <motion.div
          viewport={{ once: true }}
          initial={{ y: -60, opacity: 0, scale: 0.5 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", mass: 1.25, delay: 0.7 },
          }}
        >
          <h3>Find The Best Places <span>Near You</span></h3>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial={{ y: -60, opacity: 0, scale: 0.5 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", mass: 1.25, delay: 1 },
          }}
        > <Sheet>
            <SheetTrigger asChild>
              <Button style={{ fontWeight: 700 ,margin:0,padding:0}}> <p className={styles.location}><FaMagnifyingGlassLocation/> {userCity}</p></Button>
            </SheetTrigger>
            <SheetContent side={'top'}>
              <SheetHeader>
                <SheetTitle>Edit Location</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </SheetDescription>
              </SheetHeader>
   <div>


                  {/* <Input id="name" placeholder={userCity} className="col-span-3" /> */}
                  <br />
                  <Select
      options={options}
      placeholder={userCity}
      value={null} // Clear selected value when options change
      onInputChange={(newValue) => setInputValue(newValue)}
      onChange={handleOptionChange}
    />

      </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Set Location</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <span>
            <DropdownMenuRadioGroupDemo />
          </span>

        </motion.div>
      </section>
      {/* <EditLocation topbar={topbar}/> */}
    </>
  )
}


async function fetchLocations(input: string) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${acces_token}&bbox=68.11617,6.75449,97.40256,35.67459`
    );

    // Extract relevant location data and coordinates from the response
    const locations = response.data.features.map((feature: any) => ({
      value: feature.place_name,
      label: feature.place_name,
      coordinates: feature.geometry.coordinates, // Extract coordinates
    }));

    return locations;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}