const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
