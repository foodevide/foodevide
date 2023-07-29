import styles from './card.module.css'
export default function Card({card_data}:any) {
    
  return (
    <>
            <div className={styles.card} style={{background:`url(${card_data.image})`}}>
                <div>
                    <div className={styles.rating}><span className="material-symbols-outlined">
                            star
                        </span>
                        <p>{card_data.rating}</p>
                    </div>
                    <div className={styles.distance}>
                        <span>{card_data.distance}</span>
                    </div>
                </div>
                <div>
                    <h4>{card_data.name}</h4>
                    <p>{card_data.time}</p>
                </div>
            </div>

    </>
  )
}
