import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import style from "./auth.module.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
// import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../../config/firebase.js"
import { useRouter } from 'next/router'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Signup = () => {
  const provider = new GoogleAuthProvider();
  // states 
  let router = useRouter()

  useEffect(() => {
    AOS.init();
}, [])

    // states 
    const [passtype, setpasstype] = useState("password")
    const [confirmpasstype, setconfirmpasstype] = useState("password")
    const [username, setusername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [validation, setvalidation] = useState(false)
    const [autherror, setautherror] = useState("")

//  function for validation 

const funcvalidation = () => {
  if (username.length > 0 && email.length > 0 && password.length > 0 && confirmpassword.length > 0) {
    validname()
  }
  else {
    setautherror("all fields required")
    setvalidation(false)
  }
}
function validname() {
    if (username.length > 3) {
      validphone()
    }
    else {
      setvalidation(false)
      setautherror("name is to short")
    }
  }
  function validphone() {
    if (email.includes("@")) {
      validpassword()
    }
    else {
      setautherror("email not valid , please enter valid email")
      setvalidation(false)
    }
  }
  function validpassword() {
    if (password === confirmpassword) {
      setvalidation(true)
      setautherror("")
    }
    else {
      setautherror("password and confirm password must be same"),
        setvalidation(false)
    }
  }
      // final data in object
      const finaldata = { username, email, password, confirmpassword }

      useEffect(() => {
        funcvalidation()
      }, [finaldata])

      const handlesubmit = (e) => {
        e.preventDefault()
        if (validation === true) {
          console.log("fine your data is =>", finaldata)
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log(user)
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
    
          setusername(""); setEmail(""); setpassword("");
          setconfirmpassword(""); setautherror("")
        }
      }

const handleGoogleSignup = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
    
  return (
    <main className={style.main_page}>
        {/* this main containeir for max width and for resposnive ui   */}
        <main data-aos="fade-up" data-aos-delay="100" data-aos-duration="900"  className={style.auth_main}>
            {/* /// ui container  */}
            <section className={style.auth_ui_section}>
                <div></div>
            </section>
            {/* /// ui container  */}

        <form className={style.auth_ui_form} onSubmit={handlesubmit}>
            <header>
                <h1>register</h1>
                <p>register now for free rewards</p>
                <span>{autherror}</span>
            </header>
            {/* name */}
            <div className={style.input_box}>
                <AccountCircleIcon/>
                <input type="text" placeholder='enter your name' value={username}
                onChange={(e) => { setusername(e.target.value)}}/>
            </div>
            {/* mail */}
            <div className={style.input_box}>
            <MailIcon />
            <input type="text" placeholder='Email' value={email}
              onChange={(e) => { setEmail(e.target.value) }} />
          </div>
            {/* ------password ------ */}
            <div className={`${style.input_box} ${style.input_box_password}`}>
                <LockIcon />
                <input type={passtype} placeholder='password' value={password}
                onChange={(e) => { setpassword(e.target.value) }} />
              <div className={style.eye_icon} onClick={() => { { passtype === "password" ? setpasstype("text") : setpasstype("password") } }}>
                {passtype === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
            <div className={`${style.input_box} ${style.input_box_password}`}>
                <LockIcon />
                <input type={confirmpasstype} placeholder='confirm password' value={confirmpassword}
                onChange={(e) => { setconfirmpassword(e.target.value) }} />
              <div className={style.eye_icon} onClick={() => { { confirmpasstype === "password" ? setconfirmpasstype("text") : setconfirmpasstype("password") } }}>
                {confirmpasstype === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
            {/* ------password ------ */}
            <button data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-delay="0"  data-aos-duration="900"  className={style.auth_btn}>register</button>

            <div className={style.or}><hr />or<hr /></div>
            <section className={style.login_with_container}>
                <div onClick={handleGoogleSignup} data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-delay="100"  data-aos-duration="900"  ><Image src={"/google_icon.svg"} alt="img" width={28}  height={28}/> register with google</div>
            </section>
        </form>
        </main>
    </main>
  )
}

export default Signup