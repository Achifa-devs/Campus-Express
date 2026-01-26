import admin from 'firebase-admin';

// Initialize Firebase Admin
let firebaseInitialized = false;

if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    firebaseInitialized = true;
  } catch (error) {
    console.error('Firebase initialization error:', error.message);
  }
} else if (admin.apps.length) {
  firebaseInitialized = true;
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

  return admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Successfully sent:', response);
      return { success: true, response };
    })
    .catch((error) => {
      console.error('Error sending:', error.message || error);
      return { success: false, error: error.message || error };
    });
}

export async function sendNoticeForNewMsg(token, title, body, room, partner) {
  const message = {
    token,
    notification: {
      title,
      body,
    },
    data: {
      title,
      body,
      room,
      partner: JSON.stringify(partner),
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('✅ Successfully sent:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error sending:', error.message || error);
    return { success: false, error: error.message || error };
  }
}

export async function sendPushOnNewDeal(token, title, body, media, order_id) {
  try {
    const message = {
      token,
      data: {
        title: String(title),
        body: String(body),
        media: typeof media === 'object' ? JSON.stringify(media) : String(media),
        order_id: String(order_id),
      },
      notification: {
        title: String(title),
        body: String(body),
      },
    };

    const response = await admin.messaging().send(message);
    console.log('Successfully sent:', response);
    return { success: true, message: response };
  } catch (error) {
    console.error('Error sending firebase notification:', error.message || error);
    return { success: false, error: error.message || error };
  }
}
