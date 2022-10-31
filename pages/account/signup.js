import React , {useState , useEffect} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import style from "./auth.module.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Signup = () => {
  let route = useRouter()

  useEffect(() => {
    AOS.init();
}, [])

    // states 
    const [passtype, setpasstype] = useState("password")
    const [confirmpasstype, setconfirmpasstype] = useState("password")
    const [username, setusername] = useState("")
    const [phone, setphone] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [validation, setvalidation] = useState(false)
    const [autherror, setautherror] = useState("")

//  function for validation 

const funcvalidation = () => {
  if (username.length > 0 && phone.length > 0 && password.length > 0 && confirmpassword.length > 0) {
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
      if (phone.length === 10 ) { 
        validpassword()
      }
      else {
        setautherror("phonenumber not valid , please enter valid phone number")
        setvalidation(false)
      }
    }
    function validpassword() { 
        if (password === confirmpassword) {
          setvalidation(true)
          setautherror("")
        }
        else{
          setautherror("password and confirm password must be same"),
           setvalidation(false)}
      }
      // final data in object
      const finaldata = { username, phone, password, confirmpassword }

      useEffect(() => {
        funcvalidation()
      }, [finaldata])

    const handlesubmit = (e)=>{
        e.preventDefault()
        if (validation === true) {
            console.log("fine your data is =>", finaldata)
            setusername(""); setphone(""); setpassword("");
            setconfirmpassword("");setautherror("")
            //add router
            route.push("/")
          }
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
            <PhoneIcon />
              <input type="text" placeholder='phone number' value={phone}
                onChange={(e) => { setphone(e.target.value) }} />
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
                <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-delay="100"  data-aos-duration="900"  ><Image src={"/google_icon.svg"} alt="img" width={28}  height={28}/> register with google</div>
            </section>
        </form>
        </main>
    </main>
  )
}

export default Signup