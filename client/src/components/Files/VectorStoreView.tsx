import React from 'react';
import VectorStoreSidePanel from './VectorStore/VectorStoreSidePanel';
import VectorStorePreview from './VectorStore/VectorStorePreview';
import { TFile } from 'librechat-data-provider/dist/types';
import FilesSectionSelector from './FilesSectionSelector';
import { Button } from '../ui';

const vectorStore = {
  id: 'vs_NeHK4JidLKJ2qo23dKLLK',
  name: 'Vector Store 1',
  usageThisMonth: '1,000,000',
  bytes: 1000000,
  lastActive: '2022-01-01T10:00:00',
  expirationPolicy: 'Never',
  expires: 'Never',
  createdAt: '2022-01-01T10:00:00',
};
const filesAttached: TFile[] = [
  {
    filename: 'File1.jpg',
    object: 'file',
    bytes: 10000,
    createdAt: '2022-01-01T10:00:00',
    _id: '1',
    type: 'image',
    usage: 12,
    user: 'abc',
    file_id: 'file_id',
    embedded: true,
    filepath: 'filepath',
  },
  {
    filename: 'File1.jpg',
    object: 'file',
    bytes: 10000,
    createdAt: '2022-01-01T10:00:00',
    _id: '1',
    type: 'image',
    usage: 12,
    user: 'abc',
    file_id: 'file_id',
    embedded: true,
    filepath: 'filepath',
  },
  {
    filename: 'File1.jpg',
    object: 'file',
    bytes: 10000,
    createdAt: '2022-01-01T10:00:00',
    _id: '1',
    type: 'image',
    usage: 12,
    user: 'abc',
    file_id: 'file_id',
    embedded: true,
    filepath: 'filepath',
  },
  {
    filename: 'File1.jpg',
    object: 'file',
    bytes: 10000,
    createdAt: '2022-01-01T10:00:00',
    _id: '1',
    type: 'image',
    usage: 12,
    user: 'abc',
    file_id: 'file_id',
    embedded: true,
    filepath: 'filepath',
  },
];
const assistants = [
  {
    id: 'Lorum Ipsum',
    resource: 'Lorum Ipsum',
  },
  {
    id: 'Lorum Ipsum',
    resource: 'Lorum Ipsum',
  },
  {
    id: 'Lorum Ipsum',
    resource: 'Lorum Ipsum',
  },
  {
    id: 'Lorum Ipsum',
    resource: 'Lorum Ipsum',
  },
];

export default function VectorStoreView() {
  return (
    <div className="bg-[#f9f9f9]  p-7">
      <div className="flex w-full flex-row justify-between">
        <FilesSectionSelector />
        <Button variant={'outline'} size={'sm'}>
          Go back
        </Button>
      </div>
      <div className="mt-2 flex flex-row divide-x">
        <div className="w-1/3">
          <VectorStoreSidePanel />
        </div>
        <div className="w-2/3">
          <VectorStorePreview
            vectorStore={vectorStore}
            filesAttached={filesAttached}
            assistants={assistants}
            removeFile={() => {
              console.log('removeFile');
            }}
            deleteVectorStore={() => {
              console.log('deleteVectorStore');
            }}
          />
        </div>
      </div>
    </div>
  );
}
