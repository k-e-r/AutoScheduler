const express = require('express');
const {
  setCategories,
  getCategories,
  editCategories,
  deleteCategory,
} = require('./categories.controller');

const categoriesRouter = express.Router();

categoriesRouter.post('/', setCategories);
categoriesRouter.get('/', getCategories);
categoriesRouter.put('/:id', editCategories);
categoriesRouter.delete('/:id', deleteCategory);

module.exports = categoriesRouter;
