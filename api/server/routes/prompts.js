const express = require('express');
const router = express.Router();
const {
  getPromptGroups,
  updatePromptGroup,
  savePrompt,
  getPrompts,
  getPrompt,
  deletePrompt,
  getPromptGroup,
  makePromptProduction,
  deletePromptGroup,
  updatePromptLabels,
} = require('../../models/Prompt');
const { requireJwtAuth } = require('../middleware');

router.get('/prompt-groups/:groupId', requireJwtAuth, async (req, res) => {
  let groupId = req.params.groupId;
  res.status(200).send(await getPromptGroup({ _id: groupId }));
});
router.get('/prompt-groups', requireJwtAuth, async (req, res) => {
  let pageNumber = req.query.pageNumber || 1;
  pageNumber = parseInt(pageNumber, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    return res.status(400).json({ error: 'Invalid page number' });
  }

  let pageSize = req.query.pageSize || 25;
  pageSize = parseInt(pageSize, 10);

  if (isNaN(pageSize) || pageSize < 1) {
    return res.status(400).json({ error: 'Invalid page size' });
  }

  let filter = req.query;

  if (filter) {
    filter.author = req.user.id;
  } else {
    filter = { author: req.user.id };
  }

  res.status(200).send(await getPromptGroups(filter));
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { prompt, groupId, type, labels, name, isActive, config, tags } = req.body;
  res.status(200).send(
    await savePrompt({
      prompt,
      groupId,
      type,
      labels,
      name,
      isActive,
      tags,
      config,
      author: req.user.id,
      authorName: req.user.name,
    }),
  );
});

router.patch('/prompt-groups/:groupId', requireJwtAuth, async (req, res) => {
  const { groupId } = req.params;
  const { name, isActive = false } = req.body;
  res.status(200).send(await updatePromptGroup({ _id: groupId }, { name, isActive }));
});

router.patch('/:promptId/tags/production', requireJwtAuth, async (req, res) => {
  const { promptId } = req.params;
  res.status(200).send(await makePromptProduction(promptId));
});

router.patch('/:promptId/labels', requireJwtAuth, async (req, res) => {
  const { promptId } = req.params;
  const { labels } = req.body;
  res.status(200).send(await updatePromptLabels(promptId, labels));
});

router.get('/:promptId', requireJwtAuth, async (req, res) => {
  const { promptId } = req.params;
  const author = req.user.id;
  res.status(200).send(await getPrompt({ _id: promptId, author }));
});

router.get('/', requireJwtAuth, async (req, res) => {
  const author = req.user.id;
  const { groupId, version, type, tags, labels } = req.query;
  res.status(200).send(await getPrompts({ groupId, version, type, tags, labels, author }));
});

router.delete('/:promptId', requireJwtAuth, async (req, res) => {
  const { promptId } = req.params;
  const author = req.user.id;
  res.status(200).send(await deletePrompt({ promptId, author }));
});

router.delete('/prompt-groups/:groupId', requireJwtAuth, async (req, res) => {
  const { groupId } = req.params;
  res.status(200).send(await deletePromptGroup(groupId));
});

module.exports = router;
