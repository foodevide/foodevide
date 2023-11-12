import styles from './card.module.css'
import { useRef } from "react";
import { motion, useInView } from "framer-motion"
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function Card({ card_data }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const router = useRouter()
    const cardVariants = {
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 100, delay: 0.2 }
        },
        hidden: { y: 60, opacity: 0, scale: 0.7 }
    };
    const MotionLink = motion(Link)
    return (
        <>
   
            <MotionLink
                href={`/${card_data.id}`}
                variants={cardVariants}
                animate={isInView ? 'visible' : 'hidden'}
                initial="hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                ref={ref}
                className={styles.card}
                style={{ background: `url(${card_data.image})` }}
            >
                <div className={styles.content1}>
                    <div className={styles.rating}>
                        <span className="material-symbols-outlined">
                        star
                    </span>
                        <p>{parseFloat(card_data.rating).toFixed(1)}</p>
                    </div>
                    <div className={styles.distance}>
                        <span>{card_data.distance_km} Km</span>
                    </div>
                </div>
                <div>
                    <h4>{card_data.name}</h4>
                    <p>{card_data.time}</p>
                </div>
            </MotionLink>

        </>
    )
}
