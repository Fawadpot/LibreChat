import React from 'react';
import VectorStoreListItem from './VectorStoreListItem';

type VectorStore = {
  name: string;
  description: string;
  size: number;
  filesCount: number;
  createdAt: string;
  id: string;
};

type VectorStoreListProps = {
  vectorStores: VectorStore[];
  deleteVectorStore: (id: string) => void;
};

const VectorStoreList: React.FC<VectorStoreListProps> = ({ vectorStores, deleteVectorStore }) => {
  return (
    <div>
      {vectorStores.map((vectorStore, index) => (
        <VectorStoreListItem
          key={index}
          vectorStore={vectorStore}
          deleteVectorStore={deleteVectorStore}
        />
      ))}
    </div>
  );
};

export default VectorStoreList;
