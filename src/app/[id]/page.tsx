import styles from './layout.module.css'
import Header from '../components/common/header/header'
import Hero from '../components/place/Hero/Hero'
import MiniMap from '../components/place/Actions/MiniMap'
import Reel from '../components/place/Reel/Reel'
import Menu from '../components/place/Menu/Menu'
import placesData from '../components/data/placesData'

export default function Place({
  params,
}: {
  params: { id:number };
}) {


  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <div className={styles.actions}>
        <MiniMap />
        <Reel />
      </div>
      <Menu />

    </main>
  )
}
