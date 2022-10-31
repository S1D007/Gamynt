import React , {useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/Home.module.css'
import SummarizeIcon from '@mui/icons-material/Summarize';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router'

import AOS from 'aos';
import 'aos/dist/aos.css';

// Components

export default function index() {
  useEffect(() => {
    AOS.init();
}, [])
  const router = useRouter()

  return (
    <div>
      <main className={style.main_page}>
      <main className={style.home_container}>
        <section 
         data-aos="fade-up" data-aos-anchor-placement="center-bottom"
         data-aos-duration="900" 
         className={style.home_getstarted}>
          <small>hey gammers ,</small>
          <h1>welcome to <span>india's</span> biggest gamming comunity server platform , <span>Registeration open</span></h1>
          <p>we are proudly inform that we are gona create first biggest gamming platform for <span style={{fontWeight:"bold"}}>
          player's </span>  who want to play  <span style={{fontWeight:"bold" , textTransform:"initial"}}>eSports </span>or any free or paid tournaments</p>
          <h2>register now to get <span>free rewards</span> and <span>gifts</span></h2>
            <button  data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-delay="150"  data-aos-duration="900" onClick={() => {router.push("/account/signup")}}>register<ArrowForwardIcon/></button>
        </section>
<Image className={style.landing_img}  width={940} height={700} src="/landing_ui_2.gif" alt="img" />
      </main>
      </main>
    </div>
  )
}
