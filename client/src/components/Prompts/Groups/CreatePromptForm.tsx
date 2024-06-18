import { useNavigate } from 'react-router-dom';
import { LocalStorageKeys } from 'librechat-data-provider';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import CategorySelector from '~/components/Prompts/Groups/CategorySelector';
import PromptVariables from '~/components/Prompts/PromptVariables';
import { Button, TextareaAutosize, Input } from '~/components/ui';
import { useCreatePrompt } from '~/data-provider';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

type CreateFormValues = {
  name: string;
  prompt: string;
  type: 'text' | 'chat';
  category: string;
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
  const localize = useLocalize();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      category: localStorage.getItem(LocalStorageKeys.LAST_PROMPT_CATEGORY) ?? '',
    },
  });

  const {
    watch,
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors, isValid },
  } = methods;

  const createPromptMutation = useCreatePrompt({
    onSuccess: (response) => {
      navigate(`/d/prompts/${response.prompt.groupId}`, { replace: true });
    },
  });

  const promptText = watch('prompt');

  const onSubmit = (data: CreateFormValues) => {
    const { name, category, ...rest } = data;
    createPromptMutation.mutate({
      prompt: rest,
      group: { name, category },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 py-2">
        <div className="mb-1 flex flex-col items-center justify-between font-bold sm:text-xl md:mb-0 md:text-2xl">
          <div className="flex w-full flex-col items-center justify-between sm:flex-row">
            <Controller
              name="name"
              control={control}
              rules={{ required: localize('com_ui_is_required', localize('com_ui_prompt_name')) }}
              render={({ field }) => (
                <div className="mb-1 flex items-center md:mb-0">
                  <Input
                    {...field}
                    type="text"
                    className="mr-2 w-full border border-gray-300 p-2 text-2xl dark:border-gray-600"
                    placeholder={`${localize('com_ui_prompt_name')}*`}
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
            <h2 className="flex items-center justify-between rounded-t-lg border border-gray-300 py-2 pl-4 pr-1 text-base font-semibold dark:border-gray-600 dark:text-gray-200">
              {localize('com_ui_text_prompt')}*
            </h2>
            <div className="mb-4 min-h-32 rounded-b-lg border border-gray-300 p-4 transition-all duration-150 dark:border-gray-600">
              <Controller
                name="prompt"
                control={control}
                rules={{ required: localize('com_ui_is_required', localize('com_ui_text_prompt')) }}
                render={({ field }) => (
                  <div>
                    <TextareaAutosize
                      {...field}
                      className="w-full rounded border border-gray-300 px-2 py-1 focus:outline-none dark:border-gray-600 dark:bg-transparent dark:text-gray-200"
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
          <PromptVariables promptText={promptText} />
          <div className="flex justify-end">
            <Button type="submit" variant="default" disabled={!isDirty || isSubmitting || !isValid}>
              {localize('com_ui_create_var', localize('com_ui_prompt'))}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreatePromptForm;