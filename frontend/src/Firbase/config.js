
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBH0Sjb-Y-ZXgXdX7UDKRmlAtY3OnG86us",
  authDomain: "online-store-79bf9.firebaseapp.com",
  projectId: "online-store-79bf9",
  storageBucket: "online-store-79bf9.appspot.com",
  messagingSenderId: "956595533807",
  appId: "1:956595533807:web:61e57e5679c0b420c3e81a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);