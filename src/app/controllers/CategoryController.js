const CategoriesRepository = require('../repository/CategoriesRepository');

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query;
    // List all registered categories
    const categories = await CategoriesRepository.findAll(orderBy);

    res.json(categories);
  }

  async show(req, res) {
    // Get one registered category
    const { id } = req.params;
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      // Not found
      return res.status(404).json({ errorMessage: 'Category not found' });

    }
    res.json(category);
  }

  async store(req, res) {
    // Create a new category
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ errorMessage: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return res.status(400).json({ errorMessage: 'This category name is already in use' });
    }

    const category = await CategoriesRepository.create({
      name,
    });

    res.status(201).json(category);
  }

  async update(req, res) {
    // Update the category
    const { id } = req.params;
    const { name } = req.body;

    const categoryExists = await CategoriesRepository.findById(id);
    if (!categoryExists) {
      return res.status(404).json({ errorMessage: 'Category not found' });
    }

    if (!name) {
      return res.status(400).json({ errorMessage: 'Name is required' });
    }

    const categoryByName = await CategoriesRepository.findByName(name);
    if (categoryByName && categoryByName.id !== id) {
      return res.status(400).json({ errorMessage: 'This category name is already in use' });
    }

    const category = await CategoriesRepository.updateCategory(id, {
      name
    });

    res.json(category);
  }

  async delete(req, res) {
    // Delete the category
    const { id } = req.params;

    await CategoriesRepository.delete(id);
    // Successfully without body
    res.sendStatus(204);
  }
}

// Singleton instance
module.exports = new CategoryController();

