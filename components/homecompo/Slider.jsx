import React , {useEffect} from 'react'
import style from "../../styles/Home.module.css"
import AOS from 'aos';
import 'aos/dist/aos.css';


const Slider = () => {
    useEffect(() => {
        AOS.init();
    }, [])
  return (
    <main className={style.slider}>
        slider
    </main>
  )
}

export default Slider