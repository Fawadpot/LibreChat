const { logger } = require('~/config');
const { ObjectId } = require('mongodb');
const { Prompt, PromptGroup } = require('./schema/promptSchema');

module.exports = {
  savePrompt: async ({
    prompt,
    groupId,
    type,
    tags,
    name,
    isActive,
    config,
    labels,
    author,
    authorName,
  }) => {
    try {
      labels.push('latest');

      // Check if the groupId exists
      let promptGroupId = new ObjectId(groupId);
      let versionNumber = 1;

      if (!groupId) {
        // If groupId does not exist, create a new PromptGroup
        const newPromptGroup = await PromptGroup.create({ name, isActive });
        promptGroupId = newPromptGroup._id;
      } else {
        // If groupId exists, remove the "latest" label from all other prompts in the group
        await Prompt.updateMany({ groupId: promptGroupId }, { $pull: { labels: 'latest' } });

        // Calculate the version number for the new prompt
        const promptCount = await Prompt.countDocuments({ groupId: promptGroupId });
        versionNumber = promptCount + 1;
      }

      // Create a new prompt
      const newPrompt = await Prompt.create({
        prompt,
        groupId: promptGroupId,
        type,
        tags,
        config,
        labels,
        version: versionNumber,
        author,
        authorName,
      });

      return newPrompt;
    } catch (error) {
      logger.error('Error saving prompt', error);
      return { prompt: 'Error saving prompt' };
    }
  },
  getPrompts: async (filter) => {
    if (filter.groupId) {
      filter.groupId = new ObjectId(filter.groupId);
    }
    try {
      return await Prompt.find(filter).lean();
    } catch (error) {
      logger.error('Error getting prompts', error);
      return { prompt: 'Error getting prompts' };
    }
  },
  getPrompt: async (filter) => {
    try {
      if (filter.groupId) {
        filter.groupId = new ObjectId(filter.groupId);
      }
      return await Prompt.findOne(filter).lean();
    } catch (error) {
      logger.error('Error getting prompt', error);
      return { prompt: 'Error getting prompt' };
    }
  },
  getPromptGroupsWithPrompts: async (filter) => {
    try {
      return await PromptGroup.findOne(filter)
        .populate({
          path: 'prompts',
          select: '-_id -__v -user',
        })
        .select('-_id -__v -user')
        .lean();
    } catch (error) {
      logger.error('Error getting prompt groups', error);
      return { prompt: 'Error getting prompt groups' };
    }
  },
  getPromptGroups: async (filter) => {
    try {
      const { pageNumber, pageSize } = filter;
      delete filter.pageNumber;
      delete filter.pageSize;
      return await PromptGroup.find(filter)
        .sort({ updatedAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean();
    } catch (error) {
      logger.error('Error getting prompt groups', error);
      return { prompt: 'Error getting prompt groups' };
    }
  },
  deletePrompt: async ({ promptId, author }) => {
    try {
      const prompt = await Prompt.findOne({ _id: promptId, author });
      if (!prompt) {
        throw new Error('Prompt not found');
      }
      const groupId = new ObjectId(prompt.groupId);

      await Prompt.deleteOne({ _id: promptId });

      const remainingPrompts = await Prompt.countDocuments({ groupId });
      if (remainingPrompts === 0) {
        await PromptGroup.deleteOne({ _id: groupId });
      }

      return { message: 'Prompt deleted successfully' };
    } catch (error) {
      logger.error('Error deleting prompt', error);
      return { prompt: 'Error deleting prompt' };
    }
  },
  updatePromptGroup: async (filter, data) => {
    try {
      return await PromptGroup.updateOne(filter, data);
    } catch (error) {
      logger.error('Error updating prompt group', error);
      return { prompt: 'Error updating prompt group' };
    }
  },
};
