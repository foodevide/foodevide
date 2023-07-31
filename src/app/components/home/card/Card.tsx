import styles from './card.module.css'
import { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useEffect } from "react";

export default function Card({ card_data }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const cardVariants = {
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 100, delay: 0.2 }
        },
        hidden: { y: 60, opacity: 0, scale: 0.7 }
    };
    return (
        <>
            <motion.div
             variants={cardVariants}
             animate={isInView ? 'visible' : 'hidden'}
             initial="hidden"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.9 }}
                ref={ref}
                className={styles.card}
                style={{ background: `url(${card_data.image})` }}
            >
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
            </motion.div>

        </>
    )
}
