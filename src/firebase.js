// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { useAuth } from "./auth/authcontext";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getFirestore, doc, collection, getDoc, arrayUnion, updateDoc, arrayRemove, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import {get } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrxf0vjv9jfkbASULb8uent3U-Cyb0fX8",
    authDomain: "academies-804ab.firebaseapp.com",
    projectId: "academies-804ab",
    storageBucket: "academies-804ab.appspot.com",
    messagingSenderId: "87124977029",
    appId: "1:87124977029:web:99b473d7cf0fee20d990ec",
    measurementId: "G-1C5ZBY25TB"
};

// const { user } = useAuth();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
console.log("xdddd")
const googleProvider = new GoogleAuthProvider();
const collectionRef = collection(db, 'users');
// const docref = doc(db, 'users', 'arya232004@gmail.com');


export {
    auth,
    googleProvider,
    signInWithPopup,
    signOut,
    deleteObject,
    db,
    signInWithRedirect,
    storage,
    getRedirectResult,
    collectionRef,
    // docref,
    getDoc,
    setDoc,
    arrayUnion,
    ref,
    uploadBytes,
    getDownloadURL,
    updateDoc,
    arrayRemove,
    doc,
};
// export default db;