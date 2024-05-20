import React from 'react';
import VectorStoreList from './VectorStoreList';
import { TVectorStore } from '~/common';
import VectorStoreButton from './VectorStoreButton';
import { Input } from '~/components/ui';
import FilesSectionSelector from '../FilesSectionSelector';
import ActionButton from '../ActionButton';
import DeleteIconButton from '../DeleteIconButton';

const fakeVectorStores: TVectorStore[] = [
  {
    name: 'VectorStore 1',
    bytes: 10000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '1',
  },
  {
    name: 'VectorStore 2',
    bytes: 10000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '2',
  },
  {
    name: 'VectorStore 3',
    bytes: 10000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '3',
  },
  {
    name: 'VectorStore 4',
    bytes: 10000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '4',
  },
  {
    name: 'VectorStore 5',
    bytes: 10000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '5',
  },
  {
    name: 'VectorStore 6',
    bytes: 2000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '6',
  },
  {
    name: 'VectorStore 6',
    bytes: 2000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '6',
  },
  {
    name: 'VectorStore 6',
    bytes: 2000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '6',
  },
  {
    name: 'VectorStore 6',
    bytes: 2000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '6',
  },
  {
    name: 'VectorStore 6',
    bytes: 2000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '6',
  },
  {
    name: 'VectorStore 6',
    bytes: 2000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '6',
  },
  {
    name: 'VectorStore 6',
    bytes: 2000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '6',
  },
  {
    name: 'VectorStore 6',
    bytes: 2000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '6',
  },
  {
    name: 'VectorStore 6',
    bytes: 2000,
    file_counts: {
      total: 10,
      in_progress: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
    },
    created_at: '2022-01-01T10:00:00',
    object: 'vector_store',
    _id: '6',
  },
];

export default function VectorStoreSidePanel() {
  const deleteVectorStore = (id: string | undefined) => {
    // Define delete functionality here
    console.log(`Deleting VectorStore with id: ${id}`);
  };

  return (
    <div className="ml-3 flex flex-col">
      <div className="h-[10vh]">
        <h2 className="text-lg">
          <strong>Vector Stores</strong>
        </h2>
        <div className="flex flex-row justify-between p-2">
          <div className="w-1/3">
            <Input type="text" placeholder="Filter by title, content..." />
          </div>
          <div className="w-1/3">
            <VectorStoreButton
              onClick={() => {
                console.log('Add Vector Store');
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-[90vh] w-full overflow-y-auto">
        <VectorStoreList vectorStores={fakeVectorStores} deleteVectorStore={deleteVectorStore} />
      </div>
    </div>
  );
}
