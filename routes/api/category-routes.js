const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories
    const categoryData = await Category.findAll({
     // Includes association with Products
     include: [{model: Product}],
   });
   res.status(200).json(categoryData);
 } catch (err) {
  res.status(500).json(err);
 }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value
    const categoryData = await Category.findByPk(req.params.id,{
      // Includes association with Products
      include:[{model: Product}],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that id!'});
      return; 
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category using Post
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value using put
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      // Return error message when no data is found
      res.status(404).json({ message: 'No category with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!categoryData) {
      // Return error message when no data is found
      res.status(404).json({ message: 'No category with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
