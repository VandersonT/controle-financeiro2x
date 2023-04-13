import firebase from 'firebase/app';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcy9W0RXs4mDBKl9QwdEmsHIWllzeYDdg",
  authDomain: "controle-financeiro2x.firebaseapp.com",
  projectId: "controle-financeiro2x",
  storageBucket: "controle-financeiro2x.appspot.com",
  messagingSenderId: "75845996972",
  appId: "1:75845996972:web:70cb4237a133ca835e6a09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;