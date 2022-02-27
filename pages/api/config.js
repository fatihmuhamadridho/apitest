const admin = require('firebase-admin');
const credential = require('../../ServiceAccountKey.json')

admin.initializeApp({ credential: admin.credential.cert(credential)} )
const db = admin.firestore();
const Users = db.collection("Users");

module.exports = { Users };