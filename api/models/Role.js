const { SystemRoles, roleDefaults } = require('librechat-data-provider');
const Role = require('~/models/schema/roleSchema');

/**
 * Retrieve a role by name and convert the found role document to a plain object.
 * If the role with the given name doesn't exist and the name is a system defined role, create it and return the lean version.
 *
 * @param {string} roleName - The name of the role to find or create.
 * @param {string|string[]} [fieldsToSelect] - The fields to include or exclude in the returned document.
 * @returns {Promise<Object>} A plain object representing the role document.
 */
const getRoleByName = async function (roleName, fieldsToSelect = null) {
  try {
    let query = Role.findOne({ name: roleName });
    if (fieldsToSelect) {
      query = query.select(fieldsToSelect);
    }
    let role = await query.lean().exec();

    if (!role && SystemRoles[roleName]) {
      role = roleDefaults[roleName];
      role = await new Role(role).save();
      return role.toObject();
    }
    return role;
  } catch (error) {
    throw new Error(`Failed to retrieve or create role: ${error.message}`);
  }
};

/**
 * Update role values by name.
 *
 * @param {string} roleName - The name of the role to update.
 * @param {Object} updates - The fields to update.
 * @returns {Promise<Object>} Updated role document.
 */
const updateRoleByName = async function (roleName, updates) {
  try {
    const role = await Role.findOneAndUpdate(
      { name: roleName },
      { $set: updates },
      { new: true, lean: true },
    ).exec();
    return role;
  } catch (error) {
    throw new Error(`Failed to update role: ${error.message}`);
  }
};

/**
 * Initialize default roles in the system.
 * Creates the default roles (ADMIN, USER) if they don't exist in the database.
 *
 * @returns {Promise<void>}
 */
const initializeRoles = async function () {
  const defaultRoles = [SystemRoles.ADMIN, SystemRoles.USER];

  for (const roleName of defaultRoles) {
    let role = await Role.findOne({ name: roleName });
    if (!role) {
      role = new Role(roleDefaults[roleName]);
      await role.save();
    }
  }
};

module.exports = {
  getRoleByName,
  initializeRoles,
  updateRoleByName,
};
