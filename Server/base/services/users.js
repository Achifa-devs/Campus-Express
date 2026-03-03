// auth-service.js

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const pool = require("./db"); // pg pool
const jwt = require("jsonwebtoken");

/* ===============================
   Custom Domain Errors
================================ */

class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);
  }
}

class AuthError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

/* ===============================
   Utility Functions
================================ */

function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function generateJWT(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

/* ===============================
   Register User
================================ */

async function registerUser(payload) {
  const { fname, lname, email, phone, password } = payload;

  const hashedPwd = await bcrypt.hash(password, 12);

  try {
    const result = await pool.query(
      `
      INSERT INTO users (fname, lname, email, phone, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, fname, lname, email
      `,
      [fname, lname, email, phone, hashedPwd]
    );

    const user = result.rows[0];

    return {
      user,
      token: generateJWT(user.id),
    };

  } catch (err) {
    // Rely on DB unique constraints
    if (err.code === "23505") {
      throw new ConflictError("Email or phone already exists");
    }
    throw err;
  }
}

/* ===============================
   Login User
================================ */

async function loginUser({ email, password }) {
  const result = await pool.query(
    "SELECT id, password FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new AuthError("Invalid credentials");
  }

  const user = result.rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new AuthError("Invalid credentials");
  }

  return {
    token: generateJWT(user.id),
  };
}

/* ===============================
   Request Password Reset
================================ */

async function requestPasswordReset(email) {
  const result = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    // Avoid leaking whether email exists
    return;
  }

  const userId = result.rows[0].id;

  const rawToken = generateResetToken();
  const hashed = hashToken(rawToken);

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min

  await pool.query(
    `
    INSERT INTO password_resets (user_id, token_hash, expires_at)
    VALUES ($1, $2, $3)
    `,
    [userId, hashed, expiresAt]
  );

  // In production: send rawToken via email
  return rawToken;
}

/* ===============================
   Reset Password (Transactional)
================================ */

async function resetPassword({ token, newPassword }) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const hashed = hashToken(token);

    const result = await client.query(
      `
      SELECT user_id, expires_at
      FROM password_resets
      WHERE token_hash = $1
      FOR UPDATE
      `,
      [hashed]
    );

    if (result.rows.length === 0) {
      throw new AuthError("Invalid or expired token");
    }

    const reset = result.rows[0];

    if (new Date(reset.expires_at) < new Date()) {
      throw new AuthError("Token expired");
    }

    const hashedPwd = await bcrypt.hash(newPassword, 12);

    await client.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPwd, reset.user_id]
    );

    await client.query(
      "DELETE FROM password_resets WHERE token_hash = $1",
      [hashed]
    );

    await client.query("COMMIT");

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
};
