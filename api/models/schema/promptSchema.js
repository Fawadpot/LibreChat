const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promptGroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    numberOfGenerations: {
      type: Number,
      default: 0,
    },
    oneliner: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
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
    version: {
      type: Number,
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: false,
      default: null,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorName: {
      type: String,
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
    config: {
      type: Schema.Types.Mixed,
      default: {},
    },
    tags: {
      type: [String],
      default: [],
    },
    labels: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Ensure a combination of groupId and version is unique
promptSchema.index({ groupId: 1, version: 1 }, { unique: true });

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = { Prompt, PromptGroup };
