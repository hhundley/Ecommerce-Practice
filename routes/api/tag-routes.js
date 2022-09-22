const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // be sure to include its associated Products
    include: [
        { model: Product,
          through: ProductTag}
    ]
})
  .then((tagData) => res.status(200).json(tagData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    // be sure to include its associated Products
    include: [
      { model: Product,
        through: ProductTag}
  ],
})
.then((tagData) => {
  if (!tagData) {
    res.status(404).json({message: "Tag not found"});
    return;
  }
  res.status(200).json(tagData);
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.category_name,
  })
    .then((tagName) => res.status(200).json(tagName))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.category_name,
    },
    {
      where: {id: req.params.id},
    }
  )
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "Tag not found." });
        return;
      }
      res.status(200).json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {id: req.params.id}
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'Tag not found.' });
        return;
      }
      res.status(200).json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
