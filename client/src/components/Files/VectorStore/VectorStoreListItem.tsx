import React from 'react';
import { TrashIcon } from '~/components/svg';

type VectorStore = {
  name: string;
  description: string;
  size: number;
  filesCount: number;
  createdAt: string;
  id: string;
};

type VectorStoreListItemProps = {
  vectorStore: VectorStore;
  deleteVectorStore: (id: string) => void;
};

const VectorStoreListItem: React.FC<VectorStoreListItemProps> = ({
  vectorStore,
  deleteVectorStore,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <strong>{vectorStore.name}</strong>
        <p className="text-gray-500">{vectorStore.description}</p>
      </div>
      <div>
        <p>
          {vectorStore.filesCount} Files ({vectorStore.size}MB)
        </p>
        <p>{vectorStore.createdAt}</p>
      </div>
      <div>
        <button className="text-gray-500">...</button>
        <button onClick={() => deleteVectorStore(vectorStore.id)}>
          <TrashIcon className="text-grey-100 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default VectorStoreListItem;
