import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import {
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDB-d8cl9EnRYiGBaggBOZFw6LT4lZvAfs",
  authDomain: "apiweb2024-4ef20.firebaseapp.com",
  projectId: "apiweb2024-4ef20",
  storageBucket: "apiweb2024-4ef20.appspot.com",
  messagingSenderId: "101496799949",
  appId: "1:101496799949:web:e9e4977a5273d0b3c41f84",
  measurementId: "G-RM0N2GVPT5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginout = () => signOut(auth);

export function userstate() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      window.location.href = "../loginn.html";
    }
  });
}

export const registerauth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const facebookProvider = new FacebookAuthProvider();

export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);

export const recoverPassword = (email) => sendPasswordResetEmail(auth, email);

export const deleteUser = async () => {
  const user = auth.currentUser;
  const userDoc = doc(db, "users", user.uid);

  // Primero, elimina el documento del usuario en Firestore
  await deleteDoc(userDoc);

  // Luego, elimina el usuario en Firebase Authentication
  return user.delete();
};

export const deleteUserById = async (id) =>
  await deleteDoc(doc(db, "users", id));

export { db };
export { getAuth };
