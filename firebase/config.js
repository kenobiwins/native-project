// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQGfEfvHkW94LO6OfRCWo4stHG9C_UHsM",
  authDomain: "native-8928b.firebaseapp.com",
  projectId: "native-8928b",
  storageBucket: "native-8928b.appspot.com",
  messagingSenderId: "38128753029",
  appId: "1:38128753029:web:50cdcdc2fa24f4b6a74cec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const colRefPosts = collection(db, "posts");
export { db, app, storage, colRefPosts };
