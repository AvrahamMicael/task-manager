const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Task', taskSchema);
