import { useMemo, useEffect } from 'react';
import { ShieldEllipsis } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import {
  PermissionTypes,
  PromptPermissions,
  SystemRoles,
  roleDefaults,
} from 'librechat-data-provider';
import type { Control, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { OGDialog, OGDialogTitle, OGDialogContent, OGDialogTrigger } from '~/components/ui';
import { useUpdatePromptPermissionsMutation } from '~/data-provider';
import { useLocalize, useAuthContext } from '~/hooks';
import { Button, Switch } from '~/components/ui';

type FormValues = Record<PromptPermissions, boolean>;

type LabelControllerProps = {
  label: string;
  promptPerm: PromptPermissions;
  control: Control<FormValues, unknown, FormValues>;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
};

const defaultValues = roleDefaults[SystemRoles.USER];

const LabelController: React.FC<LabelControllerProps> = ({
  control,
  promptPerm,
  label,
  getValues,
  setValue,
}) => (
  <div className="mb-4 flex items-center justify-between gap-2">
    <label
      className="cursor-pointer select-none"
      htmlFor={promptPerm}
      onClick={() =>
        setValue(promptPerm, !getValues(promptPerm), {
          shouldDirty: true,
        })
      }
    >
      {label}
    </label>
    <Controller
      name={promptPerm}
      control={control}
      render={({ field }) => (
        <Switch
          {...field}
          checked={field.value}
          onCheckedChange={field.onChange}
          value={field?.value?.toString()}
        />
      )}
    />
  </div>
);

const AdminSettings = () => {
  const localize = useLocalize();
  const { user, roles } = useAuthContext();
  const { mutate } = useUpdatePromptPermissionsMutation();

  const {
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: useMemo(() => {
      if (roles?.[SystemRoles.USER]) {
        return roles[SystemRoles.USER][PermissionTypes.PROMPTS];
      }

      return defaultValues[PermissionTypes.PROMPTS];
    }, [roles]),
  });

  useEffect(() => {
    if (roles?.[SystemRoles.USER]?.[PermissionTypes.PROMPTS]) {
      reset(roles[SystemRoles.USER][PermissionTypes.PROMPTS]);
    }
  }, [roles, reset]);

  if (user?.role !== SystemRoles.ADMIN) {
    return null;
  }

  const labelControllerData = [
    {
      promptPerm: PromptPermissions.SHARED_GLOBAL,
      label: localize('com_ui_prompts_allow_share_global'),
    },
    {
      promptPerm: PromptPermissions.USE,
      label: localize('com_ui_prompts_allow_use'),
    },
    {
      promptPerm: PromptPermissions.CREATE,
      label: localize('com_ui_prompts_allow_create'),
    },
  ];

  const onSubmit = (data: FormValues) => {
    mutate({ roleName: SystemRoles.USER, updates: data });
  };

  return (
    <OGDialog>
      <OGDialogTrigger asChild>
        <Button
          size={'sm'}
          variant={'outline'}
          className="h-10 w-fit gap-1 border transition-all dark:bg-transparent"
        >
          <ShieldEllipsis className="cursor-pointer" />
          {localize('com_ui_admin')}
        </Button>
      </OGDialogTrigger>
      <OGDialogContent className="bg-white dark:border-gray-700 dark:bg-gray-750 dark:text-gray-300">
        <OGDialogTitle>{`${localize('com_ui_admin_settings')} - ${localize(
          'com_ui_prompts',
        )}`}</OGDialogTitle>
        <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="py-5">
            {labelControllerData.map(({ promptPerm, label }) => (
              <LabelController
                key={promptPerm}
                control={control}
                promptPerm={promptPerm}
                label={label}
                getValues={getValues}
                setValue={setValue}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn rounded bg-green-500 font-bold text-white transition-all hover:bg-green-600"
            >
              {localize('com_ui_save')}
            </button>
          </div>
        </form>
      </OGDialogContent>
    </OGDialog>
  );
};

export default AdminSettings;
