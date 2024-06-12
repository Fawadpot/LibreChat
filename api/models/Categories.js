const { logger } = require('~/config');
// const { Categories } = require('./schema/categories');

module.exports = {
  /**
   * Retrieves the categories asynchronously.
   *
   * @return {Promise<Array<Object>>} An array of category objects.
   * @throws {Error} If there is an error retrieving the categories.
   */
  getCategories: async () => {
    try {
      // const categories = await Categories.find();
      const categories = options;
      return { categories };
    } catch (error) {
      logger.error('Error getting categories', error);
      return [];
    }
  },
};

const options = [
  {
    label: '-',
    value: '',
  },
  {
    label: 'idea',
    value: 'idea',
  },
  {
    label: 'travel',
    value: 'travel',
  },
  {
    label: 'teach-or-explain',
    value: 'teach-or-explain',
  },
  {
    label: 'write',
    value: 'write',
  },
  {
    label: 'shop',
    value: 'shop',
  },
  {
    label: 'code',
    value: 'code',
  },
  {
    label: 'misc',
    value: 'misc',
  },
  {
    label: 'roleplay',
    value: 'roleplay',
  },
  {
    label: 'finance',
    value: 'finance',
  },
];
