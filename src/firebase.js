import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgqsN2GIFsqYON6tfAsvqcny3QJKiNXW0",
  authDomain: "electronic-doctor.firebaseapp.com",
  projectId: "electronic-doctor",
  storageBucket: "electronic-doctor.appspot.com",
  messagingSenderId: "661850896197",
  appId: "1:661850896197:web:e35e91119557a9e6f4302c",
  measurementId: "G-QY878H53QQ"
};

  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const facebookProvider = new firebase.auth.FacebookAuthProvider();
   const TwitterProvider = new firebase.auth.TwitterAuthProvider();
   const GithubProvider = new firebase.auth.GithubAuthProvider();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
  export  {auth};
  export  {storage};