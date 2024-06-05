// PromptComponent.tsx
import React, { useEffect, useState } from 'react';
import { TrashIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Share2Icon } from 'lucide-react';
import { useGetPromptGroup, useGetPrompts } from '~/data-provider';
import { useUpdatePromptGroup } from '~/data-provider/mutations';
import { Button, Input } from '../ui';
import { TPrompt, TPromptGroup } from './PromptTypes';
import PromptName from './PromptName';
import PromptEditor from './PromptEditor';

function extractUniqueVariables(input: string): string[] {
  const regex = /{{(.*?)}}/g;
  const variablesSet = new Set<string>();
  let match;

  while ((match = regex.exec(input)) !== null) {
    variablesSet.add(match[1]);
  }

  return Array.from(variablesSet);
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = hours % 12 || 12;

  const formattedDate = `${month}/${day}/${year}`;
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

  return `${formattedDate}, ${formattedTime}`;
}

const PromptPreview = () => {
  const params = useParams();
  const promptGroup = useGetPromptGroup(params.promptId || '');
  const prompts = useGetPrompts({ groupId: params.promptId }, { enabled: !!params.promptId });
  const [group, setGroup] = useState<TPromptGroup | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<TPrompt | null>(null);
  const [variables, setVariables] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState<string>('');

  const updateGroup = useUpdatePromptGroup();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && categoryInput.trim()) {
      setCategories((prevCategories) => [...prevCategories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };

  useEffect(() => {
    if (prompts?.data && prompts?.data?.length > 0) {
      setSelectedPrompt(prompts.data[0]);
      setVariables(extractUniqueVariables(prompts.data[0].prompt));
    }
  }, [prompts?.data]);

  useEffect(() => {
    if (promptGroup) {
      setGroup(promptGroup?.data);
    }
  }, [promptGroup?.data]);

  useEffect(() => {
    if (selectedPrompt) {
      setVariables(extractUniqueVariables(selectedPrompt.prompt));
    }
  }, [selectedPrompt?.prompt]);

  return (
    <div>
      <div className="flex flex-col items-center justify-between px-4 sm:flex-row">
        <PromptName
          name={group?.name}
          onSave={(value) => {
            setGroup((prev) => prev && { ...prev, name: value });
            updateGroup.mutate({ _id: group?._id || '', payload: { name: value } });
          }}
        />
        <div className="flex flex-row gap-x-2">
          {prompts?.data?.includes(selectedPrompt) ||
          prompts?.isLoading ||
          promptGroup?.isLoading ? null : (
              <Button variant={'default'} size={'sm'}>
              Update Prompt
              </Button>
            )}
          <Button variant={'default'} size={'sm'}>
            <Share2Icon className="cursor-pointer" />
          </Button>
          <Button variant={'default'} size={'sm'}>
            Make it Production
          </Button>
          <Button variant={'default'} size={'sm'}>
            <TrashIcon className="cursor-pointer" />
          </Button>
        </div>
      </div>
      <div className="flex h-screen w-full flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full border-r border-gray-300 p-4 md:w-2/3">
          <PromptEditor
            type={selectedPrompt?.type || ''}
            prompt={selectedPrompt?.prompt || ''}
            onSave={(value) => {
              setSelectedPrompt((prev) => prev && { ...prev, prompt: value });
            }}
          />
          <h3 className="rounded-t-lg border border-gray-300 px-4 text-base font-semibold">
            Variables
          </h3>
          <div className="mb-4 flex w-full flex-row flex-wrap rounded-b-lg border border-gray-300 p-4">
            {variables.length ? (
              variables.map((variable, index) => (
                <label className="mb-1 mr-1 rounded-full border px-2" key={index}>
                  {variable}
                </label>
              ))
            ) : (
              <label className="rounded-full border px-2">No variables</label>
            )}
          </div>
          <Input
            type="text"
            className="mb-4"
            placeholder="+ Add Categories"
            // defaultValue={selectedPrompt?.labels.join(', ')}
            value={categoryInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <h3 className="rounded-t-lg border border-gray-300 px-4 text-base font-semibold">
            Categories
          </h3>
          <div className="mb-4 flex w-full flex-row flex-wrap rounded-b-lg border border-gray-300 p-4">
            {categories.length ? (
              categories.map((category, index) => (
                <label className="mb-1 mr-1 rounded-full border px-2" key={index}>
                  {category}
                </label>
              ))
            ) : (
              <label className="rounded-full border px-2">No Categories</label>
            )}
          </div>
        </div>
        {/* Right Section */}
        {prompts?.data?.length > 0 && (
          <div className="w-full p-4 md:w-1/3">
            <h2 className="mb-4 text-base font-semibold">Versions</h2>
            <ul>
              {prompts?.data?.map((prompt, index) => (
                <li
                  key={index}
                  className={`mb-4 cursor-pointer rounded-lg border p-4 ${
                    prompt === selectedPrompt ? 'bg-gray-100' : 'bg-white'
                  }`}
                  onClick={() => {
                    setSelectedPrompt(prompt);
                    setVariables(extractUniqueVariables(prompt.prompt));
                  }}
                >
                  <p className="font-bold">Version: {prompt.version}</p>
                  <p className="italic">Tags: {prompt.tags.join(', ')}</p>
                  <p className="text-xs text-gray-600">{formatDateTime(prompt.createdAt)}</p>
                  <p className="text-xs text-gray-600">by {prompt.authorName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptPreview;
