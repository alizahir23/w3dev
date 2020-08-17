import { useState, useEffect } from "react";
import Router from 'next/router';
import Loader from "../src/Components/Loader";
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../src/styles/globals.css'
import { createStore } from 'redux'
import { Provider, useDispatch } from 'react-redux'
import allReducer from '../src/reducers/index'
import * as actions from '../src/actions/index'
import * as firebaseAuth from '../src/config/FirebaseAuth'
import firebase from '../src/config/Firebase'

const store = createStore(allReducer)

function MyApp({ Component, pageProps }) {
  const [routeChanging, setRouteChange] = useState(false);
  const [Loading, setLoading] = useState(false);



  Router.onRouteChangeStart = () => {
    setRouteChange(true);
  };

  Router.onRouteChangeComplete = () => {
    setRouteChange(false)
  };

  return (
    <Provider store={store}>
      {routeChanging || Loading &&
        <Loader />
      }
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp
