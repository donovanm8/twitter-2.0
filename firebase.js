import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAN5pbeTQ0uLw13puZQRYgqF41DxAsAuII",
  authDomain: "twitter-clone-too-point-oh.firebaseapp.com",
  projectId: "twitter-clone-too-point-oh",
  storageBucket: "twitter-clone-too-point-oh.appspot.com",
  messagingSenderId: "498880818267",
  appId: "1:498880818267:web:6ae12da342c0a7c75a637e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)