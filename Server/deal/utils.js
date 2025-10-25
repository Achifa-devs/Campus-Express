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
  const body = `${customer?.fname} has completed a payment of ₦${order?.price} for ${order?.stock} unit(s) of your product on Campus Sphere. The payment includes a fee of ₦${order?.shipping} (${order?.type === 'lodge' ? 'inspection' : 'shipping'} fee). Please proceed to complete the delivery to confirm and receive your payment.`;

  try {
    const response = await axios.post(
      "https://cs-node.vercel.app/firebase/notification",
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
