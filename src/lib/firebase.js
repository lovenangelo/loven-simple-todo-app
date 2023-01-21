// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6ny-kM66UyS4IP_7Ag18gDPj5gLVA4GI",
  authDomain: "simple-to-do-app-b3ff9.firebaseapp.com",
  projectId: "simple-to-do-app-b3ff9",
  storageBucket: "simple-to-do-app-b3ff9.appspot.com",
  messagingSenderId: "299929712675",
  appId: "1:299929712675:web:09eed5d0ba76a060581996",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
