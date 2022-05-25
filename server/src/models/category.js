const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: Array,
      trim: true,
      required: true,
    },
    color: {
      type: Array,
      trim: true,
      lowercase: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
