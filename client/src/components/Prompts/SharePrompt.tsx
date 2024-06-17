import React, { useMemo } from 'react';
import { Share2Icon } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { useGetStartupConfig } from 'librechat-data-provider/react-query';
import type { TPromptGroup, TStartupConfig } from 'librechat-data-provider';
import { OGDialog, OGDialogTitle, OGDialogContent, OGDialogTrigger } from '~/components/ui';
import { useUpdatePromptGroup } from '~/data-provider';
import { Button, Checkbox } from '~/components/ui';
import { useToastContext } from '~/Providers';
import { useLocalize } from '~/hooks';

type FormValues = {
  shareGlobal: boolean;
};

const PromptPreview = ({ group, disabled }: { group?: TPromptGroup; disabled: boolean }) => {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const updateGroup = useUpdatePromptGroup();
  const { data: startupConfig = {} as TStartupConfig, isFetching } = useGetStartupConfig();
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      shareGlobal: false,
    },
  });

  const { instanceProjectId } = startupConfig;
  const groupIsGlobal = useMemo(
    () => group?.projectIds?.includes(instanceProjectId),
    [group, instanceProjectId],
  );

  if (!group || !instanceProjectId) {
    return null;
  }

  const onSubmit = (data: FormValues) => {
    if (!group._id || !instanceProjectId) {
      return;
    }

    const payload = {} as Partial<TPromptGroup>;

    if (data.shareGlobal) {
      payload.projectIds = [startupConfig.instanceProjectId];
    } else {
      payload.projectIds = [];
    }

    updateGroup.mutate({
      id: group._id,
      payload,
    });
  };

  return (
    <OGDialog>
      <OGDialogTrigger asChild>
        <Button
          variant={'default'}
          size={'sm'}
          className="h-10 w-10 border border-transparent bg-blue-500/90 transition-all hover:bg-blue-600 dark:border-blue-600 dark:bg-transparent dark:hover:bg-blue-950"
          disabled={disabled}
        >
          <Share2Icon className="cursor-pointer dark:text-blue-600" />
        </Button>
      </OGDialogTrigger>
      <OGDialogContent className="bg-white dark:border-gray-700 dark:bg-gray-750 dark:text-gray-300">
        <OGDialogTitle>{localize('com_ui_share_var', `"${group.name}"`)}</OGDialogTitle>
        <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex items-center justify-start gap-2">
            <Controller
              name={'shareGlobal'}
              control={control}
              disabled={isFetching || updateGroup.isLoading || !instanceProjectId}
              rules={{
                validate: (value) => {
                  const isValid = !(value && groupIsGlobal);
                  if (!isValid) {
                    showToast({
                      message: localize('com_ui_prompt_shared_to_all'),
                      status: 'error',
                    });
                  }
                  return isValid;
                },
              }}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  value={field?.value?.toString()}
                />
              )}
            />
            <label
              className="cursor-pointer select-none"
              htmlFor={'shareGlobal'}
              onClick={() =>
                setValue('shareGlobal', !getValues('shareGlobal'), {
                  shouldDirty: true,
                })
              }
            >
              {localize('com_ui_share_to_all_users')}
              {groupIsGlobal && (
                <span className="ml-2 text-xs">{localize('com_ui_prompt_shared_to_all')}</span>
              )}
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || isFetching}
              className="btn rounded bg-green-500 font-bold text-white transition-all hover:bg-green-600"
            >
              {localize('com_ui_share')}
            </button>
          </div>
        </form>
      </OGDialogContent>
    </OGDialog>
  );
};

export default PromptPreview;
