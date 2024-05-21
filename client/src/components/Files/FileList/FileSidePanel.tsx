import React from 'react';
import FileList from './FileList';
import { TFile } from 'librechat-data-provider/dist/types';
import FilesSectionSelector from '../FilesSectionSelector';
import { Button, Input } from '~/components/ui';
import { ListFilter } from 'lucide-react';
import UploadFileButton from './UploadFileButton';
import { useLocalize } from '~/hooks';

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
  const localize = useLocalize();
  const deleteFile = (id: string | undefined) => {
    // Define delete functionality here
    console.log(`Deleting File with id: ${id}`);
  };

  return (
    <div>
      <div className="w-30">
        <h2 className="text-lg">
          <strong>Files</strong>
        </h2>
        <div className="mt-2 flex flex-row justify-between">
          <div className="flex flex-row">
            <Button variant="ghost" className="m-0 mr-2 p-0">
              <ListFilter className="h-4 w-4" />
            </Button>
            <Input
              placeholder={localize('com_files_filter')}
              value={''}
              onChange={() => {
                console.log('changed');
              }}
              className="max-w-sm dark:border-gray-500"
            />
          </div>
          <div className="w-1/3">
            <UploadFileButton
              onClick={() => {
                console.log('Upload');
              }}
            />
          </div>
        </div>
        <div className="mt-3">
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
