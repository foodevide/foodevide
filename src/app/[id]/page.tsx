"use client";
import styles from './layout.module.css'
import Header from '../components/common/header/header'
import Hero from '../components/place/Hero/Hero'
import MiniMap from '../components/place/Actions/MiniMap'
import Reel from '../components/place/Reel/Reel'
import Menu from '../components/place/Menu/Menu'
import { fetchDetail, FoodSpot } from '@/api/api';
import { useState, useEffect } from "react";
import Link from 'next/link';
export default function Place({
  params
}: {
  params: { id: number };
}) {
  const defaultData =
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
    "reel": "",
    "distance_km": "0.09"
  }
  const [data, setData] = useState<FoodSpot | null>(null);
  useEffect(() => {
    fetchDetail(params.id)
      .then((fetchedData) => setData(fetchedData ?? defaultData))
      .catch((error) => console.error('Error fetching data:', error));
  }, [params.id]);

const location: string = data?.location || '';
const [latitude, longitude]: number[] = location.split(',').map(coord => parseFloat(coord.trim()));



  return (
    <main className={styles.main}>
      <Link href={'/'} className={styles.back}> <span className="material-symbols-outlined">
arrow_back_ios
</span></Link>
      <Header />
      {data != null ? (
        <>
          <Hero name={data.name || ''} imgURL={data.image || 'https://foodevide.pythonanywhere.com/media/default/restarant.jpg'} />
          <div className={styles.actions}>
            <MiniMap latitude={latitude} longitude={longitude} />
            <Reel reeLink={data.reel || ''} />
          </div>
          <Menu />
        </>
      )
        :
        'Fetching Data.........'}

    </main>
  )
}

