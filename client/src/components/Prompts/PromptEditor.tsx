import { EditIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { TextareaAutosize } from '~/components/ui';
import { cn } from '~/utils';

type Props = {
  type: string;
  prompt: string;
  onSave: (newPrompt: string) => void;
};

const PromptEditor: React.FC<Props> = ({ type, prompt, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrompt, setNewPrompt] = useState(prompt);
  const prevIsEditingRef = useRef(isEditing);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPrompt(e.target.value);
  };

  useEffect(() => {
    setNewPrompt(prompt);
  }, [type, prompt]);

  useEffect(() => {
    if (prevIsEditingRef.current && !isEditing) {
      onSave(newPrompt);
    }
    prevIsEditingRef.current = isEditing;
  }, [isEditing, newPrompt, onSave]);

  return (
    <div>
      <h2 className="flex items-center justify-between rounded-t-lg border border-gray-300 py-2 pl-4 pr-1 text-base font-semibold">
        {type} prompt
        <EditIcon
          onClick={() => setIsEditing((prev) => !prev)}
          className={cn(
            'icon-lg mr-2 cursor-pointer',
            isEditing ? '' : 'text-gray-400 hover:text-gray-600',
          )}
        />
      </h2>
      <div
        className={cn(
          'mb-4 min-h-32 rounded-b-lg border border-gray-300 p-4 transition-all duration-150',
          { 'cursor-pointer hover:bg-gray-100/50': !isEditing },
        )}
        onClick={() => !isEditing && setIsEditing(true)}
      >
        {isEditing ? (
          <TextareaAutosize
            className="w-full rounded border border-gray-300 px-2 py-1"
            value={newPrompt}
            defaultValue={prompt}
            onChange={handleInputChange}
            onBlur={() => setIsEditing(false)}
            minRows={3}
          />
        ) : (
          <span className="block px-2 py-1">{prompt}</span>
        )}
      </div>
    </div>
  );
};

export default PromptEditor;
