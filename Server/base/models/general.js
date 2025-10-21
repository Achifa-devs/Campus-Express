const pool =  require('../config/database')

module.exports = async function getCurrentVersion() {
    const { rows } = await pool.query(
        `SELECT * FROM app
        ORDER BY id DESC
        LIMIT 1`
    )
    return rows[0]
}


module.exports = async function updateFirebaseTokenByid({fcm, user_id}) {
    const { rows } = await pool.query(
        `UPDATE users SET fcm = $1 WHERE user_id = $2
       RETURNING *`,
      [fcm, user_id]
    )
    return rows[0]
}

