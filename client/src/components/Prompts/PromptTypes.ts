export interface TPrompt {
  _id: string;
  groupId: string;
  version: number;
  projectId: string | null;
  author: string;
  authorName: string;
  prompt: string;
  type: string;
  tags: string[];
  labels: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TPromptGroup {
  _id: string;
  name: string;
  isActive: boolean;
  numberOfGenerations: number;
  createdAt: string;
  updatedAt: string;
}
