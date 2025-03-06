#! /usr/bin/env node
const pool = require("./pool.js");

function getMessageTime(timestamp) {
  const date = new Date(timestamp);

  // Standard time format: HH:MM:SS
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 255 ),
  username VARCHAR ( 255 ),
  added VARCHAR ( 255 )
);

INSERT INTO messages (text, username, added) 
VALUES
  ('Hello you', 'Bob', '${getMessageTime(new Date())}'),
  ('Hey! How is it going?', 'Odin', '${getMessageTime(new Date())}')
`;

async function main() {
  console.log("seeding again...");

  try {
    // await pool.connect();
    await pool.query(SQL);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await pool.end();
    console.log("done");
  }
}

main();
