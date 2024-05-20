import React from 'react';
import FileList from './FileList';
import { TFile } from 'librechat-data-provider/dist/types';
import FilesSectionSelector from '../FilesSectionSelector';

const fakeFiles = [
  {
    filename: 'File1.jpg',
    object: 'Description 1',
    bytes: 10000,
    createdAt: '2022-01-01T10:00:00',
    _id: '1',
  },
  {
    filename: 'File2.jpg',
    object: 'Description 2',
    bytes: 15000,
    createdAt: '2022-01-02T15:30:00',
    _id: '2',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
  {
    filename: 'File3.jpg',
    object: 'Description 3',
    bytes: 20000,
    createdAt: '2022-01-03T09:45:00',
    _id: '3',
  },
];

const attachedVectorStores = [
  { name: 'VectorStore1' },
  { name: 'VectorStore2' },
  { name: 'VectorStore3' },
  { name: 'VectorStore3' },
  { name: 'VectorStore3' },
  { name: 'VectorStore3' },
  { name: 'VectorStore3' },
  { name: 'VectorStore3' },
  { name: 'VectorStore3' },
];

export default function FileSidePanel() {
  const deleteFile = (id: string | undefined) => {
    // Define delete functionality here
    console.log(`Deleting File with id: ${id}`);
  };

  return (
    <div>
      <div className="w-30">
        <div>
          <FilesSectionSelector />
        </div>
        <div>
          <FileList
            files={fakeFiles as TFile[]}
            deleteFile={deleteFile}
            attachedVectorStores={attachedVectorStores}
          />
        </div>
      </div>
    </div>
  );
}
