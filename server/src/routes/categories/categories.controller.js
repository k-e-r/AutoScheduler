const Category = require('../../models/category');

const setCategories = (req, res) => {
  const categories = new Category(req.body);

  categories
    .save()
    .then(() => {
      res.status(201).json({
        msg: 'set category suceeded',
        categories,
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: 'set category failed',
        err,
      });
    });
};

const getCategories = (req, res) => {
  const userId = req.params.id;

  Category.find({ userId: userId })
    .then((category) => {
      res.status(200).json({
        msg: 'get category succeeded',
        category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        msg: 'get category failed',
        err,
      });
    });
};

const editCategories = (req, res) => {
  const userId = req.params.id;

  try {
    Category.findOneAndUpdate(
      { userId },
      {
        $set: req.body,
      },
      (err, docs) => {
        if (err) {
          res.status(404).json({
            msg: 'category not found',
            err,
          });
        } else {
          res.status(200).json({
            msg: 'update category succeeded',
            category: docs,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      msg: 'update failed',
      err,
    });
  }
};

const deleteCategory = (req, res) => {
  const userId = req.params.id;

  try {
    Category.findOneAndDelete({ userId }, (err, docs) => {
      if (err) {
        res.status(404).json({
          msg: 'category not found',
          err,
        });
      } else {
        res.status(200).json({
          msg: 'delete category succeeded',
          category: docs,
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      msg: 'delete failed',
      err,
    });
  }
};

module.exports = {
  setCategories,
  getCategories,
  editCategories,
  deleteCategory,
};
