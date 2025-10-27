require('dotenv').config(); // ✅ must come first!
const admin = require('firebase-admin')

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
// Send Notification Function
exports.sendNotification = function (token, title, body, media, price, product_id) {
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

exports.sendNoticeForNewMsg = async function (token, title, body, room, partner) {
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
      partner: JSON.stringify(partner), // must be stringified if object
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

exports.sendPushOnNewDeal = async function (token,title,body,media,order_id) {
  // console.log('fcm data: ', token, title)
  const message = {
    token,
    data: {
      title,
      body,
      media,
      order_id
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

exports.sendPushOnNewDeal = async function (token, title, body, media, order_id) {
  if (!token) {
    console.error("❌ Missing FCM token — cannot send notification.");
    return false;
  }

  const message = {
    token,
    data: {
      title,
      body,
      media,
      order_id,
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Successfully sent:", response);
    return {success: true, message: response};
  } catch (error) {
    console.error("❌ Error sending:", error.message || error);
    return {success: false, error: error.message || error};;
  }
};
