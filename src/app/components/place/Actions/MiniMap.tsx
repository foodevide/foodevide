import styles from './minimap.module.css'



export default function MiniMap({location}:{location:string}) {

    return (
        <>
           <div className={styles.map}>
                <div id="map">
                </div>
                <span>
                    <span className="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </span>
            </div>

        </>
    )
}
