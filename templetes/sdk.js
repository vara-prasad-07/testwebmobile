import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration (ensure these values match your Firebase project)
const firebaseConfig = {
    apiKey: "AIzaSyBnhqJ-zUQhXt1HbqoLz0U5s7kO_MqeILM",
    authDomain: "projectmain-3b7bb.firebaseapp.com",
    projectId: "projectmain-3b7bb",
    storageBucket: "projectmain-3b7bb.firebasestorage.app",
    messagingSenderId: "424248748744",
    appId: "1:424248748744:web:fd0d515b38d1f668b653fd"
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and set language code
const auth = getAuth(app);
auth.languageCode = 'it';

// Initialize Cloud Firestore
const db = getFirestore(app);

// OPTIONAL: Enable offline persistence (or comment out if you want direct Firestore connectivity)
// enableIndexedDbPersistence(db)
//   .then(() => {
//     console.log("IndexedDB persistence enabled for Firestore.");
//   })
//   .catch((err) => {
//     if (err.code === 'failed-precondition') {
//       console.error("Persistence failed - multiple tabs open.");
//     } else if (err.code === 'unimplemented') {
//       console.error("Persistence is not available in this browser.");
//     } else {
//       console.error("Error enabling persistence:", err);
//     }
//   });

// Expose the Firebase objects for debugging
window.auth = auth;
window.db = db;

console.log("Firebase SDK initialized", { app, auth, db });

export { app, auth, db };