const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const noteData = require('./db/db.json');

const PORT = 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(noteData));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );


// const readAndAppend = (content, file) => {
//     fs.readFile(file, 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         const parsedData = JSON.parse(data);
//         parsedData.push(content);
//         writeToFile(file, parsedData);
//       }
//     });
//   };

// app.get('/api/notes', (req, res) => {
//  res.json(database);
// });

// app.post('/api/notes', (req, res) => {
  
//     const { title, text } = req.body;
  
//     if (req.body) {
//       const newNote = {
//         title,
//         text,
//         note_id: uuid(),
//       };
  
//       readAndAppend(newNote, './db/db.json');
//       res.json(`Note added!`);
//       database.push(newNote)
//     } else {
//       res.error('Error adding Note :(');
//     }
//   });

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
