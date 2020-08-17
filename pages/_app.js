import { useState } from "react";
import Router from 'next/router';
import Loader from "../src/Components/Loader";
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../src/styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [routeChanging, setRouteChange] = useState(false);

  Router.onRouteChangeStart = () => {
    setRouteChange(true);
  };

  Router.onRouteChangeComplete = () => {
    setRouteChange(false)
  };

  return (
    <>
      {routeChanging &&
        <Loader />
      }
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
