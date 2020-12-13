import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyASwe6PRaNCTi_qnhn_E73qNWZKViVozro",
    authDomain: "whatsapp-clone-f660a.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-f660a.firebaseio.com",
    projectId: "whatsapp-clone-f660a",
    storageBucket: "whatsapp-clone-f660a.appspot.com",
    messagingSenderId: "280934336886",
    appId: "1:280934336886:web:c5cd0426a2565ef6bb9257",
    measurementId: "G-BEGD0NRLCC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;