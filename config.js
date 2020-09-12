import firebase from 'firebase';
require ('@firebase/firestore');
const firebaseConfig = {
    apiKey: "AIzaSyBjaGjwxpnx6Sm7Bub4EJiiWl6V8q_RoU8",
    authDomain: "barter-ap.firebaseapp.com",
    databaseURL: "https://barter-ap.firebaseio.com",
    projectId: "barter-ap",
    storageBucket: "barter-ap.appspot.com",
    messagingSenderId: "163677814963",
    appId: "1:163677814963:web:edefe34b050d07c289f0c6",
    measurementId: "G-XGKTN272JY"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()