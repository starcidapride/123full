import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmbdoj5wLLKqXJXnBUj7kOojJRxhytzGQ",
  authDomain: "demoo-c02e2.firebaseapp.com",
  projectId: "demoo-c02e2",
  storageBucket: "demoo-c02e2.appspot.com",
  messagingSenderId: "1064703186261",
  appId: "1:1064703186261:web:05e4285fed2aa06abdcbdc",
  measurementId: "G-H4WEK1QRT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

