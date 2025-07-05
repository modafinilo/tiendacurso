import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAuxDdRN6JIaC_EF2nyTsi5T-hDjYIPRvA",
    authDomain: "tiendacursos-a3b57.firebaseapp.com",
    projectId: "tiendacursos-a3b57",
    storageBucket: "tiendacursos-a3b57.firebasestorage.app",
    messagingSenderId: "999591954200",
    appId: "1:999591954200:web:74e317085a1e93e3df006d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);