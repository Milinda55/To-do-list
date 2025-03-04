// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ9jQkFAN74yAslpGPbaStVxXbbfUsaZA",
    authDomain: "to-do-list-jquery-f7d1a.firebaseapp.com",
    projectId: "to-do-list-jquery-f7d1a",
    storageBucket: "to-do-list-jquery-f7d1a.firebasestorage.app",
    messagingSenderId: "653544099489",
    appId: "1:653544099489:web:dcb6274dd90e8628aa6ae0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)