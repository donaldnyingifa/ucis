// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAr6fyZSvaYOBpLGls2nro5gCMsUvbF-g",
  authDomain: "ucis-1f265.firebaseapp.com",
  projectId: "ucis-1f265",
  storageBucket: "ucis-1f265.appspot.com",
  messagingSenderId: "1082840930201",
  appId: "1:1082840930201:web:977f3d5d2ec8daca306508",
  measurementId: "G-WLQ2FN56PH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);