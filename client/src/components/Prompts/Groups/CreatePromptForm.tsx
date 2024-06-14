import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Button, TextareaAutosize, Input } from '~/components/ui';
import CategorySelector from './CategorySelector';
import { useCreatePrompt } from '~/data-provider';
import PromptVariables from '../PromptVariables';
import { cn } from '~/utils';

type CreateFormValues = {
  name: string;
  prompt: string;
  category: string;
  type: 'text' | 'chat';
};

const defaultPrompt: CreateFormValues = {
  name: '',
  prompt: '',
  type: 'text',
  category: '',
};

const CreatePromptForm = ({
  defaultValues = defaultPrompt,
}: {
  defaultValues?: CreateFormValues;
}) => {
  const methods = useForm({
    defaultValues,
  });

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors, isValid },
  } = methods;

  const navigate = useNavigate();
  const createPromptMutation = useCreatePrompt({
    onSuccess: (response) => {
      navigate(`/d/prompts/${response.prompt.groupId}`, { replace: true });
    },
  });

  const onSubmit = (data: CreateFormValues) => {
    const { name, category, ...rest } = data;
    createPromptMutation.mutate({
      prompt: rest,
      group: { name, category },
    });
  };

  const watchType = watch('type');

  useEffect(() => {
    setValue('prompt', defaultValues.prompt);
  }, [watchType, defaultValues.prompt, setValue]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 py-2">
        <div className="mb-1 flex flex-col items-center justify-between font-bold sm:text-xl md:mb-0 md:text-2xl">
          <div className="flex w-full flex-col items-center justify-between sm:flex-row">
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Prompt name is required' }}
              render={({ field }) => (
                <div className="mb-1 flex items-center md:mb-0">
                  <Input
                    {...field}
                    type="text"
                    className="mr-2 w-full border border-gray-300 p-2 text-2xl"
                    placeholder="Prompt Name*"
                  />
                  <div
                    className={cn(
                      'mt-1 w-56 text-sm text-red-500',
                      errors.name ? 'visible h-auto' : 'invisible h-0',
                    )}
                  >
                    {errors.name ? errors.name.message : ' '}
                  </div>
                </div>
              )}
            />
            <CategorySelector />
          </div>
        </div>
        <div className="w-full md:mt-[1.075rem]">
          <div>
            <h2 className="flex items-center justify-between rounded-t-lg border border-gray-300 py-2 pl-4 pr-1 text-base font-semibold">
              {watchType} prompt*
            </h2>
            <div className="mb-4 min-h-32 rounded-b-lg border border-gray-300 p-4 transition-all duration-150">
              <Controller
                name="prompt"
                control={control}
                rules={{ required: 'Prompt content is required' }}
                render={({ field }) => (
                  <div>
                    <TextareaAutosize
                      {...field}
                      className="w-full rounded border border-gray-300 px-2 py-1"
                      minRows={6}
                    />
                    <div
                      className={`mt-1 text-sm text-red-500 ${
                        errors.prompt ? 'visible h-auto' : 'invisible h-0'
                      }`}
                    >
                      {errors.prompt ? errors.prompt.message : ' '}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
          <PromptVariables />

          <div className="flex justify-end">
            <Button type="submit" variant="default" disabled={!isDirty || isSubmitting || !isValid}>
              Create Prompt
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreatePromptForm;
