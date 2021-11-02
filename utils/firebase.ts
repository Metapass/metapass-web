import * as firebase from "firebase/app";
import {doc, addDoc, collection, getFirestore, arrayUnion, getDoc, updateDoc} from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

!firebase.getApps().length ? firebase.initializeApp(firebaseConfig): null


const db = getFirestore();


export {firebase, doc, addDoc, collection, db, arrayUnion, getDoc, updateDoc}
