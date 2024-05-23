import React from 'react';
import VectorStoreList from './VectorStoreList';
import { TVectorStore } from '~/common';
import VectorStoreButton from './VectorStoreButton';
import { Button, Input } from '~/components/ui';
import FilesSectionSelector from '../FilesSectionSelector';
import ActionButton from '../ActionButton';
import DeleteIconButton from '../DeleteIconButton';
import { ListFilter } from 'lucide-react';

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
    <div className="flex flex-col">
      <div className="m-4 flex h-[10vh] flex-col">
        <h2 className="text-lg">
          <strong>Vector Stores</strong>
        </h2>
        <div className="mr-3 mt-2 flex flex-row justify-between">
          <div className="flex w-full flex-row md:w-2/3 lg:w-1/3">
            <Button variant="ghost" className="m-0 mr-2 p-0">
              <ListFilter className="h-4 w-4" />
            </Button>
            <Input type="text" placeholder="Filter by title, content..." className="w-full" />
          </div>
          <div className="flex w-1/3 flex-row justify-end">
            <VectorStoreButton
              onClick={() => {
                console.log('Add Vector Store');
              }}
            />
          </div>
        </div>
      </div>
      <div className="mr-2 mt-2 h-[90vh] w-full overflow-y-auto">
        <VectorStoreList vectorStores={fakeVectorStores} deleteVectorStore={deleteVectorStore} />
      </div>
    </div>
  );
}
