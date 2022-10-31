import React , {useEffect} from 'react'
import Image from 'next/image';
import style from "../../styles/Home.module.css"

import AOS from 'aos';
import 'aos/dist/aos.css';

const Commingsoon = () => {
    useEffect(() => {
        AOS.init();
    }, [])
  return (
    <main className={style.home_container}>
        <Image className={style.landing_img}  width={940} height={700} src="/landing_ui_2.gif" alt="img" />
         <section 
     data-aos="fade-up" data-aos-anchor-placement="center-bottom"
     data-aos-duration="900" 
     className={style.home_getstarted}>
      <small>hey gammers ,</small>
      <h1>thank you for your registration in <span>india's</span> biggest gamming comunity server platform</h1>
      <h2>we are <span>comming soon ..</span></h2>
    </section>
    </main>
  )
}

export default Commingsoon