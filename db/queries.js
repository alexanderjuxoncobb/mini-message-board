// const { findMessage } = require("../controllers/messagesController");
const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function addNewMessage(message) {
  await pool.query(
    `INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)`,
    [message.text, message.username, message.added]
  );
}

async function findMessage(id) {
  const { rows } = await pool.query("select * from messages where id = $1", [
    id,
  ]);
  console.log(rows);
  return rows;
}

module.exports = {
  getMessages,
  addNewMessage,
  findMessage,
};
