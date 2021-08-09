import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB_ZPPnrVx0Fk4XnSS9S-7CwIimHFhVQTE",
    authDomain: "react-app-cursos-2c286.firebaseapp.com",
    projectId: "react-app-cursos-2c286",
    storageBucket: "react-app-cursos-2c286.appspot.com",
    messagingSenderId: "189732951640",
    appId: "1:189732951640:web:fad8ffa99d2b257e661c2d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}