import { Meow_Script } from 'next/font/google'
import styles from './header.module.css'
const meow = Meow_Script({ subsets: ['latin'], weight: ['400'] })
{/* <div>
<h1 className={`${styles.title} ${meow.className}`}>foodevide</h1>
</div> */}

export default function Header() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={meow.className}>foodevide</h1>
      <hr/>
      </section>

    </>
  )
}
