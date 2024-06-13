import { format, set } from 'date-fns';
import { TrashIcon, Share2Icon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo } from 'react';
import type { TPrompt, TCreatePrompt } from 'librechat-data-provider';
import {
  useCreatePrompt,
  useDeletePromptGroup,
  useUpdatePromptGroup,
  useMakePromptProduction,
} from '~/data-provider/mutations';
import { useGetPromptGroup, useGetPrompts } from '~/data-provider';
import { cn, extractUniqueVariables } from '~/utils';
import PromptEditor from './PromptEditor';
import { Button } from '~/components/ui';
import PromptName from './PromptName';

const PromptPreview = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: group } = useGetPromptGroup(params.promptId || '');
  const { data: prompts = [] } = useGetPrompts(
    { groupId: params.promptId ?? '' },
    { enabled: !!params.promptId },
  );
  const [selectedPrompt, setSelectedPrompt] = useState<TPrompt | undefined>();
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number>(0);

  const createPromptMutation = useCreatePrompt({
    onMutate(variables) {
      setSelectedPrompt((prev) => prev && { ...prev, prompt: variables.prompt.prompt });
    },
    onSuccess() {
      setSelectedPromptIndex(0);
    },
  });
  const updateGroupMutation = useUpdatePromptGroup();
  const makePromptProductionMutation = useMakePromptProduction();
  const deletePromptGroupMutation = useDeletePromptGroup({
    onSuccess: () => {
      navigate('/d/prompts');
    },
  });

  const onSave = useCallback(
    (value: string) => {
      if (!value) {
        // TODO: show toast, cannot be empty.
        return;
      }
      const tempPrompt: TCreatePrompt = {
        prompt: {
          type: selectedPrompt?.type ?? 'text',
          groupId: selectedPrompt?.groupId ?? '',
          prompt: value,
        },
      };

      if (value.trim() === selectedPrompt?.prompt?.trim()) {
        return;
      }
      createPromptMutation.mutate(tempPrompt);
    },
    [selectedPrompt, createPromptMutation],
  );

  useEffect(() => {
    if (params.promptId && prompts && prompts.length > 0 && prompts[selectedPromptIndex]) {
      setSelectedPrompt(prompts[selectedPromptIndex]);
    }
  }, [params.promptId, prompts, selectedPromptIndex]);

  const variables = useMemo(() => {
    return extractUniqueVariables(selectedPrompt?.prompt || '');
  }, [selectedPrompt?.prompt]);

  return (
    <div>
      <div className="flex flex-col items-center justify-between px-4 sm:flex-row">
        <PromptName
          name={group?.name}
          onSave={(value) => {
            if (!group) {
              return console.warn('Group not found');
            }
            updateGroupMutation.mutate({ id: group._id || '', payload: { name: value } });
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
            disabled={selectedPrompt?.isProduction}
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
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* Left Section */}
        <div className="flex-1 overflow-y-auto border-r border-gray-300 p-4 md:max-h-[calc(100vh-200px)]">
          <PromptEditor
            type={selectedPrompt?.type || ''}
            prompt={selectedPrompt?.prompt || ''}
            onSave={onSave}
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
        </div>
        {/* Right Section */}
        <div className="flex-1 overflow-y-auto p-4 md:max-h-[calc(100vh-200px)] md:w-1/4 md:max-w-[35%] lg:max-w-[30%] xl:max-w-[25%]">
          {!!prompts.length && (
            <>
              <h2 className="mb-4 text-base font-semibold">Versions</h2>
              <ul className="flex flex-col gap-3">
                {prompts.map((prompt, index) => {
                  const tags: string[] = [];
                  if (index === 0) {
                    tags.push('latest');
                  }

                  if (prompt.isProduction) {
                    tags.push('production');
                  }

                  return (
                    <li
                      key={index}
                      className={cn(
                        'cursor-pointer rounded-lg border p-4',
                        prompt === selectedPrompt ? 'bg-gray-100' : 'bg-white',
                      )}
                      onClick={() => {
                        setSelectedPrompt(prompt);
                        setSelectedPromptIndex(index);
                      }}
                    >
                      <p className="font-bold">Version: {prompts.length - index}</p>
                      {tags.length > 0 && <p className="text-sm italic">Tags: {tags.join(', ')}</p>}
                      <p className="whitespace-nowrap text-xs text-gray-600">
                        {format(new Date(prompt.createdAt), 'yyyy-MM-dd HH:mm')}
                      </p>
                      {group?.authorName && (
                        <p className="text-xs text-gray-600">by {group.authorName}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptPreview;
