import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/Home.module.css'
import SummarizeIcon from '@mui/icons-material/Summarize';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router'
import About from '../components/homecompo/About';

// Components

export default function index() {
  const router = useRouter()
  return (
    <div>
      <main className={style.main_page}>
      <main className={style.home_container}>
        <section className={style.home_getstarted}>
          <small>hey ganers ,</small>
          <h1>welcome to <span>india's</span> biggest gaming comunity server platform , <span>Registeration open</span></h1>
          <p>we are proudly inform that we are gona create first biggest gamming platform for <span style={{fontWeight:"bold"}}>
          player's </span>  who want to play  <span style={{fontWeight:"bold"}}>eSports </span>or any free or paid tournaments</p>
          <h2>register now to get free rewards and gifts</h2>
            <button onClick={() => {router.push("/account/signup")}}>register<ArrowForwardIcon/></button>
        </section>
        <Image className={style.landing_img}  width={400} height={800} src="/landing_ui.gif" alt="img" />
      </main>
      <main className={style.about_container}>
      <About /> 
      </main>
      </main>
    </div>
  )
}
