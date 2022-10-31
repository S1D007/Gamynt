import React, { useState } from 'react'
import style from "./navbar.module.css"
import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image';

const Navbar = () => {

  // init of router
  const router = useRouter()
  const [handlemenu, sethandlemenu] = useState("")
  const [registered, setregistered] = useState(false)
  const togglemenu = () => {
    if (handlemenu == "") { sethandlemenu(style.open_menu) } else { sethandlemenu("") }
  }
  /// user name first letter 
  let username = "p"

  return (
    <nav className={style.main_nav}>
      <section className={style.logo}>
        <Link href="/">
          <Image className={style.nav_logo} width={150} height={100} src="/logo_3.png" alt="img" />
        </Link>
      </section>

      <section className={style.nav_search}>
      </section>

      <section className={`${style.links_and_more}`}>
        {
          registered === true?
            <div className={style.registered_uer}>
              <p>{username}</p>
            </div>
          :
          <button onClick={() => { router.push("/account/signup"); togglemenu() }}>Register</button>
        }
      </section>
    </nav>
  )
}

export default Navbar