const { PermissionTypes, PromptPermissions } = require('librechat-data-provider');
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  [PermissionTypes.PROMPTS]: {
    [PromptPermissions.SHARED_GLOBAL]: {
      type: Boolean,
      default: false,
    },
    [PromptPermissions.USE]: {
      type: Boolean,
      default: true,
    },
    [PromptPermissions.CREATE]: {
      type: Boolean,
      default: true,
    },
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
