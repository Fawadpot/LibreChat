const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const categories = mongoose.model('categories', categoriesSchema);

module.exports = { Categories: categories };
