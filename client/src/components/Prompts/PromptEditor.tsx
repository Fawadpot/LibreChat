import React, { useEffect, useState } from 'react';
import { EditIcon } from 'lucide-react';
import { Button, Textarea } from '../ui';

type Props = {
  type: string;
  prompt: string;
  onSave: (newPrompt: string) => void; // Function to handle saving the new prompt
};

const PromptEditor: React.FC<Props> = ({ type, prompt, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrompt, setNewPrompt] = useState(prompt);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPrompt(e.target.value);
  };

  const handleSaveClick = () => {
    onSave(newPrompt || '');
    setIsEditing(false);
  };

  useEffect(() => {
    setNewPrompt(prompt);
  }, [type, prompt]);

  return (
    <div>
      <h2 className="flex w-full items-center justify-between rounded-t-lg border border-gray-300 pl-4 pr-1 text-base font-semibold">
        {type} prompt
        {isEditing ? null : (
          <EditIcon className="size-4 cursor-pointer" onClick={handleEditClick} />
        )}
      </h2>
      {isEditing ? (
        <div className="mb-4 rounded-b-lg border border-gray-300 p-4">
          <Textarea
            className="mb-2 w-full rounded border border-gray-300 p-2"
            value={newPrompt}
            defaultValue={prompt}
            onChange={handleInputChange}
          />
          <div className="flex w-full justify-end">
            <Button onClick={handleSaveClick} className="content-end">
              Save
            </Button>
          </div>
        </div>
      ) : (
        <p className="mb-4 rounded-b-lg border border-gray-300 p-4">{prompt}</p>
      )}
    </div>
  );
};

export default PromptEditor;
