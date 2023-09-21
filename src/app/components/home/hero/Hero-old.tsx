// "use client";
// import { Meow_Script } from 'next/font/google'
// import styles from './hero.module.css'
// // import { Dropdown } from "@nextui-org/react";
// import  DropdownMenuRadioGroupDemo  from '../../common/dropdown/dropdown'
// import { useEffect, useState } from 'react';
// import { motion } from "framer-motion"
// const meow = Meow_Script({ subsets: ['latin'], weight: ['400'] })
// interface MapboxFeature {
//     id: string;
//     text: string;
//   }

// export default function Hero() {
//     const [userCity, setUserCity] = useState<string>('');
//     useEffect(() => {
//         // Function to get the user's location
//         const getLocation = () => {
//           if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//               position => {
//                 const { latitude, longitude } = position.coords;
//                 // Call a reverse geocoding API to get the address based on the coordinates
//                 fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibW5hYmVlbDQ0NzciLCJhIjoiY2xpZ2Uwc3EwMGVpeDNkbndmdGV1aXc1cyJ9.9SwWDVi1jwmzmapVgHwHDw`)
//                   .then(response => response.json())
//                   .then(data => {
//                     if (data && data.features && data.features.length > 0) {
//                       const city = data.features[0].context.find((context: MapboxFeature) => context.id.includes('place'));
//                       setUserCity(city.text);
//                     } else {
//                       // Handle error or fallback to a default city
//                       setUserCity('Please enable location');
//                     }
//                   })
//                   .catch(error => {
//                     // Handle error or fallback to a default city
//                     console.error('Error fetching location:', error);
//                     setUserCity('Please enable location');
//                   });
//               },
//               error => {
//                 // Handle geolocation error or fallback to a default city
//                 console.error('Geolocation error:', error);
//                 setUserCity('Please enable location');
//               }
//             );
//           } else {
//             // If geolocation is not supported, handle the fallback to a default city
//             setUserCity('Geolocation not supported');
//           }
//         };
    
//         // Call the function to get the user's location
//         getLocation();
//       }, []);
//     return (
//         <>
//             <section className={styles.hero}>
//                 <div className={meow.className}>
//                     <motion.h1
//                     viewport={{ once: true }}
//                     initial={{ y: -60 ,opacity: 0, scale: 0.5}}
//                     animate={{
//                       y: 0,
//                       opacity: 1,
//                       scale: 1,
//                       transition: { type: "spring", mass: 1.25, delay: 0.5 },
//                   }}
//                     >foodevide</motion.h1>
//                 </div>
//                 <motion.div
//                 viewport={{ once: true }}
//                 initial={{ y: -60 ,opacity: 0, scale: 0.5}}
//                 animate={{
//                   y: 0,
//                   opacity: 1,
//                   scale: 1,
//                   transition: { type: "spring", mass: 1.25, delay: 0.7 },
//               }}
//                 >
//                     <h3>Find The Best Places <span>Near You</span></h3>
//                 </motion.div>
//                 <motion.div
//                  viewport={{ once: true }}
//                  initial={{ y: -60 ,opacity: 0, scale: 0.5}}
//                  animate={{
//                    y: 0,
//                    opacity: 1,
//                    scale: 1,
//                    transition: { type: "spring", mass: 1.25, delay: 1 },
//                }}
//                 >
//                     <p>{userCity}</p>
//                     <span>
//                     <DropdownMenuRadioGroupDemo/>
//                     </span>

//                 </motion.div>
//             </section>

//         </>
//     )
// }
