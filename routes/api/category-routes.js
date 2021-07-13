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
    // update product data
    Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((category) => {
        // find all associated tags from ProductTag
        return Tag.findAll({ where: { product_id: req.params.id } });
      })
      .then((Tag) => {
        // get list of current tag_ids
        const tagIds = Tag.map(({ tag_id }) => tag_id);
        // create filtered list of new tag_ids
        const newTag = req.body.tagIds
          .filter((tag_id) => !tagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });
        // figure out which ones to remove
        const tagsToRemove = Tag
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
  
        // run both actions
        return Promise.all([
          ProductTag.destroy({ where: { id: tagsToRemove } }),
          Tag.bulkCreate(newTags),
        ]);
      })
      .then((updatedTags) => res.json(updatedTags))
      .catch((err) => {
        // console.log(err);
        res.status(400).json(err);
      });
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