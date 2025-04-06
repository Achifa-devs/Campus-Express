// pages/api/sendEmail.js

import nodemailer from 'nodemailer';
import { PWD_RESET_TEMPLATE } from './template';
import shortid from 'shortid';
import pool from '@/app/api/db';

export async function POST(req) {
  const { email } = req.body; // Get email details from request body

  const res = await pool.query(`SELECT * FROM campus_sellers WHERE email='${email}'`);
  let name = `${res.rows[0]?.fname} ${res.rows[0]?.lname}`
  let token = Math.floor(100000 + Math.random() * 900000).toString();
  const html = PWD_RESET_TEMPLATE(name,token)
  // Set up the email transporter using SMTP (Gmail for example)
  
}
