
// 🔹 Messages for the Buyer
export function generateBuyerMessage(status, buyerName, orderId) {
  switch (status.toLowerCase()) {
    case "pending":
      return `Sup ${buyerName}: \n your order (ID: ${orderId}) has been placed successfully. Thank you for shopping with us!`;

    case "confirmed":
      return `Good news ${buyerName}: \n your order (ID: ${orderId}) has been confirmed. The vendor will begin processing it shortly.`;

    case "processing":
      return `Sup ${buyerName}: \n your order (ID: ${orderId}) is now being processed. We’ll notify you once it’s shipped.`;

    case "shipping":
      return `Great news ${buyerName}! Your order (ID: ${orderId}) has been shipped. It’s on its way to you.`;

    case "delivered":
      return `Hi ${buyerName}: \n your order (ID: ${orderId}) has been delivered successfully. We hope you enjoy your purchase!`;

    case "completed":
      return `Sup ${buyerName}: \n your order (ID: ${orderId}) has been marked as completed. Thank you for shopping with us!`;

    case "reformed":
      return `Sup ${buyerName}: \n your order (ID: ${orderId}) has been updated/reformed. Please check your order details for the latest status.`;

    default:
      return `Sup ${buyerName}: \n there’s an update on your order (ID: ${orderId}): ${status}`;
  }
}

// 🔹 Messages for the Vendor
export function generateVendorMessage(status, vendorName, orderId) {
  switch (status.toLowerCase()) {
    case "pending":
      return `Hey ${vendorName}, a new order (ID: ${orderId}) has been placed. Please confirm it soon.`;

    case "confirmed":
      return `Hey ${vendorName}, the buyer has paid for order (ID: ${orderId}). You should begin processing it for shipping.`;

    case "processing":
      return `Sup ${vendorName}, you are now processing order (ID: ${orderId}). Make sure to prepare it for shipping.`;

    case "shipping":
      return `Sup ${vendorName}, you’ve marked order (ID: ${orderId}) as shipped. We’ll notify the buyer.`;

    case "delivered":
      return `Hey ${vendorName}, the buyer has received order (ID: ${orderId}). Please await confirmation of completion.`;

    case "completed":
      return `Sup ${vendorName}, order (ID: ${orderId}) is now completed. Thank you for your service!`;

    case "reformed":
      return `Hey ${vendorName}, order (ID: ${orderId}) has been updated/reformed. Please review the latest details.`;

    default:
      return `Sup ${vendorName}, order (ID: ${orderId}) has a new status: ${status}`;
  }
}

