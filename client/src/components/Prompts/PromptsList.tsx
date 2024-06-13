import React from 'react';
import { TPromptGroup } from 'librechat-data-provider/dist/types';
import PromptListItem from './PromptListItem';

export default function PromptsList({ prompts }: { prompts?: TPromptGroup[] }) {
  return (
    <div className="h-[65vh] overflow-y-auto">
      {prompts?.map((prompt) => (
        <PromptListItem key={prompt._id} prompt={prompt} />
      ))}
    </div>
  );
}
