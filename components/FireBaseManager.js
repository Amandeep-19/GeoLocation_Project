import firebase  from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB5tEgI0vlYw3jEfKznx4RIJegm43jkEQY",
    authDomain: "geoproject-dbb5b.firebaseapp.com",
    databaseURL: "https://geoproject-dbb5b.firebaseio.com",
    projectId: "geoproject-dbb5b",
    storageBucket: "geoproject-dbb5b.appspot.com",
    messagingSenderId: "161592325836",
    appId: "1:161592325836:web:71d3ad988258a71ed53469"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();