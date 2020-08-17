import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDGOkPhcBIlQ4REN1TSjheTo99h1VR_vdM",
    authDomain: "todo-3a117.firebaseapp.com",
    databaseURL: "https://todo-3a117.firebaseio.com",
    projectId: "todo-3a117",
    storageBucket: "todo-3a117.appspot.com",
    messagingSenderId: "727736987822",
    appId: "1:727736987822:web:64a04c0698b4b9320cfd3f",
    measurementId: "G-BKJ9MT7RQK"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {

    if (!/already exists/.test(err.message)) {
        // eslint-disable-next-line no-console
        console.error('Firebase initialization error', err.stack)
    }
}



export default firebase;