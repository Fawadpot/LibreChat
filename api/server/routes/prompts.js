const express = require('express');
const { PermissionTypes, Permissions } = require('librechat-data-provider');
const {
  getPrompt,
  getPrompts,
  savePrompt,
  deletePrompt,
  getPromptGroup,
  getPromptGroups,
  updatePromptGroup,
  deletePromptGroup,
  createPromptGroup,
  // updatePromptLabels,
  // makePromptProduction,
  getRandomPromptGroups,
} = require('~/models/Prompt');
const { requireJwtAuth, generateCheckAccess } = require('~/server/middleware');

const router = express.Router();

const checkPromptAccess = generateCheckAccess(PermissionTypes.PROMPTS, [Permissions.USE]);
const checkPromptCreate = generateCheckAccess(PermissionTypes.PROMPTS, [
  Permissions.USE,
  Permissions.CREATE,
]);

router.use(requireJwtAuth);
router.use(checkPromptAccess);

/**
 * Route to get single prompt group by its ID
 * GET /groups/:groupId
 */
router.get('/groups/:groupId', async (req, res) => {
  let groupId = req.params.groupId;
  const group = await getPromptGroup({ _id: groupId });
  res.status(200).send(group);
});

/**
 * Route to fetch paginated prompt groups with filters
 * GET /groups
 */
router.get('/groups', async (req, res) => {
  try {
    const filter = req.query;
    /* Note: The aggregation requires an ObjectId */
    filter.author = req.user._id;
    const groups = await getPromptGroups(req, filter);
    res.status(200).send(groups);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error getting prompt groups' });
  }
});

/**
 * Updates or creates a prompt + promptGroup
 * @param {object} req
 * @param {TCreatePrompt} req.body
 * @param {Express.Response} res
 */
const createPrompt = async (req, res) => {
  try {
    const { prompt, group } = req.body;
    if (!prompt) {
      return res.status(400).send({ error: 'Prompt is required' });
    }

    const saveData = {
      prompt,
      group,
      author: req.user.id,
      authorName: req.user.name,
    };

    /** @type {TCreatePromptResponse} */
    let result;
    if (group && group.name) {
      result = await createPromptGroup(saveData);
    } else {
      result = await savePrompt(saveData);
    }
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error saving prompt' });
  }
};

router.post('/', createPrompt);

/**
 * Updates a prompt group
 * @param {object} req
 * @param {object} req.params - The request parameters
 * @param {string} req.params.groupId - The group ID
 * @param {TUpdatePromptGroupPayload} req.body - The request body
 * @param {Express.Response} res
 */
const patchPromptGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const promptGroup = await updatePromptGroup({ _id: groupId }, req.body);
    res.status(200).send(promptGroup);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error updating prompt group' });
  }
};

router.patch('/groups/:groupId', checkPromptCreate, patchPromptGroup);

// router.patch('/:promptId/tags/production', async (req, res) => {
//   try {
//     const { promptId } = req.params;
//     const result = await makePromptProduction(promptId);
//     res.status(200).send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Error updating prompt production' });
//   }
// });

// router.patch('/:promptId/labels', async (req, res) => {
//   const { promptId } = req.params;
//   const { labels } = req.body;
//   res.status(200).send(await updatePromptLabels(promptId, labels));
// });

router.get('/random', async (req, res) => {
  try {
    const { limit = 4, skip = 0 } = req.query;
    res.status(200).send(await getRandomPromptGroups({ limit, skip }));
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error getting random prompt' });
  }
});

router.get('/:promptId', async (req, res) => {
  const { promptId } = req.params;
  const author = req.user.id;
  const prompt = await getPrompt({ _id: promptId, author });
  res.status(200).send(prompt);
});

router.get('/', async (req, res) => {
  try {
    const author = req.user.id;
    const { groupId } = req.query;
    const prompts = await getPrompts({ groupId, author });
    res.status(200).send(prompts);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error getting prompts' });
  }
});

router.delete('/:promptId', checkPromptCreate, async (req, res) => {
  const { promptId } = req.params;
  const author = req.user.id;
  res.status(200).send(await deletePrompt({ promptId, author }));
});

router.delete('/groups/:groupId', checkPromptCreate, async (req, res) => {
  const { groupId } = req.params;
  res.status(200).send(await deletePromptGroup(groupId));
});

module.exports = router;
