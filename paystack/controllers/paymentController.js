const Payment = require('../models/payment');


const handleWebhook = async (req, res) => {
  try {
    const event = req.body;
    const { metadata } = event.data;
    const { type } = metadata;

    // Log incoming webhook for debugging
    console.log('Received webhook event:', event.event);

    // Assuming event is from Paystack
    if (event.event === 'charge.success') {
      if(type === 'connect'){
        await connectHandler(event);
        res.status(200).send('Webhook processed successfully');
      }else if(type === 'tools'){
        await toolHandler(event)
      }else if(type === 'promotion'){
        await promotionHandler(event)
      }
      
    } else {
      console.log(`Unhandled event type: ${event.event}`);
      res.status(400).send('Event not handled');
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  handleWebhook,
};



async function connectHandler(event) {
  const { amount, reference, status, metadata } = event.data;
  const { user_id, no_of_connects } = metadata;

  // Validate required data
  if (!reference || !amount || !status) {
    console.error('Missing required payment data');
    throw new Error("Invalid payment data");
  }

  // Check if payment already exists
  const existingPayment = await Payment.findConnectsByReference(reference);
  if (!existingPayment) {
    console.log(`Creating new payment for reference: ${reference}`);
    const paymentRecord = await Payment.createConnect({ amount, no_of_connects, reference, user_id });

    if (paymentRecord) {
      console.log(`Payment created successfully: ${paymentRecord.id}`);
      // Update subscriptions only if payment creation was successful
      const connectUpdate = await Payment.updateConnects({ no_of_connects, user_id });
      if (connectUpdate) {
        console.log(`Connect updated for user: ${user_id}`);
      } else {
        console.error(`Failed to update connect for user: ${user_id}`);
        throw new Error("Failed to update connect for user");
      }
    } else {
      console.error(`Failed to create payment record for reference: ${reference}`);
      throw new Error("Failed to process payment");
    }
  } else {
    console.log(`Updating existing payment status for reference: ${reference}`);
    await Payment.updateConnects(no_of_connects, user_id);
  }

  return;

}

async function toolHandler(event) {
  const { amount, reference, status, metadata } = event.data;
  const { user_id, plan, start_date, end_date } = metadata;

  // Validate required data
  if (!reference || !amount || !status) {
    console.error('Missing required payment data');
    throw new Error("Invalid payment data");
  }

  // Check if payment already exists
  const existingPayment = await Payment.findToolsByReference(reference);
  if (!existingPayment) {
    console.log(`Creating new payment for reference: ${reference}`);
    const paymentRecord = await Payment.createTool({ amount, plan, reference, user_id, start_date, end_date });

    if (paymentRecord) {
      console.log(`Payment created successfully: ${paymentRecord.id}`);
      // Update subscriptions only if payment creation was successful
      const toolUpdate = await Payment.updateTool({ plan, user_id });
      if (toolUpdate) {
        console.log(`Tool updated for user: ${user_id}`);
      } else {
        console.error(`Failed to update tool for user: ${user_id}`);
        throw new Error("Failed to update tool for user");
      }
    } else {
      console.error(`Failed to create payment record for reference: ${reference}`);
      throw new Error("Failed to process payment");
    }
  } else {
    console.log(`Updating existing payment status for reference: ${reference}`);
    await Payment.updateTool(plan, user_id);
  }

  return;

}

async function promotionHandler(event) {
  const { amount, reference, status, metadata } = event.data;
  const { user_id, plan, start_date, end_date, product_id, duration } = metadata;

  // Validate required data
  if (!reference || !amount || !status) {
    console.error('Missing required payment data');
    throw new Error("Invalid payment data");
  }

  // Check if payment already exists
  const existingPayment = await Payment.findPromotionByReference(reference);
  if (!existingPayment) {
    console.log(`Creating new promotion for reference: ${reference}`);
    const paymentRecord = await Payment.createPromotion({ reference, product_id, duration, plan, amount, user_id, start_date, end_date });

    if (paymentRecord) {
      console.log(`Payment created successfully: ${paymentRecord.id}`);
      // Update subscriptions only if payment creation was successful
      const promotionUpdate = await Payment.updatePromotion({ user_id });
      if (promotionUpdate) {
        console.log(`Promotion updated for user: ${user_id}`);
      } else {
        console.error(`Failed to update promotion for user: ${user_id}`);
        throw new Error("Failed to update promotion for user");
      }
    } else {
      console.error(`Failed to create payment record for reference: ${reference}`);
      throw new Error("Failed to process payment");
    }
  } else {
    console.log(`Updating existing payment status for reference: ${reference}`);
    await Payment.updatePromotion(user_id);
  }

  return;

}
