import {auth} from './firebase-config.js';
import $ from 'jquery';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, user => {
    if (user) {
        $("#login").addClass("d-none");
        $("#app").remove("d-none");
    } else {
        $("#login").remove("d-none");
        $("#app").addClass("d-none");
    }
})

console.log(auth);

$("#btn-sign-in-google").on("click", async () => {
    // alert("Sign in with Google");
    try {
        const result = await signInWithPopup(auth, provider);
        $("#login").addClass("d-none");
        $("#app").remove("d-none");
    } catch (error) {
        // console.log(error);
        $("#login").remove("d-none");
        $("#app").addClass("d-none");
    }
});
