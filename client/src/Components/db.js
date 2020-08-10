import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    // copy and paste your firebase credential here
    apiKey: "AIzaSyCtu0IxSrD8BdrkY5rRD9DvdvnwqpmTgeM",
    authDomain: "ai-image-9e750.firebaseapp.com",
    databaseURL: "https://ai-image-9e750.firebaseio.com",
    projectId: "ai-image-9e750",
    storageBucket: "ai-image-9e750.appspot.com",
    messagingSenderId: "167763226508",
    appId: "1:167763226508:web:87b2e7e94f2608c61730a9",
    measurementId: "G-YBY616KV33"
});

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
export { db, storage };