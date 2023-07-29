import Hero from '../hero/Hero'
import styles from './layout.module.css'
import placesData from '../../data/placesData'
import Cards from '../card/Card'



export default function HomeLayout() {
  
  return (
    <main className={styles.main}>
      <Hero />
      <div className={styles.cards}>
        {placesData.map((item:any,index:number)=>(
        <Cards key={index} card_data={item} />
        ))}
      </div>
    </main>
  )
}
