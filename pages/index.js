import React , {useState} from 'react'
import style from '../styles/Home.module.css'

import Register from '../components/homecompo/Register';
import Commingsoon from '../components/homecompo/Commingsoon';
import { useEffect } from 'react';


export default function index() {
  const [signupDone,setSignup] = useState(false)
  useEffect(()=>{
    const signup = localStorage?.getItem("signup")
    setSignup(()=>signup?signup:false)
  },[])
  return (
    <div>
      <main className={style.main_page}>
        {
          signupDone?(
          <Commingsoon/>):
        (<Register />)
        }
      </main>
    </div>
  )
}
