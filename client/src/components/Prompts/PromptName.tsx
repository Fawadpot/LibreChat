import React, { useEffect, useState, useRef } from 'react';
import { EditIcon, SaveIcon } from '~/components/svg';

type Props = {
  name?: string;
  onSave: (newName: string) => void;
};

const PromptName: React.FC<Props> = ({ name, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleSaveClick = () => {
    onSave(newName || '');
    setIsEditing(false);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setNewName(name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setNewName(name);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setNewName(name);
  }, [name]);

  return (
    <div className="mb-1 flex flex-row items-center font-bold sm:text-xl md:mb-0 md:text-2xl">
      {isEditing ? (
        <div className="mb-1 flex items-center md:mb-0">
          <input
            type="text"
            value={newName ?? ''}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className="mr-2 w-56 rounded-md border p-2 md:w-auto"
            autoFocus={true}
          />
          <button
            type="button"
            onClick={handleSaveClick}
            className="rounded p-2 hover:bg-gray-300/50"
          >
            <SaveIcon className="icon-md" size="1.2em" />
          </button>
        </div>
      ) : (
        <div className="mb-1 flex items-center md:mb-0">
          <span className="mr-2 border border-transparent p-2">{name}</span>
          <button
            type="button"
            onClick={handleEditClick}
            className="rounded p-2 hover:bg-gray-300/50"
          >
            <EditIcon className="icon-md" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptName;
