import { Share2Icon, Rocket } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import type { TCreatePrompt } from 'librechat-data-provider';
import {
  useCreatePrompt,
  useDeletePromptGroup,
  useUpdatePromptGroup,
  useMakePromptProduction,
} from '~/data-provider/mutations';
import { useGetPromptGroup, useGetPrompts } from '~/data-provider';
import { Button, Skeleton } from '~/components/ui';
import CategorySelector from './CategorySelector';
import PromptVariables from './PromptVariables';
import PromptVersions from './PromptVersions';
import { TrashIcon } from '~/components/svg';
import PromptEditor from './PromptEditor';
import PromptName from './PromptName';

const PromptPreview = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: group, isLoading: isLoadingGroup } = useGetPromptGroup(params.promptId || '');
  const { data: prompts = [], isLoading: isLoadingPrompts } = useGetPrompts(
    { groupId: params.promptId ?? '' },
    { enabled: !!params.promptId },
  );

  const prevIsEditingRef = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectionIndex, setSelectionIndex] = useState<number>(0);
  const selectedPrompt = useMemo(() => prompts[selectionIndex], [prompts, selectionIndex]);

  const methods = useForm({
    defaultValues: {
      prompt: '',
      promptName: group?.name || '',
      category: group?.category || '',
    },
  });

  const { handleSubmit, setValue, reset } = methods;

  const createPromptMutation = useCreatePrompt({
    onSuccess(data) {
      reset({
        prompt: data.prompt.prompt,
        promptName: data.group?.name || '',
        category: data.group?.category || '',
      });
      setSelectionIndex(0);
    },
  });
  const updateGroupMutation = useUpdatePromptGroup();
  const makeProductionMutation = useMakePromptProduction({
    onSuccess(_data, variables) {
      const productionIndex = prompts.findIndex((prompt) => variables.id === prompt._id);
      setSelectionIndex(productionIndex);
    },
  });
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

      if (value === selectedPrompt?.prompt) {
        return;
      }

      createPromptMutation.mutate(tempPrompt);
    },
    [selectedPrompt, createPromptMutation],
  );

  useEffect(() => {
    if (prevIsEditingRef.current && !isEditing) {
      handleSubmit((data) => onSave(data.prompt))();
    }
    prevIsEditingRef.current = isEditing;
  }, [isEditing, onSave, handleSubmit]);

  useEffect(() => {
    setValue('prompt', selectedPrompt?.prompt || '', { shouldDirty: false });
    setValue('category', group?.category || '', { shouldDirty: false });
  }, [selectedPrompt, group?.category, setValue]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => onSave(data.prompt))}>
        <div>
          <div className="flex flex-col items-center justify-between px-4 sm:flex-row">
            {isLoadingGroup ? (
              <Skeleton className="mb-1 flex h-10 w-32 flex-row items-center font-bold sm:text-xl md:mb-0 md:h-12 md:text-2xl" />
            ) : (
              <PromptName
                name={group?.name}
                onSave={(value) => {
                  if (!group) {
                    return console.warn('Group not found');
                  }
                  updateGroupMutation.mutate({ id: group._id || '', payload: { name: value } });
                }}
              />
            )}
            <div className="flex h-10 flex-row gap-x-2">
              <CategorySelector
                className="w-48 md:w-56"
                currentCategory={group?.category}
                onValueChange={(value) =>
                  updateGroupMutation.mutate({
                    id: group?._id || '',
                    payload: { name: group?.name || '', category: value },
                  })
                }
              />
              <Button
                variant={'default'}
                size={'sm'}
                className="h-10 w-10 bg-blue-500/90 transition-all hover:bg-blue-600"
                disabled={isLoadingGroup}
              >
                <Share2Icon className="cursor-pointer" />
              </Button>
              <Button
                size={'sm'}
                className="h-10 bg-green-400 transition-all hover:bg-green-500"
                variant={'default'}
                onClick={() =>
                  makeProductionMutation.mutate({
                    id: selectedPrompt?._id || '',
                    groupId: group?._id || '',
                  })
                }
                disabled={
                  isLoadingGroup || selectedPrompt?.isProduction || makeProductionMutation.isLoading
                }
              >
                <Rocket />
              </Button>
              <Button
                size={'sm'}
                className="h-10 w-10 bg-red-100 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                disabled={isLoadingGroup}
                onClick={() => deletePromptGroupMutation.mutate({ id: group?._id || '' })}
              >
                <TrashIcon className="icon-lg cursor-pointer" />
              </Button>
            </div>
          </div>
          <div className="flex h-full w-full flex-col md:flex-row">
            {/* Left Section */}
            <div className="flex-1 overflow-y-auto border-r border-gray-300 p-4 md:max-h-[calc(100vh-150px)]">
              {isLoadingPrompts ? (
                <Skeleton className="h-96" />
              ) : (
                <>
                  <PromptEditor
                    name="prompt"
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    type={selectedPrompt?.type || ''}
                    prompt={selectedPrompt?.prompt || ''}
                  />
                  <PromptVariables />
                </>
              )}
            </div>
            {/* Right Section */}
            <div className="flex-1 overflow-y-auto p-4 md:max-h-[calc(100vh-150px)] md:w-1/4 md:max-w-[35%] lg:max-w-[30%] xl:max-w-[25%]">
              {isLoadingPrompts ? (
                <Skeleton className="h-96 w-full" />
              ) : (
                !!prompts.length && (
                  <PromptVersions
                    group={group}
                    prompts={prompts}
                    selectionIndex={selectionIndex}
                    setSelectionIndex={setSelectionIndex}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default PromptPreview;
