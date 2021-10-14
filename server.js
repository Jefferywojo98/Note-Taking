const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

const app = express();
// this is where my local server/heroku port will be
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "./public"));
// to grab the notes
app.get("/api/notes", function(req, res) {
  readAsync("./db/db.json", "utf8").then(function(data) {
      notes = [].concat(JSON.parse(data))
      res.json(notes);
    })
}); 
// post to notes
app.post("/api/notes", function(req, res) {
    const note = req.body;
    readAsync("./db/db.json", "utf8").then(function(data) {
      const notes = [].concat(JSON.parse(data));
      note.id = notes.length + 1
      notes.push(note);
      return notes
    }).then(function(notes) {
      writeAsync("./db/db.json", JSON.stringify(notes))
      res.json(note);
    })
});
// deleting of notes
app.delete("/api/notes/:id", function(req, res) {
  const idToDelete = parseInt(req.params.id);
  readAsync("./db/db.json", "utf8").then(function(data) {
    const notes = [].concat(JSON.parse(data));
    const newNotesData = []
    for (let i = 0; i<notes.length; i++) {
      if(idToDelete !== notes[i].id) {
        newNotesData.push(notes[i])
      }
    }
    return newNotesData
  }).then(function(notes) {
    writeAsync("./db/db.json", JSON.stringify(notes))
    res.send('Note been save!');
  })
})
// the get of HTML
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
// here is the *. since it a * it has to be on the botton or it will not work 
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
 });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

