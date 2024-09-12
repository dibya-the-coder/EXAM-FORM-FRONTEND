// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fir-project-772bb.firebaseapp.com",
  projectId: "fir-project-772bb",
  storageBucket: "fir-project-772bb.appspot.com",
  messagingSenderId: "1086153854790",
  appId: "1:1086153854790:web:c9fba0812c354f80c11f47",
  measurementId: "G-ZXMK427G9R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);