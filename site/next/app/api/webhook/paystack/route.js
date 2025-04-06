import { NextResponse } from "next/server";
import crypto from "crypto";
import pool from "../../db";
// import { pool } from "@/lib/db"; // PostgreSQL connection

const PAYSTACK_SECRET = 'Bearer sk_live_0b40ab530a17bf672214c095e1b6f57d2c3dba2a';

// Save buyer transaction
async function save_buyer_transaction(buyer_id, payment_src, payment_type, app_fee, amount, date, reason) {
    try {
        // const pool = await NeonDB; // Ensure NeonDB resolves before use
        const query = `
            INSERT INTO buyer_transactions (
                buyer_id, payment_src, payment_type, app_fee, amount, date, reason
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id;
        `;

        const values = [buyer_id, payment_src, payment_type, app_fee, amount, date, reason];

        const result = await pool.query(query, values);
        return { bool: result.rowCount > 0 };
    } catch (err) {
        console.error("Database error:", err);
        return { bool: false, error: err.message };
    }
}

// Update order status after payment
async function update_order(product_id, buyer_id) {
    try {
        // const pool = await NeonDB; // Ensure NeonDB resolves before use

        const query = `
            UPDATE campus_express_buyer_orders 
            SET havePaid = $1
            WHERE buyer_id = $2 AND product_id = $3
            RETURNING order_id, stock, pick_up_channels;
        `;

        const values = [true, buyer_id, product_id];

        const result = await pool.query(query, values);

        if (result.rowCount > 0) {
            return {
                bool: true,
                order_id: result.rows[0].order_id,
                stock: result.rows[0].stock,
                address: result.rows[0].pick_up_channels?.[0]?.locale || null
            };
        } else {
            return { bool: false };
        }
    } catch (err) {
        console.error("Database error:", err);
        return { bool: false, error: err.message };
    }
}

export async function POST(req) {
    try {
        // Convert request to JSON
        const rawBody = await req.text();
        const event = JSON.parse(rawBody);

        // Validate Paystack signature
        const paystackSignature = req.headers.get("x-paystack-signature");
        const hash = crypto.createHmac("sha512", PAYSTACK_SECRET).update(rawBody).digest("hex");

        if (hash !== paystackSignature) {
            return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
        }

        // Extract data from event
        const { event: eventType, data } = event;
        const { reference, amount, status, customer, metadata } = data;
        const { buyer_info, product_info } = metadata;

        if (eventType === "charge.success") {
           
            // Save buyer transaction
            const transactionResult = await save_buyer_transaction(
                buyer_info.buyer_id, 
                'Paystack', 
                'checkout', 
                0, // Assuming app fee is 0 for now
                amount / 100, // Paystack amount is in kobo (1 kobo = 0.01 Naira)
                new Date(), 
                `Payment for order-${product_info.product_id}`
            );

            // If transaction saved successfully, update order
            if (transactionResult.bool) {
                await update_order(product_info.product_id, buyer_info.buyer_id);
            }

            return NextResponse.json({ message: "Payment processed and order updated" }, { status: 200 });
        }

        return NextResponse.json({ message: "Event not handled" }, { status: 200 });
    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
