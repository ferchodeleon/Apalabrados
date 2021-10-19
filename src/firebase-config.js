import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBiaiobV29uZTdWDZ_lHOpQZ60fdfUh5-4",
  authDomain: "testplatzi-65856.firebaseapp.com",
  databaseURL: "https://testplatzi-65856-default-rtdb.firebaseio.com",
  projectId: "testplatzi-65856",
  storageBucket: "testplatzi-65856.appspot.com",
  messagingSenderId: "396625042560",
  appId: "1:396625042560:web:9531316e4552b8a3bd1a65",
  measurementId: "G-DDENGQC73M",
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
