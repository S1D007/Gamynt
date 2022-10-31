import React, { useState } from 'react'
import style from "./navbar.module.css"
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image';

const Navbar = () => {

  // init of router
  const router = useRouter()
  const [handlemenu, sethandlemenu] = useState("")
  const togglemenu = () => {
    if (handlemenu == "") { sethandlemenu(style.open_menu) } else { sethandlemenu("") }
  }

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
          <button onClick={() => { router.push("/account/signup"); togglemenu() }}>Register</button>
      </section>
    </nav>
  )
}

export default Navbar