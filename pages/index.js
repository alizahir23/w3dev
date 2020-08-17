import React, { useEffect } from 'react'
import styles from '../src/styles/Home.module.css'
import AOS from 'aos';


export default function Home() {

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
        <button>Sign in</button>
      </div>
    </div>
  )
}
