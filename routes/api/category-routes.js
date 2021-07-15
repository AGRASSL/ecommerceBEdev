const router = require('express').Router();
const { Category, Product, } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
 try {
   const categoryData = Category.findAll({
     include:{
       model: Product,
       attributes: ['product_name']
     }
   });
   res.status (200).json(categoryData);
 }
 catch (err) {
   res.status(500).json(err);
 }
});

router.get('/:id', (req, res) => {
try{
  const categoryData = Category.findOne(req.params.id, {
    include: [{
      model:Product, 
      attributes: ['category_id']
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

//create new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
    // update product data
    Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No Category found with that ID.' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = Location.destroy({
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