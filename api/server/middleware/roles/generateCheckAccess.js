const { SystemRoles } = require('librechat-data-provider');
const { getRoleByName } = require('~/models/Role');

/**
 * Middleware to check if a user has one or more required permissions.
 *
 * @param {PermissionTypes} permissionType - The type of permission to check.
 * @param {Permissions[]} permissions - The list of specific permissions to check.
 * @returns {Function} Express middleware function.
 */
const generateCheckAccess = (permissionType, permissions) => {
  return async (req, res, next) => {
    try {
      const { user } = req;
      if (!user) {
        return res.status(401).json({ message: 'Authorization required' });
      }

      if (user.role === SystemRoles.ADMIN) {
        return next();
      }

      const role = await getRoleByName(user.role);
      if (role && role[permissionType]) {
        const hasAnyPermission = permissions.some((permission) => role[permissionType][permission]);
        if (hasAnyPermission) {
          return next();
        }
      }

      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    } catch (error) {
      return res.status(500).json({ message: `Server error: ${error.message}` });
    }
  };
};

module.exports = generateCheckAccess;
