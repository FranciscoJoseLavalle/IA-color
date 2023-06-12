import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCIJWFHtUhyQnzKiOgq_EWlFmox_I8yUt8",
    authDomain: "iacolor-fran.firebaseapp.com",
    projectId: "iacolor-fran",
    storageBucket: "iacolor-fran.appspot.com",
    messagingSenderId: "631979300851",
    appId: "1:631979300851:web:979b63031cf51a90afa486"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);