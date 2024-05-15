import React from 'react';
import VectorStoreList from './VectorStoreList';

const fakeVectorStores = [
  {
    name: 'VectorStore 1',
    description: 'Description 1',
    size: 10,
    filesCount: 5,
    createdAt: '2022-01-01T10:00:00',
    id: '1',
  },
  {
    name: 'VectorStore 2',
    description: 'Description 2',
    size: 15,
    filesCount: 8,
    createdAt: '2022-01-02T15:30:00',
    id: '2',
  },
  {
    name: 'VectorStore 3',
    description: 'Description 3',
    size: 20,
    filesCount: 12,
    createdAt: '2022-01-03T09:45:00',
    id: '3',
  },
];

const VectorStoreSidePanel: React.FC = () => {
  const deleteVectorStore = (id: string) => {
    // Define delete functionality here
    console.log(`Deleting VectorStore with id: ${id}`);
  };

  return (
    <div>
      <h2>Vector Stores</h2>
      <VectorStoreList vectorStores={fakeVectorStores} deleteVectorStore={deleteVectorStore} />
    </div>
  );
};

export default VectorStoreSidePanel;
