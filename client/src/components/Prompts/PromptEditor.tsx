import { EditIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextareaAutosize } from '~/components/ui';
import { SaveIcon } from '~/components/svg';
import { cn } from '~/utils';

type Props = {
  type: string;
  name: string;
  prompt: string;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const PromptEditor: React.FC<Props> = ({ type, prompt, name, isEditing, setIsEditing }) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(name, prompt);
  }, [prompt, setValue, name]);

  const EditorIcon = isEditing ? SaveIcon : EditIcon;

  return (
    <div>
      <h2 className="flex items-center justify-between rounded-t-lg border border-gray-300 py-2 pl-4 text-base font-semibold">
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
          'mb-4 min-h-32 rounded-b-lg border border-gray-300 p-4 transition-all duration-150',
          { 'cursor-pointer hover:bg-gray-100/50': !isEditing },
        )}
        onClick={() => !isEditing && setIsEditing(true)}
      >
        <Controller
          name={name}
          control={control}
          // Ensure it's editable only when isEditing is true
          render={({ field }) =>
            isEditing ? (
              <TextareaAutosize
                {...field}
                className="w-full rounded border border-gray-300 px-2 py-1"
                minRows={3}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <span className="block break-words px-2 py-1">{field.value}</span>
            )
          }
        />
      </div>
    </div>
  );
};

export default PromptEditor;
