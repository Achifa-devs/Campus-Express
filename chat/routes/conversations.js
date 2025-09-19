// src/routes/conversations.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Create or get a 1-to-1 conversation between two users
router.post('/create', async (req, res) => {
  try {
    const { other_user_id } = req.body;
    const user_id = req.user.id;

    // Check existing conversation (two participants)
    const q = `
      SELECT c.id
      FROM conversations c
      JOIN conversation_participants p1 ON p1.conversation_id = c.id AND p1.user_id = $1
      JOIN conversation_participants p2 ON p2.conversation_id = c.id AND p2.user_id = $2
      LIMIT 1
    `;
    const r = await db.query(q, [user_id, other_user_id]);
    if (r.rows.length > 0) {
      return res.json({ conversation_id: r.rows[0].id });
    }

    // create conversation
    const insertC = await db.query('INSERT INTO conversations DEFAULT VALUES RETURNING id');
    const conversation_id = insertC.rows[0].id;

    // insert participants
    await db.query('INSERT INTO conversation_participants (conversation_id, user_id) VALUES ($1, $2), ($1, $3)', [conversation_id, user_id, other_user_id]);

    return res.json({ conversation_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

// Get chat list for current user
router.get('/list', async (req, res) => {
  try {
    const user_id = req.user.id;

    const q = `
      SELECT c.id as chat_id,
             json_agg(
               json_build_object('user_id', u.id, 'username', u.username, 'profile_image', u.profile_image)
             ) FILTER (WHERE u.id IS NOT NULL) as participants,
             lm.id as last_message_id,
             lm.sender_id as last_sender_id,
             lm.content as last_text,
             lm.media_url as last_media,
             lm.message_type as last_type,
             lm.created_at as last_timestamp,
             COALESCE(unread_counts.unread_count, 0) as unread_count
      FROM conversations c
      JOIN conversation_participants cp ON cp.conversation_id = c.id
      JOIN conversation_participants cp_me ON cp_me.conversation_id = c.id AND cp_me.user_id = $1
      LEFT JOIN LATERAL (
        SELECT m.* FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1
      ) lm ON true
      LEFT JOIN LATERAL (
        SELECT COUNT(*)::int as unread_count
        FROM messages m
        LEFT JOIN message_status ms ON ms.message_id = m.id AND ms.user_id = cp_me.user_id
        WHERE m.conversation_id = c.id
          AND (ms.status IS NULL OR ms.status != 'read')
          AND m.sender_id != cp_me.user_id
      ) unread_counts ON true
      LEFT JOIN users u ON u.id = cp.user_id AND u.id != $1
      WHERE cp_me.user_id = $1
      GROUP BY c.id, lm.id, lm.sender_id, lm.content, lm.media_url, lm.message_type, lm.created_at, unread_counts.unread_count
      ORDER BY COALESCE(lm.created_at, c.updated_at) DESC;
    `;
    const { rows } = await db.query(q, [user_id]);
    // rows contain participants arrays with the other participant (or multiple but in 1-to-1 it's one)
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

module.exports = router;
