import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//universal function to get _id for next objects in JSON files
let getLastId = (dataJSON) => {
  let maxId = 0;
  let data = JSON.parse(dataJSON);
  for (let i = 0; i < data.length; i++) {
      if (data[i]._id >= maxId)
          maxId = data[i]._id;
  }
  return maxId;
}

//MOVIES
app.get('/movies', (req, res) => {
  fs.readFile('data/movies.json', 'utf8', (err, moviesJson) => {
      if (err) {
          console.log("File read failed in GET /movies"+" : "+ err);
          res.status(500).send('File read failed');
          return;
      }
      console.log("GET: /movies");
      res.send(moviesJson);
  });
});

app.get('/movies/:_id', (req, res) => {
  fs.readFile('data/movies.json', 'utf8', (err, moviesJson) => {
      if (err) {
          console.log("File read failed in GET /movies/:_id" + req.params._id + ": "+ err);
          res.status(500).send('File read failed');
          return;
      }
      let movies = JSON.parse(moviesJson);
      let movie = movies.find(movietmp => movietmp._id == req.params._id);
      console.log("movie find", movie)
      if (!movie) {
          console.log("Can't find movie with _id: " + req.params._id);
          res.status(500).send("Can't find movie with _id: " + req.params._id);
          return;
      }
      let movieJSON = JSON.stringify(movie);
      console.log("GET /movies/" + req.params._id);
      res.send(movieJSON);
  });
});

app.post('/movies', (req, res) => {
  fs.readFile('data/movies.json', 'utf8', (err, moviesJson) => {
      if (err) {
          console.log("File read failed in POST /movies"+" : "+ err);
          res.status(500).send('File read failed');
          return;
      }
      let movies = JSON.parse(moviesJson);
      let _id = getLastId(moviesJson);
      console.log("get last _id:", _id)
      _id = _id + 1;
      if (_id) {
          req.body._id = _id;
          movies.push(req.body);
          var newList = JSON.stringify(movies);
          fs.writeFile('data/movies.json', newList, err => {
              if (err) {
                  console.log('Error writing file in POST /movies', err);
                  res.status(500).send('Error writing file data/movies.json');
              } else {
                  res.status(201).send(req.body);
                  console.log('Successfully wrote file data/movies.json and added new movie with _id = ' + req.body._id);
              }
          });
      } else {
          console.log("File read failed in POST /movies", err);
          res.status(500).send('File read failed');
          return;
      }
  });
});


app.put('/movies/:_id', (req, res) => {
  fs.readFile('data/movies.json', 'utf8', (err, moviesJson) => {
      if (err) {
          console.log("File read failed in PUT /movies/" + req.params._id+": "+ err);
          res.status(500).send('File read failed');
          return;
      }

      let movies = JSON.parse(moviesJson);
      let movieBody = movies.find(movietmp => movietmp._id == req.body._id);
      if (movieBody && movieBody._id != req.body._id) {
          console.log("movie with _id = " + movieBody._id + " already exists");
          res.status(500).send('movie with _id = ' + movieBody._id + ' already exists');
          return;
      }
      let movie = movies.find(movietmp => movietmp._id == req.params._id);
      if (!movie) {
          movies.push(req.body);
          let newList = JSON.stringify(movies);
          fs.writeFile('data/movies.json', newList, err => {
              if (err) {
                  console.log("Error writing file in PUT /movies/" + req.params._id+": "+err);
                  res.status(500).send('Error writing file data/movies.json');
              } else {
                  res.status(201).send(req.body);
                  console.log("Successfully wrote file data/movies.json - added new movie with _id = " + req.body._id);
              }
          });
      } else {
          for (let i = 0; i < movies.length; i++) {
              if (movies[i]._id == movie._id) {
                  movies[i] = req.body;
              }
          }
          let newList = JSON.stringify(movies);
          fs.writeFile('data/movies.json', newList, err => {
              if (err) {
                  console.log("Error writing file in PUT /movies/" + req.params._id+": "+ err);
                  res.status(500).send('Error writing file data.movies.json');
              } else {
                  res.status(200).send(req.body);
                  console.log("Successfully wrote file data/movies.json and edit movie with old _id = " + req.params._id);
              }
          });
      }
  });
});

app.delete('/movies/:_id', (req, res) => {
  fs.readFile('data/movies.json', 'utf8', (err, moviesJson) => {
      if (err) {
          console.log("File read failed in DELETE /movies" +" : "+ err);
          res.status(500).send('File read failed');
          return;
      }
      var movies = JSON.parse(moviesJson);
      var _id = movies.findIndex(movietmp => movietmp._id == req.params._id);

      if (_id != -1) {
          movies.splice(_id, 1);
          var newList = JSON.stringify(movies);

          fs.writeFile('data/movies.json', newList, err => {
              if (err) {
                  console.log('Error writing file in DELETE /movies/' + req.params._id, err);
                  res.status(500).send('Error writing file data/movies.json');
              } else {
                  res.status(204).send();
                  console.log('Successfully deleted movie with _id = ' + req.params._id);
              }
          });
      } else {
          console.log("Movie with _id = " + req.params._id + " does not exist");
          res.status(500).send('Movie with _id = ' + req.params._id + ' does not exist');
          return;
      }
  });
});

//ROOMS
app.get('/rooms', (req, res) => {
  fs.readFile('data/rooms.json', 'utf8', (err, roomsJson) => {
      if (err) {
          console.log("File read failed in GET /rooms"+" : "+ err);
          res.status(500).send('File read failed');
          return;
      }
      console.log("GET: /rooms");
      res.send(roomsJson);
  });
});

