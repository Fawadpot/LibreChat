import { InfiniteCollections } from 'librechat-data-provider';
import type {
  PromptGroupListData,
  PromptGroupListResponse,
  TPromptGroup,
} from 'librechat-data-provider';
import { addData, deleteData, updateData } from './collection';
import { InfiniteData } from '@tanstack/react-query';

export const addPromptGroup = (
  data: InfiniteData<PromptGroupListResponse>,
  newPromptGroup: TPromptGroup,
): PromptGroupListData => {
  return addData<PromptGroupListResponse, TPromptGroup>(
    data,
    InfiniteCollections.PROMPT_GROUPS,
    newPromptGroup,
    (page) => page.promptGroups.findIndex((c) => c._id === newPromptGroup._id),
  );
};

export const updatePromptGroup = (
  data: InfiniteData<PromptGroupListResponse>,
  updatedPromptGroup: TPromptGroup,
): PromptGroupListData => {
  return updateData<PromptGroupListResponse, TPromptGroup>(
    data,
    InfiniteCollections.PROMPT_GROUPS,
    updatedPromptGroup,
    (page) => page.promptGroups.findIndex((c) => c._id === updatedPromptGroup._id),
  );
};

export const deletePromptGroup = (
  data: InfiniteData<PromptGroupListResponse>,
  groupId: string,
): PromptGroupListData => {
  return deleteData<PromptGroupListResponse, PromptGroupListData>(
    data,
    InfiniteCollections.PROMPT_GROUPS,
    (page) => page.promptGroups.findIndex((c) => c._id === groupId),
  );
};
