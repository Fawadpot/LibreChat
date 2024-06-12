import { useEffect, useState } from 'react';
import { TrashIcon } from 'lucide-react';
import { Share2Icon } from 'lucide-react';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useNavigate, useParams } from 'react-router-dom';
import type { TPrompt, TPromptGroup } from 'librechat-data-provider';
import {
  useCreatePrompt,
  useDeletePromptGroup,
  useUpdatePromptGroup,
  useUpdatePromptLabels,
  useMakePromptProduction,
} from '~/data-provider/mutations';
import { useGetCategories, useGetPromptGroup, useGetPrompts } from '~/data-provider';
import { Button, Input, SelectDropDown } from '~/components/ui';
import type { Option } from '~/common';
import PromptEditor from './PromptEditor';
import PromptName from './PromptName';
import CategoryIcon from './CategoryIcon';

function extractUniqueVariables(input: string): string[] {
  const regex = /{{(.*?)}}/g;
  const variablesSet = new Set<string>();
  let match: RegExpExecArray | null = null;

  while ((match = regex.exec(input)) !== null) {
    variablesSet.add(match[1]);
  }

  return Array.from(variablesSet);
}

function formatDateTime(dateTimeString: string) {
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
  const navigate = useNavigate();

  const [group, setGroup] = useState<TPromptGroup | undefined>();
  const [selectedPrompt, setSelectedPrompt] = useState<TPrompt | undefined>();
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number>(0);
  const [variables, setVariables] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [labelInput, setLabelInput] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Option | string>('');
  const [categories, setCategories] = useState<Option[]>([]);

  const promptGroupQuery = useGetPromptGroup(params.promptId || '');
  const promptsQuery = useGetPrompts({ groupId: params.promptId }, { enabled: !!params.promptId });
  const categoriesQuery = useGetCategories();

  const updateGroupMutation = useUpdatePromptGroup();
  const createNewVersionMutation = useCreatePrompt();
  const makePromptProductionMutation = useMakePromptProduction();
  const updatePromptLabelsMutation = useUpdatePromptLabels();
  const deletePromptGroupMutation = useDeletePromptGroup({
    onSuccess: () => {
      navigate('/d/prompts');
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && labelInput.trim()) {
      const newLabels = [...labels, labelInput.trim()];
      setLabels(newLabels);
      setLabelInput('');
      updatePromptLabelsMutation.mutate({
        id: selectedPrompt?._id || '',
        payload: { labels: newLabels },
      });
    }
  };

  useEffect(() => {
    if (promptsQuery?.data && promptsQuery?.data?.length > 0) {
      setSelectedPrompt(promptsQuery.data[selectedPromptIndex]);
      setLabels(promptsQuery.data[selectedPromptIndex].labels || []);
      setVariables(extractUniqueVariables(promptsQuery.data[selectedPromptIndex].prompt));
    }
  }, [promptsQuery.data, selectedPromptIndex]);

  useEffect(() => {
    if (promptGroupQuery.data) {
      setGroup(promptGroupQuery?.data);
      promptsQuery.refetch();
    }
    if (categoriesQuery.data) {
      setCategories(
        categoriesQuery.data.categories.map((category) => ({
          label: category.label,
          value: category.value,
          icon: <CategoryIcon category={category.value} />,
        })),
      );
    }
    if (promptGroupQuery?.data && categoriesQuery?.data) {
      const tempCategory: Option | string =
        categoriesQuery.data?.categories.find(
          (category) => category.value === promptGroupQuery?.data?.category,
        ) || '';
      if (typeof tempCategory !== 'string') {
        tempCategory.icon = <CategoryIcon category={promptGroupQuery?.data?.category} />;
      }
      setSelectedCategory(tempCategory);
    }
  }, [promptGroupQuery?.data, categoriesQuery.data]);

  useEffect(() => {
    if (selectedPrompt) {
      setVariables(extractUniqueVariables(selectedPrompt.prompt));
    }
  }, [selectedPrompt, selectedPrompt?.prompt, promptsQuery.data]);

  return (
    <div>
      <div className="flex flex-col items-center justify-between px-4 sm:flex-row">
        <PromptName
          name={group?.name}
          onSave={(value) => {
            setGroup((prev) => prev && { ...prev, name: value });
            updateGroupMutation.mutate({
              id: group?._id || '',
              payload: {
                name: value,
                category:
                  typeof selectedCategory === 'string'
                    ? selectedCategory
                    : '' + selectedCategory.value,
              },
            });
          }}
        />
        <div className="flex flex-row gap-x-2">
          <Button variant={'default'} size={'sm'}>
            <Share2Icon className="cursor-pointer" />
          </Button>
          <Button
            variant={'default'}
            size={'sm'}
            onClick={() => makePromptProductionMutation.mutate({ id: selectedPrompt?._id || '' })}
            disabled={selectedPrompt?.tags.includes('production')}
          >
            Make it Production
          </Button>
          <Button
            variant={'default'}
            size={'sm'}
            onClick={() => deletePromptGroupMutation.mutate({ id: group?._id || '' })}
          >
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
              const tempPrompt: TPrompt = {
                prompt: value,
                type: selectedPrompt?.type ?? 'text',
                config: selectedPrompt?.config,
                labels: selectedPrompt?.labels ?? [],
                groupId: selectedPrompt?.groupId ?? '',
                projectId: '',
                createdAt: '',
                updatedAt: '',
                authorName: '',
                author: '',
                version: 0,
                tags: [],
              };

              createNewVersionMutation.mutate(tempPrompt);
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
            placeholder="+ Add Labels"
            value={labelInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <h3 className="rounded-t-lg border border-gray-300 px-4 text-base font-semibold">
            Labels
          </h3>
          <div className="mb-4 flex w-full flex-row flex-wrap rounded-b-lg border border-gray-300 p-4">
            {labels.length ? (
              labels.map((label, index) => (
                <label
                  className="mb-1 mr-1 flex items-center gap-x-2 rounded-full border px-2"
                  key={index}
                >
                  {label}
                  <Cross1Icon
                    onClick={() => {
                      const newLabels = labels.filter((l) => l !== label);
                      setLabels(newLabels);
                      updatePromptLabelsMutation.mutate({
                        id: selectedPrompt?._id || '',
                        payload: { labels: newLabels },
                      });
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
              updateGroupMutation.mutate({
                id: group?._id || '',
                payload: { name: group?.name || '', category: value },
              });
              setSelectedCategory(categories.find((o) => o.value === value) || categories[0]);
            }}
            availableValues={categories}
            showAbove={false}
            showLabel={true}
            searchPlaceholder="Search categories..."
          />
        </div>
        {/* Right Section */}
        {!!promptsQuery?.data?.length && (
          <div className="w-full p-4 md:w-1/3">
            <h2 className="mb-4 text-base font-semibold">Versions</h2>
            <ul>
              {promptsQuery?.data?.map((prompt, index) => (
                <li
                  key={index}
                  className={`mb-4 cursor-pointer rounded-lg border p-4 ${
                    prompt === selectedPrompt ? 'bg-gray-100' : 'bg-white'
                  }`}
                  onClick={() => {
                    setSelectedPrompt(prompt);
                    setSelectedPromptIndex(index);
                    setVariables(extractUniqueVariables(prompt.prompt));
                    setLabels(prompt.labels || []);
                  }}
                >
                  <p className="font-bold">Version: {prompt.version}</p>
                  <p className="italic">Tags: {prompt.tags.join(', ')}</p>
                  <p className="text-xs text-gray-600">{formatDateTime(prompt.createdAt)}</p>
                  <p className="text-xs text-gray-600">by {group?.authorName}</p>
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
