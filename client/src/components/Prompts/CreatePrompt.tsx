import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Button, Textarea, Input } from '~/components/ui';
import { useCreatePrompt } from '~/data-provider';

type CreateFormValues = {
  name: string;
  prompt: string;
  type: 'text' | 'chat';
};
const defaultPrompt: CreateFormValues = {
  name: '',
  prompt: '',
  type: 'text',
};

const PromptEditorForm = ({
  defaultValues = defaultPrompt,
}: {
  defaultValues?: CreateFormValues;
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues,
  });

  const navigate = useNavigate();
  const createPromptMutation = useCreatePrompt({
    onSuccess: (response) => {
      navigate(`/d/prompts/${response.prompt.groupId}`, { replace: true });
    },
  });

  const onSubmit = (data: CreateFormValues) => {
    const { name, ...rest } = data;
    createPromptMutation.mutate({
      prompt: rest,
      group: { name },
    });
  };

  const watchType = watch('type');

  useEffect(() => {
    setValue('prompt', defaultValues.prompt);
  }, [watchType, defaultValues.prompt, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4">
      <div className="flex w-full flex-row items-center text-2xl font-bold md:w-1/2">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              className="mr-2 border border-gray-300 p-2 text-2xl"
              placeholder="Prompt Name"
            />
          )}
        />
      </div>
      <div className="w-full">
        <div>
          <h2 className="flex w-full items-center justify-between rounded-t-lg border border-gray-300 pl-4 pr-1 text-base font-semibold">
            {watchType} prompt
          </h2>
          <div className="mb-4 rounded-b-lg border border-gray-300 p-4">
            <Controller
              name="prompt"
              control={control}
              render={({ field }) => (
                <Textarea {...field} className="mb-2 w-full rounded border border-gray-300 p-2" />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant={'default'} disabled={!isDirty || isSubmitting}>
            Create Prompt
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PromptEditorForm;
