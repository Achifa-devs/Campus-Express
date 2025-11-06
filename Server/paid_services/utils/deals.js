const { default: axios } = require("axios");

exports.generateConversationId =  function (userA, userB) {
  console.log(userA, userB)
  if (userA === userB) {
    throw new Error("Conversation requires two different users");
  }
  // Sort the two IDs lexicographically (alphabet + number ordering)
  return [userA, userB].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).join('_');
}

exports.sendNotification = async ({ customer, partner, order, room_id }) => {
  if (!partner?.fcm) {
    console.warn("⚠️ No FCM token found for partner:", partner?.id || "unknown");
    return { success: false, message: "Missing FCM token" };
  }

  const title = `New deal from ${customer?.fname || ""} ${customer?.lname?.[0] || ""}`.trim();
  const body = `${customer?.fname} has completed a payment of ₦${order?.price} for ${order?.stock} unit(s) of your product on Campus Sphere. The payment includes a fee of ₦${order?.shipping_fee} (${order?.type === 'lodge' ? 'inspection' : 'shipping'} fee). Please proceed to complete the delivery to confirm and receive your payment.`;

  try {
    const response = await axios.post(
      "http://192.168.0.3:5432/firebase/notification",
      {
        token: partner.fcm,
        data: {
          type: "deal",
          title,
          body,
          order_id: order?.order_id,
          room_id,
          media: customer?.photo || null,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true,
        transformResponse: [
          (data) => {
            try {
              return JSON.parse(data);
            } catch {
              console.warn("⚠️ notify endpoint did not return valid JSON:", data?.slice(0, 100));
              return data;
            }
          },
        ],
      }
    );

    return {
      success: response?.status >= 200 && response?.status < 300,
      status: response?.status,
      data: response?.data,
    };
  } catch (error) {
    console.error("❌ Notification send failed:", error.message);
    return { success: false, error: error.message };
  }
};


exports.sendNotificationForDealUpdateFromVendorToBuyer = async ({ customer, order, room_id, new_stage, role }) => {
  if (!customer?.fcm) {
    console.warn("⚠️ No FCM token found for customer:", customer?.id || "unknown");
    return { success: false, message: "Missing FCM token" };
  }
  // console.log('fcm data: --',customer.fcm)
  let newTitle = generateTitle(new_stage, role)
  let newBody = generateBody(new_stage, role)

  const title = newTitle;
  const body = newBody;

  try {
    const response = await axios.post(
      "http://192.168.0.3:5432/firebase/notification",
      {
        token: customer.fcm,
        data: {
          type: "deal",
          title,
          body,
          order_id: order?.order_id,
          room_id,
          media: customer?.photo || null,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true,
        transformResponse: [
          (data) => {
            try {
              console.log("data from axios:", data)
              return JSON.parse(data);
            } catch {
              console.warn("⚠️ notify endpoint did not return valid JSON:", data?.slice(0, 100));
              return data;
            }
          },
        ],
      }
    );

    return {
      success: response?.status >= 200 && response?.status < 300,
      status: response?.status,
      data: response?.data,
    };
  } catch (error) {
    console.error("❌ Notification send failed:", error.message);
    return { success: false, error: error.message };
  }
};

exports.sendNotificationForDealUpdateFromBuyerToVendor = async ({ partner, order, room_id, new_stage, role }) => {
  if (!partner?.fcm) {
    console.warn("⚠️ No FCM token found for partner:", partner?.id || "unknown");
    return { success: false, message: "Missing FCM token" };
  }

  let newTitle = generateTitle(new_stage, role)
  let newBody = generateBody(new_stage, role)

  const title = newTitle;
  const body = newBody;

  try {
    const response = await axios.post(
      "http://192.168.0.3:5432/firebase/notification",
      {
        token: partner.fcm,
        data: {
          type: "deal",
          title,
          body,
          order_id: order?.order_id,
          room_id,
          media: partner?.photo || null,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true,
        transformResponse: [
          (data) => {
            try {
              return JSON.parse(data);
            } catch {
              console.warn("⚠️ notify endpoint did not return valid JSON:", data?.slice(0, 100));
              return data;
            }
          },
        ],
      }
    );

    return {
      success: response?.status >= 200 && response?.status < 300,
      status: response?.status,
      data: response?.data,
    };
  } catch (error) {
    console.error("❌ Notification send failed:", error.message);
    return { success: false, error: error.message };
  }
};

function generateTitle(stage, role) {
  switch (stage) {
    case 'shipping':
      return role === 'vendor'
        ? '🚚 Your order has been dispatched (now shipping)'
        : '';

    case 'delivered':
      return role === 'vendor'
        ? '📦 Your order has been delivered'
        : '';

    case 'cancelled':
      return role === 'buyer'
        ? '❌ The buyer has cancelled this order'
        : '⚠️ The vendor has cancelled this order — your payment will be refunded shortly 💸';

    case 'confirmed':
      return role === 'buyer'
        ? '📬 The buyer has confirmed that he/she has received the order'
        : '';

    case 'completed':
      return role === 'buyer'
        ? '✅ The buyer is satisfied with the deal'
        : '💰 The vendor has claimed your purchase!';

    default:
      return '📦 Order update';
  }
}

function generateBody(stage, role) {
  switch (stage) {
    case 'shipping':
      return role === 'vendor'
        ? '🚀 Your order is now in transit. You can track its progress and expect delivery soon.'
        : '';

    case 'delivered':
      return role === 'vendor'
        ? '📍 The order has been successfully delivered to the specified address. Please confirm delivery now. (Only confirm if the order has been delivered successfully.)'
        : 'The buyer confirmed he/she received the order. (You can now proceed to payment)';

    case 'cancelled':
      return role === 'buyer'
        ? '❌ This order has been cancelled by the buyer. All payments made, including any applicable fees, will be refunded to the buyer in accordance with our policy.'
        : '⚠️ This order has been cancelled. The amount paid, including any applicable fees, will be refunded to your account shortly. 💵';

    case 'confirmed':
      return role === 'buyer'
        ? '📬 The customer has confirmed receipt of the order. Thank you for completing this transaction on Campus Sphere 🙏.'
        : '';

    case 'completed':
      return role === 'buyer'
        ? '🎉 The customer is satisfied with the deal, and you can now claim the purchase by withdrawing the funds at any time. 💰'
        : '✅ The vendor has claimed your purchase, and the deal has been sealed in accordance with our policy 🤝.';

    default:
      return '📢 There is an update on your order. Please check your order details for more information.';
  }
}
