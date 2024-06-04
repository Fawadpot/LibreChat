import React, { useEffect, useState } from 'react';
import { PencilIcon } from 'lucide-react';
import { Button, Input } from '../ui';

type Props = {
  name?: string;
  onSave: (newName: string) => void; // Function to handle saving the new name
};

const PromptName: React.FC<Props> = ({ name, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

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

  useEffect(() => {
    setNewName(name);
  }, [name]);

  return (
    <div className="mb-5 flex flex-row items-center text-2xl font-bold">
      {isEditing ? (
        <>
          <Input
            type="text"
            value={newName}
            onChange={handleInputChange}
            className="mr-2 border border-gray-300 p-2 text-2xl"
            defaultValue={name}
          />
          <Button variant={'default'} onClick={handleSaveClick}>
            Save
          </Button>
        </>
      ) : (
        <>
          {name}&nbsp;&nbsp;&nbsp;
          <PencilIcon className="cursor-pointer" onClick={handleEditClick} />
        </>
      )}
    </div>
  );
};

export default PromptName;
