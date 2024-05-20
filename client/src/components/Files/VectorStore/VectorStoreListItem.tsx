import React from 'react';
import { TVectorStore } from '~/common';
import { DotsIcon, NewTrashIcon, TrashIcon } from '~/components/svg';
import { Button } from '~/components/ui';

type VectorStoreListItemProps = {
  vectorStore: TVectorStore;
  deleteVectorStore: (id: string) => void;
};

export default function VectorStoreListItem({
  vectorStore,
  deleteVectorStore,
}: VectorStoreListItemProps) {
  return (
    <div className="w-100 mx-5 my-3 flex cursor-pointer flex-row rounded-md border border-0 bg-white p-4 transition duration-300 ease-in-out hover:bg-slate-200">
      <div className="flex w-1/2 flex-col justify-around align-middle">
        <strong>{vectorStore.name}</strong>
        <p className="text-sm text-gray-500">{vectorStore.object}</p>
      </div>
      <div className="w-2/6 text-gray-500">
        <p>
          {vectorStore.file_counts.total} Files ({vectorStore.bytes / 1000}KB)
        </p>
        <p className="text-sm">{vectorStore.created_at.toString()}</p>
      </div>
      <div className="flex w-1/6 justify-around">
        <Button className="w-min content-center bg-transparent text-gray-500 hover:bg-slate-200">
          <DotsIcon className="text-grey-100 m-0 size-5 p-0" />
        </Button>
        <Button
          className="my-0 ml-3 bg-transparent p-0 text-[#666666] hover:bg-slate-200"
          onClick={() => deleteVectorStore(vectorStore._id)}
        >
          <NewTrashIcon className="m-0 p-0" />
        </Button>
      </div>
    </div>
  );
}
