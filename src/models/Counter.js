const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  count: {
    type: Number
  },
  lastApplied: {
    type: Date
  }
});

module.exports = Counter = mongoose.model('Counter', CounterSchema);