app.get('/rooms/:_id', (req, res) => {
  fs.readFile('data/rooms.json', 'utf8', (err, roomsJson) => {
      if (err) {
          console.log("File read failed in GET /rooms/:_id" + req.params._id + ": "+ err);
          res.status(500).send('File read failed');
          return;
      }
      let rooms = JSON.parse(roomsJson);
      let room = rooms.find(roomtmp => roomtmp._id == req.params._id);
      if (!room) {
          console.log("Can't find room with _id: " + req.params._id);
          res.status(500).send("Can't find room with _id: " + req.params._id);
          return;
      }
      let roomsJSON = JSON.stringify(room);
      console.log("GET /rooms/" + req.params._id);
      res.send(roomsJSON);
  });
});

//SHOWINGS
app.get('/showings', (req, res) => {
  fs.readFile('data/showings.json', 'utf8', (err, showingsJson) => {
      if (err) {
          console.log("File read failed in GET /showings"+" : "+ err);
          res.status(500).send('File read failed');
          return;
      }
      console.log("GET: /showings");
      res.send(showingsJson);
  });
});

app.get('/showings/:_id', (req, res) => {
  fs.readFile('data/showings.json', 'utf8', (err, showingsJson) => {
      if (err) {
          console.log("File read failed in GET /showings/:_id" + req.params._id + ": "+ err);
          res.status(500).send('File read failed');
          return;
      }
      let showings = JSON.parse(showingsJson);
      let showing = showings.find(showingtmp => showingtmp._id == req.params._id);
      console.log("showing find", showing)
      if (!showing) {
          console.log("Can't find showing with _id: " + req.params._id);
          res.status(500).send("Can't find showing with _id: " + req.params._id);
          return;
      }
      let showingJSON = JSON.stringify(showing);
      console.log("GET /showings/" + req.params._id);
      res.send(showingJSON);
  });
});

app.post('/showings', (req, res) => {
  fs.readFile('data/showings.json', 'utf8', (err, showingsJson) => {
      if (err) {
          console.log("File read failed in POST /showings"+" : "+ err);
          res.status(500).send('File read failed');
          return;
      }
      let showings = JSON.parse(showingsJson);
      let _id = getLastId(showingsJson);
      console.log("get last _id:", _id)
      _id = _id + 1;
      if (_id) {
          req.body._id = _id;
          showings.push(req.body);
          var newList = JSON.stringify(showings);
          fs.writeFile('data/showings.json', newList, err => {
              if (err) {
                  console.log('Error writing file in POST /showings', err);
                  res.status(500).send('Error writing file data/showings.json');
              } else {
                  res.status(201).send(req.body);
                  console.log('Successfully wrote file data/showings.json and added new showing with _id = ' + req.body._id);
              }
          });
      } else {
          console.log("File read failed in POST /showings", err);
          res.status(500).send('File read failed');
          return;
      }
  });
});


app.put('/showings/:_id', (req, res) => {
  fs.readFile('data/showings.json', 'utf8', (err, showingsJson) => {
      if (err) {
          console.log("File read failed in PUT /showings/" + req.params._id+": "+ err);
          res.status(500).send('File read failed');
          return;
      }

      let showings = JSON.parse(showingsJson);
      let showingBody = showings.find(showingtmp => showingtmp._id == req.body._id);
      if (showingBody && showingBody._id != req.body._id) {
          console.log("showing with _id = " + showingBody._id + " already exists");
          res.status(500).send('showing with _id = ' + showingBody._id + ' already exists');
          return;
      }
      let showing = showings.find(showingtmp => showingtmp._id == req.params._id);
      if (!showing) {
          showings.push(req.body);
          let newList = JSON.stringify(showings);
          fs.writeFile('data/showings.json', newList, err => {
              if (err) {
                  console.log("Error writing file in PUT /showings/" + req.params._id+": "+err);
                  res.status(500).send('Error writing file data/showings.json');
              } else {
                  res.status(201).send(req.body);
                  console.log("Successfully wrote file data/showings.json - added new showing with _id = " + req.body._id);
              }
          });
      } else {
          for (let i = 0; i < showings.length; i++) {
              if (showings[i]._id == showing._id) {
                  showings[i] = req.body;
              }
          }
          let newList = JSON.stringify(showings);
          fs.writeFile('data/showings.json', newList, err => {
              if (err) {
                  console.log("Error writing file in PUT /showings/" + req.params._id+": "+ err);
                  res.status(500).send('Error writing file data.showings.json');
              } else {
                  res.status(200).send(req.body);
                  console.log("Successfully wrote file data/showings.json and edit showing with old _id = " + req.params._id);
              }
          });
      }
  });
});

app.delete('/showings/:_id', (req, res) => {
  fs.readFile('data/showings.json', 'utf8', (err, showingsJson) => {
      if (err) {
          console.log("File read failed in DELETE /showings" +" : "+ err);
          res.status(500).send('File read failed');
          return;
      }
      var showings = JSON.parse(showingsJson);
      var _id = showings.findIndex(showingtmp => showingtmp._id == req.params._id);

      if (_id != -1) {
          showings.splice(_id, 1);
          var newList = JSON.stringify(showings);

          fs.writeFile('data/showings.json', newList, err => {
              if (err) {
                  console.log('Error writing file in DELETE /showings/' + req.params._id, err);
                  res.status(500).send('Error writing file data/showings.json');
              } else {
                  res.status(204).send();
                  console.log('Successfully deleted showing with _id = ' + req.params._id);
              }
          });
      } else {
          console.log("Showing with _id = " + req.params._id + " does not exist");
          res.status(500).send('Showing with _id = ' + req.params._id + ' does not exist');
          return;
      }
  });
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));
