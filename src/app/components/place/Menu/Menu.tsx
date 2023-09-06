import styles from './menu.module.css'

import { Lato } from 'next/font/google'
const lato = Lato({ subsets: ['latin'], weight: ['400'] })

export default function Menu() {

    return (
        <>
            <section className={styles.desc}>
                <div className={styles.menu} >
                    Show Menu <p>(coming soon)</p>
                </div>
                <p className={lato.className}>Locations are based on pin point coordinates. Places shown in your map apps amy differ. However the spot will be in exact location.</p>
                <div id="locationList"></div>

            </section>

        </>
    )
}
