// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "taskmanagertask.firebaseapp.com",
  projectId: "taskmanagertask",
  // storageBucket: "taskmanagertask.firebasestorage.app",
  storageBucket: "taskmanagertask.appspot.com",
  messagingSenderId: "567666481486",
  appId: "1:567666481486:web:69afaecb959d612bc4e61f",
  measurementId: "G-0RMST6T79Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
