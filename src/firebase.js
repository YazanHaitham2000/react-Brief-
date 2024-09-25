import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAaL5RoWb18KI6TL7EelAvx1gejKz_das4",
    authDomain: "courses-contract-c710c.firebaseapp.com",
    projectId: "courses-contract-c710c",
    storageBucket: "courses-contract-c710c.appspot.com",
    messagingSenderId: "605989031837",
    appId: "1:605989031837:web:d90bd0db052b3b028aa974",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
