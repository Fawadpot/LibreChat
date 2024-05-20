import type { TFile } from 'librechat-data-provider';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import { DotsIcon, NewTrashIcon } from '~/components/svg';
import { Button } from '~/components/ui';

type FileListItemProps = {
  file: TFile;
  deleteFile: (id: string | undefined) => void;
  attachedVectorStores: { name: string }[];
};

export default function FileListItem2({
  file,
  deleteFile,
  attachedVectorStores,
}: FileListItemProps) {
  return (
    <div className="w-100 my-3 mr-2 flex h-fit cursor-pointer flex-row rounded-md border border-0 bg-white p-4 transition duration-300 ease-in-out hover:bg-slate-200">
      <div className="w-1/12 content-center">
        <strong>F</strong>
      </div>
      <div className="w-3/12 content-center">{file.filename}</div>
      <div className="flex w-6/12 flex-row flex-wrap text-gray-500">
        {attachedVectorStores.map((vectorStore, index) => {
          if (index === 4)
          {return (
            <span
              key={index}
              className="ml-2 mt-1 flex flex-row items-center rounded-full bg-[#f5f5f5] px-2"
            >
              <PlusIcon className="h-3 w-3" />
                &nbsp;
              {attachedVectorStores.length - index} more
            </span>
          );}
          if (index > 4) {return null;}
          return (
            <span key={index} className="ml-2 mt-1 rounded-full bg-[#f2f8ec] px-2 text-[#91c561]">
              {vectorStore.name}
            </span>
          );
        })}
      </div>
      <div className="flex w-2/12 flex-row items-center justify-evenly">
        <Button className="w-min content-center bg-transparent text-gray-500 hover:bg-slate-200">
          <DotsIcon className="text-grey-100 m-0 size-5 p-0" />
        </Button>
        <Button
          className="my-0 ml-3 w-min bg-transparent p-0 text-[#666666] hover:bg-slate-200"
          onClick={() => deleteFile(file._id)}
        >
          <NewTrashIcon className="m-0 p-0" />
        </Button>
      </div>
    </div>
  );
}
