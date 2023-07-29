import Card from "./components/home/card/Card"
import placesData from "./components/data/placesData"
import styles from './layout.module.css'
import Hero from "./components/home/hero/Hero"
import Link from "next/link"

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <div className={styles.cards}>
        {placesData.map((item: any, index: number) => (
        <Link key={index} href={`/${item.id}`}>
            <Card card_data={item} />
      </Link>
            
            ))}
            </div>
    </main>
  )
}
