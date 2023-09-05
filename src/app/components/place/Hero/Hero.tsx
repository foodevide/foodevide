import styles from './hero.module.css'
import { useEffect, useState } from 'react';
import React from 'react';
interface HeroProps {
    imgURL: string;
    name: string;
  }
const Hero:React.FC<HeroProps> = ({ imgURL, name }) => {
    const [heroData, setheroData] = useState({imgURL:'',name:''});
    useEffect(() => {
       setheroData({imgURL,name})
      }, [name]);
      console.log("here: ",name);
      
    return (
        <>
            <section className={styles.banner} style={{background:`url(${heroData.imgURL})`,backgroundSize:'contain'}}>
                <div>
                    <h4>{heroData?.name}</h4>
                </div>
            </section>

        </>
    )
}
export default Hero;