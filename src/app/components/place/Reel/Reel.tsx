import styles from './reel.module.css'



export default function Reel({reeLink}:{reeLink:string}) {

    return (
        <>
        <a className={styles.reel} href={reeLink} target="_blank" rel="noopener noreferrer">


                <img src="/images/common/reel.png" alt="reel"/>
                <h3>Watch Reel</h3>

        </a>

        </>
    )
}
