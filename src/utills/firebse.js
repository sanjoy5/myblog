// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE,
    authDomain: "my-blog-8d017.firebaseapp.com",
    projectId: "my-blog-8d017",
    storageBucket: "my-blog-8d017.appspot.com",
    messagingSenderId: "320817999093",
    appId: "1:320817999093:web:1d4ffa7bbc3767cc91e9bc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);