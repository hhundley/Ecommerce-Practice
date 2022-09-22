const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [
        { model: Product}
    ]
})
  .then((categoryData) => res.status(200).json(categoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    // be sure to include its associated Products
    include: [
      { model: Product}
  ],
})
.then((categoryData) => {
  if (!categoryData) {
    res.status(404).json({message: "Category not found"});
    return;
  }
  res.status(200).json(categoryData);
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryName) => res.status(200).json(categoryName))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {id: req.params.id},
    }
  )
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "Category not found." });
        return;
      }
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id}
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'Category not found.' });
        return;
      }
      res.status(200).json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
