// pages/api/verify.js

import twilio from 'twilio';

export default async function handler(req, res) {
  // Check if it's a POST request
  if (req.method === 'POST') {
    const { phoneNumber } = req.body; // Get phone number from the request body

    // Twilio credentials
    const accountSid = 'ACb418b6a71d0ca132970c0ed14982352b';
    const authToken = '0c0d2367d5049f9dbe92a39e44c6cfa6';
    const client = twilio(accountSid, authToken);

    try {
      // Create a verification request
      const verification = await client.verify.v2.services("VA3c51cf6e24c411a78643b3d292267387")
        .verifications
        .create({ to: phoneNumber, channel: 'sms' });

      // Send the verification SID in the response
      res.status(200).json({ verificationSid: verification.sid });
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Failed to initiate verification', details: error.message });
    }
  } else {
    // Handle method not allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
