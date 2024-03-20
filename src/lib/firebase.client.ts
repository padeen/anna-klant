import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { browser } from '$app/environment';

export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

const firebaseConfig = {
  apiKey: "AIzaSyCXY-YRQ-MONfFkP9zzRz_vVJbabZf4f3c",
  authDomain: "writee-8da55.firebaseapp.com",
  projectId: "writee-8da55",
  storageBucket: "writee-8da55.appspot.com",
  messagingSenderId: "983933550227",
  appId: "1:983933550227:web:d748436adf3a2f7f4c9766"
};

export const initializeFirebase = () => {
  if (!browser) {
    throw new Error("Can't use the Firebase client on the server.");
  }
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
};