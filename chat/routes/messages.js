// src/routes/messages.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Get messages for a conversation (pagination)
router.get('/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const limit = parseInt(req.query.limit || '50', 10);
    const offset = parseInt(req.query.offset || '0', 10);

    // ensure user is a participant
    const check = await db.query('SELECT 1 FROM conversation_participants WHERE conversation_id = $1 AND user_id = $2', [conversationId, req.user.id]);
    if (check.rowCount === 0) return res.status(403).json({ error: 'forbidden' });

    const q = `
      SELECT m.*, u.username as sender_name, u.profile_image as sender_profile
      FROM messages m
      LEFT JOIN users u ON u.id = m.sender_id
      WHERE m.conversation_id = $1
      ORDER BY m.created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const { rows } = await db.query(q, [conversationId, limit, offset]);
    res.json({ messages: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

module.exports = router;
