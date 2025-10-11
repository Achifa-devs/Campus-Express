import dotenv from 'dotenv';
dotenv.config(); // ✅ must come first!

import admin from 'firebase-admin';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccountPath = path.join(__dirname, "serviceAccount.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
// const serviceAccount = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.PRIVATE_KEY,
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
//   universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
// };
 
// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Send Notification Function
export function sendNotification(token, title, body, media, price, product_id) {
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


export function sendNoticeForNewMsg(token, title, body) {
  const message = {
    token,
    data: {
      title, body
    },
    notification: {
        title, body
    }
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


