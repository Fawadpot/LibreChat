const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef {Object} MongoPromptGroup
 * @property {ObjectId} [_id] - MongoDB Document ID
 * @property {string} name - The name of the prompt group
 * @property {ObjectId} author - The author of the prompt group
 * @property {ObjectId} [projectId=null] - The project ID of the prompt group
 * @property {ObjectId} [productionId=null] - The project ID of the prompt group
 * @property {string} authorName - The name of the author of the prompt group
 * @property {string} snippet - The snippet of the production prompt version
 * @property {number} [numberOfGenerations=0] - Number of generations the prompt group has
 * @property {string} [oneliner=''] - Oneliner description of the prompt group
 * @property {string} [category=''] - Category of the prompt group
 * @property {Date} [createdAt] - Date when the prompt group was created (added by timestamps)
 * @property {Date} [updatedAt] - Date when the prompt group was last updated (added by timestamps)
 */

const promptGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    numberOfGenerations: {
      type: Number,
      default: 0,
    },
    oneliner: {
      type: String,
      default: '',
    },
    snippet: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: false,
      default: null,
    },
    productionId: {
      type: Schema.Types.ObjectId,
      ref: 'Prompt',
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    authorName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PromptGroup = mongoose.model('PromptGroup', promptGroupSchema);

const promptSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'PromptGroup',
      required: true,
      index: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'chat'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Prompt = mongoose.model('Prompt', promptSchema);

promptSchema.index({ createdAt: 1, updatedAt: 1 });
promptGroupSchema.index({ createdAt: 1, updatedAt: 1 });

module.exports = { Prompt, PromptGroup };
