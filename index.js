import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

// set up __dirname for pathing
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Start app and define port
const app = express();
const port = 3000;

// import the characters file
var characters = JSON.parse(fs.readFileSync("./data/characters.json", "utf8"));

// GET request docs
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// GET request for a random character
app.get("/characters/random", (req, res) => {
  // generate a random index within the range of the Characters Array
  const randomIndex = Math.floor(Math.random() * characters.length);

  res.json(characters[randomIndex]);
});

// Configure port that server will run on
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
