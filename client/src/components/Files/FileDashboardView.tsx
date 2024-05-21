import React from 'react';
import VectorStoreSidePanel from './VectorStore/VectorStoreSidePanel';
import { files } from '../Chat/Input/Files/Table';
import { fileTableColumns } from './FileList/FileTableColumns';
import { TVectorStore } from '~/common';
import DataTableFile from './FileList/DataTableFile';

const vectorStoresAttached: TVectorStore[] = [
  {
    name: 'vector 1 vector 1',
    created_at: '2022-01-01T10:00:00',
    _id: 'id',
    object: 'vector_store',
  },
  {
    name: 'vector 1 vector 1',
    created_at: '2022-01-01T10:00:00',
    _id: 'id',
    object: 'vector_store',
  },
  {
    name: 'vector 1 vector 1',
    created_at: '2022-01-01T10:00:00',
    _id: 'id',
    object: 'vector_store',
  },
  {
    name: 'vector 1 vector 1',
    created_at: '2022-01-01T10:00:00',
    _id: 'id',
    object: 'vector_store',
  },
  {
    name: 'vector 1 vector 1',
    created_at: '2022-01-01T10:00:00',
    _id: 'id',
    object: 'vector_store',
  },
  {
    name: 'vector 1 vector 1',
    created_at: '2022-01-01T10:00:00',
    _id: 'id',
    object: 'vector_store',
  },
  {
    name: 'vector 1 vector 1',
    created_at: '2022-01-01T10:00:00',
    _id: 'id',
    object: 'vector_store',
  },
  {
    name: 'vector 1 vector 1',
    created_at: '2022-01-01T10:00:00',
    _id: 'id',
    object: 'vector_store',
  },
  {
    name: 'vector 1 vector 1',
    created_at: '2022-01-01T10:00:00',
    _id: 'id',
    object: 'vector_store',
  },
  {
    name: 'vector 1 vector 1',
    created_at: '2022-01-01T10:00:00',
    _id: 'id',
    object: 'vector_store',
  },
];

files.forEach((file) => {
  file['vectorsAttached'] = vectorStoresAttached;
});

const FileDashboardView = () => {
  return (
    <div className="flex h-screen flex-row divide-x bg-[#f9f9f9]">
      <div className="ml-8 mt-10 w-1/3">
        <VectorStoreSidePanel />
      </div>
      <div className="mr-2 mt-6 w-2/3">
        <div className="m-2 overflow-x-auto">
          <DataTableFile columns={fileTableColumns} data={files} />
          <div className="mt-5 sm:mt-4" />
        </div>
      </div>
    </div>
  );
};

export default FileDashboardView;
