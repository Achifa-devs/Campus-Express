import { NextResponse } from "next/server";
import twilio from "twilio";

// Load environment variables
const accountSid = 'ACb418b6a71d0ca132970c0ed14982352b';
    const authToken = '0c0d2367d5049f9dbe92a39e44c6cfa6';
const client = twilio(accountSid, authToken);

export async function POST(req) {
    try {
        const { to } = await req.json(); // Get recipient number from request body

        const message = await client.messages.create({
            from: "whatsapp:+14155238886", // Twilio WhatsApp sandbox number
            contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",
            contentVariables: JSON.stringify({ "1": "12/1", "2": "3pm" }),
            to: `whatsapp:${to}`,
        });

        return NextResponse.json({ success: true, messageSid: message.sid });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
