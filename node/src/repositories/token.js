import pool from "../config/db.js";
import {
    errorHandler
} from "../utils/erroHandler.js";

export async function createToken(type, token, recipient) {
  const result = await pool.query(
    `INSERT INTO token (
    id, type, token, date, recipient, expires_at
    ) VALUES (
        DEFAULT, $1, $2, $3, $4, NOW() + interval '10 minutes'
    )`,
    [
      type, token, `${new Date()}`, recipient
    ]
  );
  const response = await errorHandler(result?.rowCount);
  return response;
}