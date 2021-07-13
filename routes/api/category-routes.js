const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
 try {
   const categoryData = await Location.findAll();
   res.status (200).json(categoryData);
 }
 catch (err) {
   res.status(500).json(err);
 }
});

router.get('/:id', (req, res) => {
try{
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{
      model:Product, through:ProductTag, as: 'associated_products'
    }]
  });
  if (!categoryData) {
    res.status(404).json({ message: 'no category found with this id'});
    return;
  }
  res.status(200).json(categoryData);}
  catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData); }
    catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Location.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;