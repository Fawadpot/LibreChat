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
