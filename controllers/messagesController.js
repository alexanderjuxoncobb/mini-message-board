const { add } = require("date-fns");
const db = require("../db/queries");

async function getMessages() {
  const messages = await db.getMessages();
  // console.log("Messages: ", messages);
  return messages;
  //   let usernames;
  //   if (req.query.search) {
  //     usernames = await db.getFilteredUsernames(req.query.search);
  //     console.log("1");
  //   } else {
  //     usernames = await db.getAllUsernames();
  //     console.log("2");
  //   }
}

async function addNewMessage(message) {
  await db.addNewMessage(message);
}

async function findMessage(id) {
  const message = await db.findMessage(id);
  return message;
}

module.exports = {
  getMessages,
  addNewMessage,
  findMessage,
};
