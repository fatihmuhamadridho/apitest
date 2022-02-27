const admin = require('firebase-admin');

const db = admin.firestore();
const Users = db.collection("Users");

module.exports = { Users };