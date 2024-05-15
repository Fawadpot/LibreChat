import React from 'react';
import FileList from './FileList';

type File = {
  name: string;
  description: string;
  size: number;
  filesCount: number;
  createdAt: string;
  id: string;
};

const fakeFiles = [
  {
    name: 'VectorStore 1',
    description: 'Description 1',
    size: 10,
    createdAt: '2022-01-01T10:00:00',
    id: '1',
  },
  {
    name: 'VectorStore 2',
    description: 'Description 2',
    size: 15,
    createdAt: '2022-01-02T15:30:00',
    id: '2',
  },
  {
    name: 'VectorStore 3',
    description: 'Description 3',
    size: 20,
    createdAt: '2022-01-03T09:45:00',
    id: '3',
  },
];

const FileSidePanel: React.FC = () => {
  const deleteFile = (id: string) => {
    // Define delete functionality here
    console.log(`Deleting File with id: ${id}`);
  };

  return (
    <div>
      <h2>File</h2>
      <FileList files={fakeFiles as File[]} deleteFile={deleteFile} />
    </div>
  );
};

export default FileSidePanel;
