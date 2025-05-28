import dotenv from 'dotenv';
dotenv.config(); // ✅ must come first!

import admin from 'firebase-admin';

// Optional: remove fs if not used
// import fs from 'fs';

// Firebase service account from env
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};
 
// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Send Notification Function
export default function sendNotification(token, title, body, media, price, product_id) {
  const message = {
    token,
    data: {
      title,
      body,
      media,
      price,
      product_id,
    },
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Successfully sent:', response);
    })
    .catch((error) => {
      console.error('Error sending:', error.message || error);
    });
}
