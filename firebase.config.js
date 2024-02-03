import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBFBCbpO74cfKUsn2ZPJnQZoJFgukC_DIQ",
  authDomain: "account-management-app-58753.firebaseapp.com",
  projectId: "account-management-app-58753",
  storageBucket: "account-management-app-58753.appspot.com",
  messagingSenderId: "1065598057734",
  appId: "1:1065598057734:web:1a78ce2d0989631161f287"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);