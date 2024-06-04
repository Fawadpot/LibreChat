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

      let promptGroupId = new ObjectId(groupId);
      let versionNumber = 1;

      if (!groupId) {
        const newPromptGroup = await PromptGroup.create({ name, isActive });
        promptGroupId = newPromptGroup._id;
      } else {
        await Prompt.updateMany({ groupId: promptGroupId }, { $pull: { labels: 'latest' } });

        const promptCount = await Prompt.countDocuments({ groupId: promptGroupId });
        versionNumber = promptCount + 1;
      }

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
    try {
      if (filter.groupId) {
        filter.groupId = new ObjectId(filter.groupId);
      }

      if (filter.author) {
        filter.author = new ObjectId(filter.author);
      }

      const cleanedFilter = {};

      for (const key in filter) {
        const value = filter[key];
        if (value !== undefined && value !== null) {
          // Handle tags and labels as arrays with $all operator
          if (key === 'tags' || key === 'labels') {
            if (Array.isArray(value) && value.length > 0) {
              cleanedFilter[key] = { $all: value };
            }
          } else {
            cleanedFilter[key] = value;
          }
        }
      }

      const result = await Prompt.find(cleanedFilter).lean();
      return result;
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
  getPromptGroup: async (filter) => {
    try {
      return await PromptGroup.findOne(filter).lean();
    } catch (error) {
      logger.error('Error getting prompt group', error);
      return { prompt: 'Error getting prompt group' };
    }
  },
  getPromptGroups: async (filter) => {
    try {
      const { pageNumber, pageSize } = filter;
      delete filter.pageNumber;
      delete filter.pageSize;
      const promptGroups = await PromptGroup.find(filter)
        .sort({ createdAt: 1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .lean();
      const totalPromptGroups = await PromptGroup.countDocuments(filter);
      return {
        promptGroups,
        totalPages: Math.ceil(totalPromptGroups / pageSize),
        totalPromptGroups: totalPromptGroups,
        currentPage: +pageNumber,
      };
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

      const groupId = prompt.groupId;
      const hadLatestLabel = prompt.labels.includes('latest');

      await Prompt.deleteOne({ _id: promptId });

      const remainingPrompts = await Prompt.find({ groupId }).sort({ createdAt: 1 });

      for (let i = 0; i < remainingPrompts.length; i++) {
        remainingPrompts[i].version = i + 1;
        await remainingPrompts[i].save();
      }

      if (hadLatestLabel && remainingPrompts.length > 0) {
        const highestVersionPrompt = remainingPrompts[remainingPrompts.length - 1];
        if (!highestVersionPrompt.labels.includes('latest')) {
          highestVersionPrompt.labels.push('latest');
          await highestVersionPrompt.save();
        }
      }

      if (remainingPrompts.length === 0) {
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
      const response = await PromptGroup.updateOne(filter, data);

      if (response.matchedCount === 0) {
        return { promptGroup: 'Prompt group not found' };
      }

      return { promptGroup: 'Prompt group updated successfully' };
    } catch (error) {
      logger.error('Error updating prompt group', error);
      return { promptGroup: 'Error updating prompt group' };
    }
  },
};
