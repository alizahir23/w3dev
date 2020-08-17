import React, { useEffect } from 'react'
import Router from 'next/router';
import styles from '../src/styles/Home.module.css'
import AOS from 'aos';
import * as firebaseAuth from '../src/config/FirebaseAuth'
import * as actions from '../src/actions/index'



export default function Home() {



  const HandleSignIn = async (e) => {
    e.preventDefault();
    const newUser = await firebaseAuth.GoogleSignIn();
    if (newUser.code === undefined) {
      actions.setUser(
        {
          name: newUser.user.displayName,
          email: newUser.user.email,
          uid: newUser.user.uid
        }
      )
    }
    Router.push('/todo')
  }

  useEffect(() => {
    AOS.init()
  }, [])

  return (

    <div className={styles.container}>
      <div className={styles.main}>
        <h2>Welcome to <div data-aos="slide-down"

          data-aos-duration="800"
          data-aos-easing="ease-in-out">ToDo</div></h2>
        <p>May your commitments be with you!</p>
        <button onClick={HandleSignIn}>Sign in</button>
      </div>
    </div>
  )
}
