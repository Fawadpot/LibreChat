import React from 'react';
import FileSidePanel from './FileList/FileSidePanel';
import FilePreview from './FileList/FilePreview';
import { TFile } from 'librechat-data-provider/dist/types';
import { TThread, TVectorStore } from '~/common';

const file: TFile = {
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
};

const threads: TThread[] = [
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
];

const vectorStoresAttached: TVectorStore[] = [
  { name: 'vector 1', created_at: '2022-01-01T10:00:00', _id: 'id', object: 'vector_store' },
  { name: 'vector 1', created_at: '2022-01-01T10:00:00', _id: 'id', object: 'vector_store' },
  { name: 'vector 1', created_at: '2022-01-01T10:00:00', _id: 'id', object: 'vector_store' },
];

export default function FilesListView() {
  return (
    <div className="flex w-full flex-row divide-x bg-[#f9f9f9] p-7">
      <div className="w-1/3">
        <FileSidePanel />
      </div>
      <div className="w-2/3">
        <FilePreview
          file={file}
          threads={threads}
          vectorStoresAttached={vectorStoresAttached}
          removeFromVectorStore={() => {
            console.log('Remove from vector store');
          }}
          removeFromThread={() => {
            console.log('Remove from thread');
          }}
        />
      </div>
    </div>
  );
}
