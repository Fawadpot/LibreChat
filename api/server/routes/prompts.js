const express = require('express');
const {
  getPrompt,
  savePrompt,
  getPrompts,
  deletePrompt,
  getPromptGroup,
  getPromptGroups,
  updatePromptGroup,
  deletePromptGroup,
  updatePromptLabels,
  makePromptProduction,
} = require('~/models/Prompt');
const { requireJwtAuth } = require('~/server/middleware');

const router = express.Router();
router.use(requireJwtAuth);

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
  let pageNumber = req.query.pageNumber || '1';
  pageNumber = pageNumber.toString();

  let pageSize = req.query.pageSize || '25';
  pageSize = pageSize.toString();

  let filter = req.query;

  if (filter) {
    filter.author = req.user.id;
  } else {
    filter = { author: req.user.id };
  }

  filter.pageNumber = pageNumber;
  filter.pageSize = pageSize;

  res.status(200).send(await getPromptGroups(filter));
});

/**
 * Updates or creates a prompt + promptGroup
 * @param {object} req
 * @param {TCreatePrompt} req.body
 * @param {Express.Response} res
 */
const patchPrompt = async (req, res) => {
  try {
    const { name, prompt, groupId, type, labels, tags } = req.body;
    const saveData = {
      prompt,
      type,
      groupId,
      labels,
      tags,
      author: req.user.id,
      authorName: req.user.name,
    };

    if (name) {
      saveData.name = name;
    }

    const result = await savePrompt(saveData);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error saving prompt' });
  }
};

router.post('/', patchPrompt);

/**
 * Updates a prompt group
 * @param {object} req
 * @param {object} req.params - The request parameters
 * @param {string} req.params.groupId - The group ID
 * @param {object} req.body - The request body
 * @param {string} req.body.name - The group name
 * @param {boolean} [req.body.isActive] - Whether the group is active
 * @param {Express.Response} res
 */
const patchPromptGroup = async (req, res) => {
  const { groupId } = req.params;
  const { name, isActive = false } = req.body;
  res.status(200).send(await updatePromptGroup({ _id: groupId }, { name, isActive }));
};

router.patch('/groups/:groupId', patchPromptGroup);

router.patch('/:promptId/tags/production', async (req, res) => {
  const { promptId } = req.params;
  res.status(200).send(await makePromptProduction(promptId));
});

router.patch('/:promptId/labels', async (req, res) => {
  const { promptId } = req.params;
  const { labels } = req.body;
  res.status(200).send(await updatePromptLabels(promptId, labels));
});

router.get('/:promptId', async (req, res) => {
  const { promptId } = req.params;
  const author = req.user.id;
  const prompt = await getPrompt({ _id: promptId, author });
  res.status(200).send(prompt);
});

router.get('/', async (req, res) => {
  const author = req.user.id;
  const { groupId } = req.query;
  const prompts = await getPrompts({ groupId, author });
  res.status(200).send(prompts);
});

router.delete('/:promptId', async (req, res) => {
  const { promptId } = req.params;
  const author = req.user.id;
  res.status(200).send(await deletePrompt({ promptId, author }));
});

router.delete('/groups/:groupId', async (req, res) => {
  const { groupId } = req.params;
  res.status(200).send(await deletePromptGroup(groupId));
});

module.exports = router;
