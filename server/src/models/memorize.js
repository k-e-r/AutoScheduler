const mongoose = require('mongoose');

const memorizeSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    baseId: {
      type: ObjectId,
      trim: true,
      required: true,
    },
    times: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Memorize = mongoose.model('Memorize', memorizeSchema);

module.exports = Memorize;
