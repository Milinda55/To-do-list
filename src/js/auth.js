import {auth} from './firebase-config.js';
import $ from 'jquery';
import {signOut, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";

const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, user => {
    if (user) {
        $("#login, #splash").addClass("d-none");
        $("#app").removeClass("d-none");
    } else {
        setTimeout(() => {
            $("#login").removeClass("d-none");
            $("#app, #splash").addClass("d-none");
        }, 1000);
    }
});

$("#btn-sign-in-google").on('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
    } catch (e) {
        console.log(e);
    }
});