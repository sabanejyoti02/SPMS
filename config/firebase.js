const admin = require("firebase-admin");

//console.log("Firebase",process.env.FIREBASE_PROJECT_ID)
const serviceAccount = require("./creds")
admin.initializeApp(
    {
        credential : admin.credential.cert(serviceAccount)
    }
);

const db = admin.firestore();

module.exports = {db,admin}