// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    apiKey: 'AIzaSyBFkW628qUZn2zahE9pMVTuUqfKrh5Qvoo',
    authDomain: "habesha-kemis.firebaseapp.com",
    projectId: "habesha-kemis",
    storageBucket: "habesha-kemis.appspot.com",
    messagingSenderId: "715243890549",
    appId: "1:715243890549:web:53148d5f7b275d2a97553c",
    measurementId: "G-RCLVRS9GSJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { app, storage };
