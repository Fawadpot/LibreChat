const express = require('express');
const { promptPermissionsSchema, PermissionTypes } = require('librechat-data-provider');
const { checkAdmin, requireJwtAuth } = require('~/server/middleware');
const { updateRoleByName, getRoleByName } = require('~/models/Role');

const router = express.Router();
router.use(requireJwtAuth);
router.use(checkAdmin);

/**
 * PUT /api/roles/:roleName/prompts
 * Update prompt permissions for a specific role
 */
router.put('/:roleName/prompts', async (req, res) => {
  const { roleName: _r } = req.params;
  // TODO: TEMP, use a better parsing for roleName
  const roleName = _r.toUpperCase();
  /** @type {TRole['PROMPTS']} */
  const updates = req.body;

  try {
    const parsedUpdates = promptPermissionsSchema.partial().parse(updates);

    const role = await getRoleByName(roleName);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const mergedUpdates = {
      [PermissionTypes.PROMPTS]: {
        ...role[PermissionTypes.PROMPTS],
        ...parsedUpdates,
      },
    };

    const updatedRole = await updateRoleByName(roleName, mergedUpdates);
    res.status(200).json(updatedRole);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid prompt permissions.', error: error.errors });
  }
});

module.exports = router;
