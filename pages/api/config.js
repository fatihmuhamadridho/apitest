const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({ credential: admin.credential.cert({
    type: process.env.type,
    projectId: process.env.project_id,
    privateKeyId: process.env.private_key_id,
    privateKey: process.env.private_key,
    clientEmail: process.env.client_email,
    clientId: process.env.client_id,
    authUri: process.env.auth_uri,
    tokenUri: process.env.token_uri,
    authProviderX509CertUrl: process.env.auth_provider_x509_cert_url,
    clientX509CertUrl: process.env.client_x509_cert_url,
}) })
const db = admin.firestore();
const Users = db.collection("Users");

module.exports = { Users };