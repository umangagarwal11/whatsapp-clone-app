import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA_GvJZvAo8wxZVtkz6En5WYTojPttaQCg",
    authDomain: "chatapp-dd365.firebaseapp.com",
    projectId: "chatapp-dd365",
    storageBucket: "chatapp-dd365.appspot.com",
    messagingSenderId: "1026164055229",
    appId: "1:1026164055229:web:bfd345fba2c139cf71ebd4",
    measurementId: "G-X3J615TKGP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
