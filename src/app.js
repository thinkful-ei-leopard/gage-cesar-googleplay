const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore.js');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Hey get outta here! You\'re supposed to be on the /apps path!');
});

app.get('/apps', (req, res) => {
  let appArr = [...playstore];
  const validGenres = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];
  if (req.query.genres) {
    if (validGenres.includes(req.query.genres.toLowerCase())) {
      appArr = playstore.filter(app => app.Genres.toLowerCase() === req.query.genres.toLowerCase());
    } else {
      res
        .status(400)  
        .send('You have queried an invalid genre. Please look at your "genres" param');
    }
  }
  if (req.query.sort) {
    if(req.query.sort === 'rating') {
      appArr = appArr.sort((a, b) => {
        return b.Rating - a.Rating;
      });
    } else if (req.query.sort === 'app') {
      appArr = appArr.sort((a, b) => {
        var appA = a.App.toLowerCase();
        var appB = b.App.toLowerCase();
        if (appA < appB) {
          return -1;
        }
        if (appA > appB) {
          return 1;
        }
        return 0;
      });
    } else {
      res.send('The sort method you picked is invalid. Please make sure it is either by \'rating\' or by \'app\'');
    }
  }
  res.send(appArr);
});

module.exports = app;