import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyDjinZw8F4QK6dajA-7VQOsp7aqPgxNPCA",
    authDomain: "reactbreif.firebaseapp.com",
    projectId: "reactbreif",
    storageBucket: "reactbreif.appspot.com",
    messagingSenderId: "377045064095",
    appId: "1:377045064095:web:d4142d47f1f5173631c5aa"
  };

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export the Firestore instance
export default auth;
