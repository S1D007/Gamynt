import React , {useEffect} from 'react'
import style from "../../styles/Home.module.css"
import AOS from 'aos';
import 'aos/dist/aos.css';


const About = () => {
    useEffect(() => {
        AOS.init();
    }, [])
    
  return (
    <main className={style.grid_about}>
        <section  data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" data-aos-delay="10"
     data-aos-duration="900" 
      className={style.about_item_box}>
            <h1>why choose us</h1>
            <hr />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores tempora iste cupiditate similique, corporis, laboriosam itaque nisi nobis enim ut in deleniti? Blanditiis aut iure vitae labore fugiat quisquam est.</p>
        </section>
        <section 
         data-aos="fade-up" 
         data-aos-anchor-placement="center-bottom"
          data-aos-delay="50" 
        data-aos-duration="900" 
        className={style.about_item_box}>
            <h1>why choose us</h1>
            <hr />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores tempora iste cupiditate similique, corporis, laboriosam itaque nisi nobis enim ut in deleniti? Blanditiis aut iure vitae labore fugiat quisquam est.</p>
        </section>
        <section  data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" data-aos-delay="100"  data-aos-duration="900"  className={style.about_item_box}>
            <h1>why choose us</h1>
            <hr />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores tempora iste cupiditate similique, corporis, laboriosam itaque nisi nobis enim ut in deleniti? Blanditiis aut iure vitae labore fugiat quisquam est.</p>
        </section>
    </main>
  )
}

export default About