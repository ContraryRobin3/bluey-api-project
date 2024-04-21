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

// GET request for all characters
app.get("/characters", (req, res) => {
  res.json(characters);
});

/// GET request filtered character list
app.get("/characters/filter", (req, res) => {
  const name = req.query.name;
  const breed = req.query.breed;
  let foundCharacters = characters;

  // If name query is present filter on name
  if (name) {
    foundCharacters = foundCharacters.filter((character) =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // If breed query is present filter on breed
  if (breed) {
    foundCharacters = foundCharacters.filter(
      (character) => character.breed === breed
    );
  }

  res.json(foundCharacters);
});

// GET request for character by id
app.get("/characters/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundCharacter = characters.find((character) => character.id === id);
  if (foundCharacter) {
    res.json(foundCharacter);
  } else {
    res.sendStatus(404);
  }
});

/// TODO GET request location random

/// TODO GET request location by Id

// Configure port that server will run on
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
