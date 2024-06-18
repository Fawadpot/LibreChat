import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import { QueryKeys, dataService, promptPermissionsSchema } from 'librechat-data-provider';
import type * as t from 'librechat-data-provider';

export const useUpdatePromptPermissionsMutation = (
  options?: t.UpdatePromptPermOptions,
): UseMutationResult<t.UpdatePromptPermResponse, t.TError, t.UpdatePromptPermVars, unknown> => {
  const queryClient = useQueryClient();
  const { onMutate, onSuccess, onError } = options ?? {};
  return useMutation(
    (variables) => {
      promptPermissionsSchema.partial().parse(variables.updates);
      return dataService.updatePromptPermissions(variables);
    },
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries([QueryKeys.roles, variables.roleName]);
        if (onSuccess) {
          onSuccess(data, variables, context);
        }
      },
      onError: (...args) => {
        args[0] && console.error('Failed to update prompt permissions:', args[0]);
        if (onError) {
          onError(...args);
        }
      },
      onMutate,
    },
  );
};
