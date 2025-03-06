const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController.js");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

function getMessageTime(timestamp) {
  const date = new Date(timestamp);

  // Standard time format: HH:MM:SS
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

router.get("/", async (req, res) => {
  const messages = await messagesController.getMessages();
  console.log("Messages look like:", messages);
  res.render("index", {
    messages: messages,
    getMessageTime: getMessageTime,
  });
});

router.get("/new", (req, res) => {
  res.render("form");
});

router.post("/new", async (req, res) => {
  console.log(req.body);

  await messagesController.addNewMessage({
    text: req.body.message,
    username: req.body.name,
    added: getMessageTime(new Date()),
  });

  res.redirect("/");
});

router.get("/message", async (req, res) => {
  const id = req.query.id;

  const [message] = await messagesController.findMessage(id);

  res.render("message", {
    name: message.username,
    added: message.added,
    message: message.text,
  });
});

module.exports = router;
