import admin from 'firebase-admin';
import fs from 'fs';

// Load Firebase service account
const serviceAccount = JSON.parse(fs.readFileSync('./src/utils/serviceAccount.json', 'utf-8'));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
