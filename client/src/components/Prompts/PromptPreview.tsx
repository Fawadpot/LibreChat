import { format } from 'date-fns';
import { Share2Icon, Layers3 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import type { TCreatePrompt } from 'librechat-data-provider';
import {
  useCreatePrompt,
  useDeletePromptGroup,
  useUpdatePromptGroup,
  useMakePromptProduction,
} from '~/data-provider/mutations';
import { useGetCategories, useGetPromptGroup, useGetPrompts } from '~/data-provider';
import { Button, Skeleton, SelectDropDown } from '~/components/ui';
import PromptVariables from './PromptVariables';
import { TrashIcon } from '~/components/svg';
import CategoryIcon from './CategoryIcon';
import PromptEditor from './PromptEditor';
import PromptName from './PromptName';
import { cn } from '~/utils';

const loadingCategories = [
  {
    label: 'Loading...',
    value: '',
  },
];

const emptyCategory = {
  label: '-',
  value: '',
};

const PromptPreview = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: categories = loadingCategories } = useGetCategories({
    select: (data) =>
      data.map((category) => ({
        label: category.label,
        value: category.value,
        icon: <CategoryIcon category={category.value} />,
      })),
  });
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

  const { watch, setValue, control } = methods;
  const watchedPrompt = watch('prompt');
  const watchedCategory = watch('category');

  const categoryOption = useMemo(
    () =>
      categories.find((category) => category.value === (watchedCategory ?? group?.category)) ??
      emptyCategory,
    [watchedCategory, categories, group?.category],
  );

  const createPromptMutation = useCreatePrompt({
    onMutate() {
      setSelectionIndex(0);
    },
    onSuccess() {
      setValue('prompt', '');
      setValue('promptName', group?.name || '');
      setValue('category', group?.category || '');
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

      if (value.trim() === selectedPrompt?.prompt?.trim()) {
        return;
      }
      createPromptMutation.mutate(tempPrompt);
    },
    [selectedPrompt, createPromptMutation],
  );

  useEffect(() => {
    if (prevIsEditingRef.current && !isEditing) {
      onSave(watchedPrompt);
    }
    prevIsEditingRef.current = isEditing;
  }, [isEditing, watchedPrompt, onSave]);

  useEffect(() => {
    setValue('prompt', selectedPrompt?.prompt || '');
    setValue('category', group?.category || '');
  }, [selectedPrompt, group?.category, setValue]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => onSave(watchedPrompt))}>
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
              <Controller
                name="category"
                control={control}
                rules={{ required: true, minLength: 1 }}
                render={({ field }) => (
                  <SelectDropDown
                    title="Category"
                    value={categoryOption || ''}
                    setValue={(value) => {
                      field.onChange(value);
                      updateGroupMutation.mutate({
                        id: group?._id || '',
                        payload: { name: group?.name || '', category: value },
                      });
                    }}
                    availableValues={categories}
                    showAbove={false}
                    showLabel={false}
                    emptyTitle={true}
                    showOptionIcon={true}
                    searchPlaceholder="Search categories..."
                    className="h-10 w-56 cursor-pointer"
                    currentValueClass="text-md gap-2"
                    optionsListClass="text-sm"
                  />
                )}
              />
              <Button
                variant={'default'}
                size={'sm'}
                className="h-10 w-10"
                disabled={isLoadingGroup}
              >
                <Share2Icon className="cursor-pointer" />
              </Button>
              <Button
                size={'sm'}
                className="h-10"
                variant={'default'}
                onClick={() => makeProductionMutation.mutate({ id: selectedPrompt?._id || '' })}
                disabled={isLoadingGroup || selectedPrompt?.isProduction}
              >
                Make it Production
              </Button>
              <Button
                size={'sm'}
                variant={'default'}
                className="h-10 w-10"
                disabled={isLoadingGroup}
                onClick={() => deletePromptGroupMutation.mutate({ id: group?._id || '' })}
              >
                <TrashIcon className="icon-lg cursor-pointer" />
              </Button>
            </div>
          </div>
          <div className="flex h-full w-full flex-col md:flex-row">
            {/* Left Section */}
            <div className="flex-1 overflow-y-auto border-r border-gray-300 p-4 md:max-h-[calc(100vh-200px)]">
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
            <div className="flex-1 overflow-y-auto p-4 md:max-h-[calc(100vh-200px)] md:w-1/4 md:max-w-[35%] lg:max-w-[30%] xl:max-w-[25%]">
              {isLoadingPrompts ? (
                <Skeleton className="h-96 w-full" />
              ) : (
                !!prompts.length && (
                  <>
                    <h2 className="mb-4 flex gap-2 text-base font-semibold">
                      <Layers3 className="icon-lg" />
                      Versions
                    </h2>
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
                              index === selectionIndex ? 'bg-gray-100' : 'bg-white',
                            )}
                            onClick={() => setSelectionIndex(index)}
                          >
                            <p className="font-bold">Version: {prompts.length - index}</p>
                            {tags.length > 0 && (
                              <p className="text-sm italic">Tags: {tags.join(', ')}</p>
                            )}
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
