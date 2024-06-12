import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TUpdatePrompt } from 'librechat-data-provider';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useCreatePrompt, useGetCategories } from '~/data-provider';
import type { Option } from '~/common';
import PromptEditor from './PromptEditor';
import { Button, Input, SelectDropDown } from '../ui';
import CategoryIcon from './CategoryIcon';

export default function CreatePrompt() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<TUpdatePrompt>({
    name: '',
    prompt: '',
    type: 'text',
    groupId: '',
    labels: [],
    tags: [],
    category: '',
  });
  const [labelInput, setLabelInput] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Option | string>('');
  const [categories, setCategories] = useState<Option[]>([]);
  const createPromptMutation = useCreatePrompt({
    onSuccess: (response) => {
      navigate(`/d/prompts/${response.prompt.groupId}`, { replace: true });
    },
  });

  const categoriesQuery = useGetCategories();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && labelInput.trim()) {
      setPrompt((prevPrompt) => ({
        ...prevPrompt,
        labels: [...(prevPrompt?.labels || []), labelInput.trim()],
      }));
      setLabelInput('');
    }
  };

  useEffect(() => {
    if (categoriesQuery.data) {
      setCategories(
        categoriesQuery.data.categories.map((category) => ({
          label: category.label,
          value: category.value,
          icon: <CategoryIcon category={category.value} />,
        })),
      );
    }
  }, [categoriesQuery.data]);

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
          value={labelInput}
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
        <SelectDropDown
          title="Category"
          value={selectedCategory}
          setValue={(value) => {
            setSelectedCategory(categories.find((o) => o.value === value) || categories[0]);
            setPrompt((prev) => prev && { ...prev, category: value });
          }}
          availableValues={categories}
          showAbove={false}
          showLabel={true}
          searchPlaceholder="Search categories..."
        />
        <Button
          className="mt-4"
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
