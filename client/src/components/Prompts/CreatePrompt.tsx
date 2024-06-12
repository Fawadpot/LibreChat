import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TUpdatePrompt } from 'librechat-data-provider';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useCreatePrompt } from '~/data-provider';
import PromptEditor from './PromptEditor';
import { Button, Input } from '../ui';

export default function CreatePrompt() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<TUpdatePrompt>({
    name: '',
    prompt: '',
    type: 'text',
    groupId: '',
    labels: [],
    tags: [],
  });
  const [categoryInput, setCategoryInput] = useState<string>('');
  const createPromptMutation = useCreatePrompt({
    onSuccess: (response) => {
      navigate(`/d/prompts/${response.prompt.groupId}`, { replace: true });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && categoryInput.trim()) {
      setPrompt((prevPrompt) => ({
        ...prevPrompt,
        labels: [...(prevPrompt?.labels || []), categoryInput.trim()],
      }));
      setCategoryInput('');
    }
  };

  return (
    <div className="w-full p-4">
      <div className="mb-5 flex w-full flex-row items-center text-2xl font-bold md:w-1/2">
        <Input
          type="text"
          value={prompt?.name}
          className="mr-2 border border-gray-300 p-2 text-2xl"
          placeholder="Prompt Name"
          defaultValue={''}
        />
      </div>
      <div className="w-full">
        <PromptEditor
          permanentEditMode={true}
          type={prompt?.type || ''}
          prompt={prompt?.prompt || ''}
          onSave={(value) => {
            setPrompt((prev) => prev && { ...prev, prompt: value });
          }}
        />
        <Input
          type="text"
          className="mb-4"
          placeholder="+ Add Labels"
          value={categoryInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <h3 className="rounded-t-lg border border-gray-300 px-4 text-base font-semibold">Labels</h3>
        <div className="mb-4 flex w-full flex-row flex-wrap rounded-b-lg border border-gray-300 p-4">
          {prompt?.labels?.length ? (
            prompt?.labels?.map((label, index) => (
              <label
                className="mb-1 mr-1 flex items-center gap-x-2 rounded-full border px-2"
                key={index}
              >
                {label}
                <Cross1Icon
                  onClick={() => {
                    const newLabels = prompt?.labels.filter((l) => l !== label);
                    setPrompt((prev) => prev && { ...prev, labels: newLabels });
                  }}
                  className="cursor-pointer"
                />
              </label>
            ))
          ) : (
            <label className="rounded-full border px-2">No Labels</label>
          )}
        </div>
        <Button
          variant={'default'}
          onClick={() => {
            createPromptMutation.mutate(prompt);
          }}
        >
          Create Prompt
        </Button>
      </div>
    </div>
  );
}