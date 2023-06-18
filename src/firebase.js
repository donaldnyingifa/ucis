// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, child, get, push, update } from "firebase/database";
import { getAuth,signOut, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAr6fyZSvaYOBpLGls2nro5gCMsUvbF-g",
  authDomain: "ucis-1f265.firebaseapp.com",
  databaseURL: "https://ucis-1f265-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "ucis-1f265",
  storageBucket: "ucis-1f265.appspot.com",
  messagingSenderId: "1082840930201",
  appId: "1:1082840930201:web:977f3d5d2ec8daca306508",
  measurementId: "G-WLQ2FN56PH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const authState = onAuthStateChanged
export const createUser = createUserWithEmailAndPassword
export const signIn = signInWithEmailAndPassword
const resetPassword = email => sendPasswordResetEmail(auth, email)

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export {ref,signOut, set, onValue, child, get, push, update}


// match /note/{noteId} {
//   allow write: if request.auth != null;
//   allow read: if request.auth.uid == resource.data.author;
// }