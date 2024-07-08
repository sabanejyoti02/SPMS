const {initializeApp} = require("firebase/app")
const {getFirestore} = require("firebase/firestore")
const firebaseConfig = {
    apiKey: "AIzaSyBdT1w-1KPRMbmAtdmRG4gIkW_m2TozJdM",
    authDomain: "crud-node-firebase-a39df.firebaseapp.com",
    projectId: "crud-node-firebase-a39df",
    storageBucket: "crud-node-firebase-a39df.appspot.com",
    messagingSenderId: "51269396104",
    appId: "1:51269396104:web:a3cda7c864fbcd798a613d"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  module.exports = {db,app};