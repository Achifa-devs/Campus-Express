const Payment = require('../models/payment');


const handleWebhook = async (req, res) => {
  try {
    const event = req.body;

    // Log incoming webhook for debugging
    console.log('Received webhook event:', event.event);

    // Assuming event is from Paystack
    if (event.event === 'charge.success') {
      const { amount, currency, reference, status, customer } = event.data;
      const { plan, start_date, end_date, user_id } = customer.metadata;

      console.log(customer)

      // Validate required data
      if (!reference || !amount || !status) {
        console.error('Missing required payment data');
        return res.status(400).send('Invalid payment data');
      }

      // Check if payment already exists
      const existingPayment = await Payment.findByReference(reference);
      if (!existingPayment) {
        console.log(`Creating new payment for reference: ${reference}`);
        const paymentRecord = await Payment.create({ amount, currency, status, reference });

        if (paymentRecord) {
          console.log(`Payment created successfully: ${paymentRecord.id}`);
          // Update subscriptions only if payment creation was successful
          const subscriptionUpdate = await Payment.updateSubscriptions(plan, start_date, end_date, user_id);
          if (subscriptionUpdate) {
            console.log(`Subscription updated for user: ${user_id}`);
          } else {
            console.error(`Failed to update subscription for user: ${user_id}`);
          }
        } else {
          console.error(`Failed to create payment record for reference: ${reference}`);
          return res.status(500).send('Failed to process payment');
        }
      } else {
        console.log(`Updating existing payment status for reference: ${reference}`);
        await Payment.updateStatus(reference, status);
      }

      res.status(200).send('Webhook processed successfully');
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