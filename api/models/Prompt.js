const { ObjectId } = require('mongodb');
const { Prompt, PromptGroup } = require('./schema/promptSchema');
const { logger } = require('~/config');

module.exports = {
  /**
   * Create a prompt and its respective group
   * @param {TCreatePromptRecord} saveData
   * @returns {Promise<TCreatePromptResponse>}
   */
  createPromptGroup: async (saveData) => {
    try {
      const { prompt, group, author, authorName } = saveData;
      const newPromptGroup = await PromptGroup.create({ ...group, author, authorName });
      const groupId = newPromptGroup._id;

      const newPrompt = await Prompt.create({
        ...prompt,
        groupId,
        author,
        isProduction: true,
      });

      return { prompt: newPrompt, group: newPromptGroup };
    } catch (error) {
      logger.error('Error saving prompt', error);
      return { message: 'Error saving prompt' };
    }
  },
  /**
   * Save a prompt
   * @param {TSavePrompt} saveData
   * @returns {Promise<{ prompt: TPrompt }>}
   */
  savePrompt: async (saveData) => {
    try {
      const { prompt, author } = saveData;
      const newPromptData = {
        ...prompt,
        author,
      };

      /** @type {TPrompt} */
      let newPrompt;
      try {
        newPrompt = await Prompt.create(newPromptData);
      } catch (error) {
        if (error?.message?.includes('groupId_1_version_1')) {
          await Prompt.db.collection('prompts').dropIndex('groupId_1_version_1');
        } else {
          throw error;
        }
        newPrompt = await Prompt.create(newPromptData);
      }

      return { prompt: newPrompt };
    } catch (error) {
      logger.error('Error saving prompt', error);
      return { message: 'Error saving prompt' };
    }
  },
  getPrompts: async (filter) => {
    try {
      return await Prompt.find(filter).sort({ createdAt: -1 }).lean();
    } catch (error) {
      logger.error('Error getting prompts', error);
      return { message: 'Error getting prompts' };
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
      return { message: 'Error getting prompt' };
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
      return { message: 'Error getting prompt groups' };
    }
  },
  getPromptGroup: async (filter) => {
    try {
      return await PromptGroup.findOne(filter).lean();
    } catch (error) {
      logger.error('Error getting prompt group', error);
      return { message: 'Error getting prompt group' };
    }
  },
  /**
   * Get prompt groups with filters
   * @param {TPromptGroupsWithFilterRequest} filter
   * @returns {Promise<PromptGroupListResponse>}
   */
  getPromptGroups: async (filter) => {
    try {
      const { pageNumber, pageSize, name } = filter;

      const query = {};
      if (name) {
        query.name = new RegExp(name, 'i');
      }

      const promptGroups = await PromptGroup.find(query)
        .sort({ createdAt: -1 })
        .skip((parseInt(pageNumber, 10) - 1) * parseInt(pageSize, 10))
        .limit(parseInt(pageSize, 10))
        .lean();
      const totalPromptGroups = await PromptGroup.countDocuments(query);
      return {
        promptGroups,
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        pages: Math.ceil(totalPromptGroups / pageSize).toString(),
      };
    } catch (error) {
      logger.error('Error getting prompt groups', error);
      return { message: 'Error getting prompt groups' };
    }
  },
  deletePrompt: async ({ promptId, author }) => {
    try {
      const prompt = await Prompt.findOne({ _id: promptId, author });
      if (!prompt) {
        throw new Error('Prompt not found');
      }

      const groupId = prompt.groupId;
      const hadLatestTags = prompt.tags.includes('latest');

      await Prompt.deleteOne({ _id: promptId });

      const remainingPrompts = await Prompt.find({ groupId }).sort({ createdAt: 1 });

      for (let i = 0; i < remainingPrompts.length; i++) {
        remainingPrompts[i].version = i + 1;
        await remainingPrompts[i].save();
      }

      if (hadLatestTags && remainingPrompts.length > 0) {
        const highestVersionPrompt = remainingPrompts[remainingPrompts.length - 1];
        if (!highestVersionPrompt.tags.includes('latest')) {
          highestVersionPrompt.tags.push('latest');
          await highestVersionPrompt.save();
        }
      }

      if (remainingPrompts.length === 0) {
        await PromptGroup.deleteOne({ _id: groupId });
      }

      return { message: 'Prompt deleted successfully' };
    } catch (error) {
      logger.error('Error deleting prompt', error);
      return { message: 'Error deleting prompt' };
    }
  },
  /**
   * Update prompt group
   * @param {Partial<MongoPromptGroup>} filter - Filter to find prompt group
   * @param {Partial<MongoPromptGroup>} data - Data to update
   * @returns {Promise<TUpdatePromptGroupResponse>}
   */
  updatePromptGroup: async (filter, data) => {
    try {
      const updatedDoc = await PromptGroup.findOneAndUpdate(filter, data, {
        new: true,
        upsert: false,
      });

      if (!updatedDoc) {
        throw new Error('Prompt group not found');
      }

      return updatedDoc;
    } catch (error) {
      logger.error('Error updating prompt group', error);
      return { message: 'Error updating prompt group' };
    }
  },
  /**
   * Function to make a prompt production based on its ID.
   * @param {String} promptId - The ID of the prompt to make production.
   * @returns {Object} The result of the production operation.
   */
  makePromptProduction: async (promptId) => {
    try {
      const prompt = await Prompt.findById(promptId).lean();

      if (!prompt) {
        throw new Error('Prompt not found');
      }

      if (!prompt.isProduction) {
        await Prompt.findOneAndUpdate({ _id: promptId }, { $set: { isProduction: true } });
      }

      await Prompt.updateMany(
        { groupId: prompt.groupId, _id: { $ne: promptId }, isProduction: true },
        { $set: { isProduction: false } },
      );

      return { message: 'Prompt production made successfully' };
    } catch (error) {
      logger.error('Error making prompt production', error);
      return { message: 'Error making prompt production' };
    }
  },
  updatePromptLabels: async (_id, labels) => {
    try {
      const response = await Prompt.updateOne({ _id }, { $set: { labels } });
      if (response.matchedCount === 0) {
        return { message: 'Prompt not found' };
      }
      return { message: 'Prompt labels updated successfully' };
    } catch (error) {
      logger.error('Error updating prompt labels', error);
      return { message: 'Error updating prompt labels' };
    }
  },
  deletePromptGroup: async (_id) => {
    try {
      const response = await PromptGroup.deleteOne({ _id });

      if (response.deletedCount === 0) {
        return { promptGroup: 'Prompt group not found' };
      }

      await Prompt.deleteMany({ groupId: new ObjectId(_id) });
      return { promptGroup: 'Prompt group deleted successfully' };
    } catch (error) {
      logger.error('Error deleting prompt group', error);
      return { message: 'Error deleting prompt group' };
    }
  },
};
