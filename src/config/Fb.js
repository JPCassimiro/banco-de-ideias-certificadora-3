import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqCFpUmtbFStuB62Cs7ylLLi5Ptfy8pEQ",
  authDomain: "certificadora3-1d403.firebaseapp.com",
  projectId: "certificadora3-1d403",
  storageBucket: "certificadora3-1d403.firebasestorage.app",
  messagingSenderId: "350957780486",
  appId: "1:350957780486:web:3adedac13af9beb4874d87"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    app,
    db,
    auth
}