const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.render("index", { messages: messages, getMessageTime: getMessageTime });
});

router.get("/new", (req, res) => {
  res.render("form");
});

router.post("/new", (req, res) => {
  console.log(req.body.name);
  messages.push({
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
  });
  res.redirect("/");
});

router.get("/message", (req, res) => {
  const name = req.query.name;
  const added = req.query.time;
  const message = messages.find(
    (message) =>
      message.user === name && getMessageTime(message.added) === added
  ).text;

  res.render("message", { name, added, message });
});

module.exports = router;
