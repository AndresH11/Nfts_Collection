

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjRgQyMTN1iWs8YRfrKtk3bOsLuUTNTZE",
  authDomain: "nftscolection.firebaseapp.com",
  projectId: "nftscolection",
  storageBucket: "nftscolection.appspot.com",
  messagingSenderId: "381524037923",
  appId: "1:381524037923:web:c83bf31eb2c70a35793c96",
  measurementId: "G-73J1N8VRW0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);