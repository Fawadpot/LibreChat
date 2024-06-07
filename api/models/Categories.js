const { logger } = require('~/config');
const { Categories } = require('./schema/categories');

module.exports = {
  getCategories: async () => {
    try {
      const categories = await Categories.find();
      return categories;
    } catch (error) {
      logger.error('Error getting categories', error);
      return [];
    }
  },
};
