import React from 'react';
import PromptListItem from './PromptListItem';
import { TPromptGroup } from 'librechat-data-provider/dist/types';

export default function PromptsList({ prompts }: { prompts: TPromptGroup[] }) {
  return (
    <div className="h-[85vh] overflow-y-auto">
      {prompts.map((prompt) => (
        <PromptListItem key={prompt._id} prompt={prompt} />
      ))}
    </div>
  );
}
