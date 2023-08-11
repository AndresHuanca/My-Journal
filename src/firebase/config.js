import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Confi of Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBezuHlxdXj3cbmDx-LUUGETSc7xb1dfas",
    authDomain: "react-curso-a6548.firebaseapp.com",
    projectId: "react-curso-a6548",
    storageBucket: "react-curso-a6548.appspot.com",
    messagingSenderId: "775602013555",
    appId: "1:775602013555:web:8b03be6fd9d938fe0c7106"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );


