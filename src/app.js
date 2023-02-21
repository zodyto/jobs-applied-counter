require("dotenv").config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const connectDB = require('./config/db.config');

const app = express();

app.set('view engine', 'ejs');
app.set('views', ('./src/views/'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Connect Database
connectDB();

// Load Model
const Counter = require('./models/Counter');

const counterId = new mongoose.mongo.ObjectId('63f4f1b7e0f621c600bc8acf');
let renderOptions = {
  count: 0,
  lastApplied: new Date()
}

const getFormattedDate = (date) => {
  if (!date) {
    return 
  } else {
    return dayjs(date).format('DD/MM/YYYY');
  }
}

const updateRenderOptions = (count, lastApplied) => {
  renderOptions.count = count;
  renderOptions.lastApplied = lastApplied;
}

// @route GET /
// @description increment count page
// @access Public
app.get('/', (req, res) => {
  Counter.findById(counterId, (err, counterResult) => {
    if (err) {
      console.log(err);
    } else {
      const formattedDate = getFormattedDate(counterResult.lastApplied);
      updateRenderOptions(counterResult.count, formattedDate);
      res.render('increment', renderOptions);
    }
  })
});

// @route POST /increment
// @description increment form submit
// @access Public
app.post('/increment', (req, res) => {
  Counter.findById(counterId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const currentDate = new Date();
      const newCount = result.count + 1;
      Counter.findByIdAndUpdate(counterId, {
        count: newCount,
        lastApplied: currentDate
      }, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const formattedDate = getFormattedDate(result.lastApplied);
          updateRenderOptions(result.count, formattedDate);
          res.redirect('/');
        }
      })
    }
  });
});

// @route GET /minus
// @description decrement count page
// @access Public
app.get('/minus', (req, res) => {
  Counter.findById(counterId, (err, counterResult) => {
    if (err) {
      console.log(err);
    } else {
      const formattedDate = getFormattedDate(counterResult.lastApplied);
      updateRenderOptions(counterResult.count, formattedDate);
      res.render('decrement', renderOptions);
    }
  })
});

// @route POST /decrement
// @description decrement form submit
// @access Public
app.post('/decrement', (req, res) => {
  Counter.findById(counterId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const currentDate = new Date();
      const newCount = result.count - 1;
      if (newCount < 0) {
        return res.redirect('/minus');
      }
      Counter.findByIdAndUpdate(counterId, {
        count: newCount,
        lastApplied: currentDate
      }, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const formattedDate = getFormattedDate(result.lastApplied);
          updateRenderOptions(result.count, formattedDate);
          res.redirect('/minus');
        }
      })
    }
  });
});

const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
})