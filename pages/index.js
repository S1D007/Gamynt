import React , {useState} from 'react'
import style from '../styles/Home.module.css'

import Register from '../components/homecompo/Register';
import Commingsoon from '../components/homecompo/Commingsoon';


export default function index() {
  return (
    <div>
      <main className={style.main_page}>
        {/* <Commingsoon/> */}
        <Register />
      </main>
    </div>
  )
}
