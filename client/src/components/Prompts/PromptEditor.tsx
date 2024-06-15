import { useMemo } from 'react';
import { EditIcon } from 'lucide-react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { SaveIcon, CrossIcon } from '~/components/svg';
import { TextareaAutosize } from '~/components/ui';
import { cn } from '~/utils';

type Props = {
  type: string;
  name: string;
  prompt: string;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const PromptEditor: React.FC<Props> = ({ type, name, isEditing, setIsEditing }) => {
  const { control } = useFormContext();
  const { dirtyFields } = useFormState({ control: control });

  const EditorIcon = useMemo(() => {
    if (isEditing && !dirtyFields.prompt) {
      return CrossIcon;
    }
    return isEditing ? SaveIcon : EditIcon;
  }, [isEditing, dirtyFields.prompt]);

  return (
    <div>
      <h2 className="flex items-center justify-between rounded-t-lg border border-gray-300 py-2 pl-4 text-base font-semibold dark:border-gray-600 dark:text-gray-200">
        {type} prompt
        <button type="button" onClick={() => setIsEditing((prev) => !prev)} className="mr-2">
          <EditorIcon
            className={cn(
              'icon-lg',
              isEditing ? 'p-[0.05rem]' : 'text-gray-400 hover:text-gray-600',
            )}
          />
        </button>
      </h2>
      <div
        className={cn(
          'group relative mb-4 min-h-32 rounded-b-lg border border-gray-300 p-4 transition-all duration-150 hover:opacity-90 dark:border-gray-600',
          { 'cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-100/10': !isEditing },
        )}
        onClick={() => !isEditing && setIsEditing(true)}
      >
        {!isEditing && (
          <EditIcon className="icon-xl absolute inset-0 m-auto hidden opacity-25 group-hover:block dark:text-gray-200" />
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) =>
            isEditing ? (
              <TextareaAutosize
                {...field}
                className="w-full rounded border border-gray-300 bg-transparent px-2 py-1 focus:outline-none dark:border-gray-600 dark:text-gray-200"
                minRows={3}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <span className="block break-words px-2 py-1 dark:text-gray-200">{field.value}</span>
            )
          }
        />
      </div>
    </div>
  );
};

export default PromptEditor;
