import React, { useEffect, useState } from 'react';
import { TrashIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Share2Icon } from 'lucide-react';
import { useGetPromptGroup, useGetPrompts } from '~/data-provider';
import { useDeletePromptGroup, useMakePromptProduction, useSavePrompt, useUpdatePromptGroup, useUpdatePromptLabels } from '~/data-provider/mutations';
import { Button, Input } from '../ui';
import PromptName from './PromptName';
import PromptEditor from './PromptEditor';
import { TPrompt, TPromptGroup } from 'librechat-data-provider';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Select } from '@radix-ui/react-select';

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
  const navigate = useNavigate();
  const promptGroup = useGetPromptGroup(params.promptId || '');
  const prompts = useGetPrompts({ groupId: params.promptId }, { enabled: !!params.promptId });
  const [group, setGroup] = useState<TPromptGroup | undefined>();
  const [selectedPrompt, setSelectedPrompt] = useState<TPrompt | undefined>();
  const [variables, setVariables] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [labelInput, setLabelInput] = useState<string>('');

  const updateGroup = useUpdatePromptGroup();
  const createNewVersion = useSavePrompt();
  const makePromptProductionMutation = useMakePromptProduction();
  const updatePromptLabelsMutation = useUpdatePromptLabels();
  const deletePromptGroupMutation = useDeletePromptGroup({
    onSuccess: () => {
      navigate('/d/prompts');
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabelInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && labelInput.trim()) {
      const newLabels = [...labels, labelInput.trim()];
      setLabels((prevLabels) => newLabels);
      setLabelInput('');
      updatePromptLabelsMutation.mutate({ id: selectedPrompt?._id || '', payload: {labels: newLabels} });
    }
  };

  useEffect(() => {
    if (prompts?.data && prompts?.data?.length > 0) {
      setSelectedPrompt(prompts.data[0]);
      setLabels(prompts.data[0].labels || []);
      setVariables(extractUniqueVariables(prompts.data[0].prompt));
    }
  }, [prompts?.data]);

  useEffect(() => {
    if (promptGroup) {
      setGroup(promptGroup?.data);
      prompts.refetch();
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
            updateGroup.mutate({ id: group?._id || '', payload: { name: value } });
          }}
        />
        <div className="flex flex-row gap-x-2">
          <Button variant={'default'} size={'sm'}>
            <Share2Icon className="cursor-pointer" />
          </Button>
          <Button variant={'default'} size={'sm'} onClick={() => makePromptProductionMutation.mutate({id: selectedPrompt?._id || ''})} disabled={selectedPrompt?.tags.includes('production')}>
            Make it Production
          </Button>
          <Button variant={'default'} size={'sm'} onClick={() => deletePromptGroupMutation.mutate({id: group?._id || ''})}>
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
              const tempPrompt = {
                prompt: value,
                type: selectedPrompt?.type,
                config: selectedPrompt?.config,
                labels: selectedPrompt?.labels,
                groupId: selectedPrompt?.groupId,
              };

              createNewVersion.mutate(tempPrompt);
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
            // defaultValue={selectedPrompt?.labels.join(', ')}
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
                <label className="mb-1 mr-1 rounded-full border px-2 flex gap-x-2 items-center" key={index}>
                  {label}
                  <Cross1Icon onClick={() => {
                    const newLabels = labels.filter((l) => l !== label);
                    setLabels((prev) => newLabels);
                    updatePromptLabelsMutation.mutate({ id: selectedPrompt?._id || '', payload: { labels: newLabels } });
                  }}
                    className='cursor-pointer' />
                </label>
              ))
            ) : (
              <label className="rounded-full border px-2">No Labels</label>
            )}
          </div>
        </div>
        {/* Right Section */}
        {!!prompts?.data?.length && (
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
                    setLabels(prompt.labels || []);
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
