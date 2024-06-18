import { z } from 'zod';

/**
 * Enum for System Defined Roles
 */
export enum SystemRoles {
  /**
   * The Admin role
   */
  ADMIN = 'ADMIN',
  /**
   * The default user role
   */
  USER = 'USER',
}

/**
 * Enum for Permission Types
 */
export enum PermissionTypes {
  /**
   * Type for Prompt Permissions
   */
  PROMPTS = 'PROMPTS',
}

/**
 * Enum for Role-Based Access Control Constants
 */
export enum PromptPermissions {
  /**
   * Sharing prompts to all users
   */
  SHARED_GLOBAL = 'SHARED_GLOBAL',
  /**
   * Access/use prompts
   */
  USE = 'USE',
  /**
   * Creating Prompts
   */
  CREATE = 'CREATE',
  /**
   * Sharing prompts with other users
   */
  SHARE = 'SHARE',
}

export const promptPermissionsSchema = z.object({
  [PromptPermissions.SHARED_GLOBAL]: z.boolean().default(false),
  [PromptPermissions.USE]: z.boolean().default(true),
  [PromptPermissions.CREATE]: z.boolean().default(true),
  [PromptPermissions.SHARE]: z.boolean().default(false),
});

export const roleSchema = z.object({
  name: z.string(),
  [PermissionTypes.PROMPTS]: promptPermissionsSchema,
});

export type TRole = z.infer<typeof roleSchema>;

const defaultRolesSchema = z.object({
  [SystemRoles.ADMIN]: roleSchema.extend({
    name: z.literal(SystemRoles.ADMIN),
    [PermissionTypes.PROMPTS]: promptPermissionsSchema.extend({
      [PromptPermissions.SHARED_GLOBAL]: z.boolean().default(true),
      [PromptPermissions.USE]: z.boolean().default(true),
      [PromptPermissions.CREATE]: z.boolean().default(true),
      [PromptPermissions.SHARE]: z.boolean().default(true),
    }),
  }),
  [SystemRoles.USER]: roleSchema.extend({
    name: z.literal(SystemRoles.USER),
    [PermissionTypes.PROMPTS]: promptPermissionsSchema,
  }),
});

export const roleDefaults = defaultRolesSchema.parse({
  [SystemRoles.ADMIN]: {
    name: SystemRoles.ADMIN,
    [PermissionTypes.PROMPTS]: {},
  },
  [SystemRoles.USER]: {
    name: SystemRoles.USER,
    [PermissionTypes.PROMPTS]: {},
  },
});
