import React, { useState } from 'react';
import DeleteIconButton from '../DeleteIconButton';
import { Button } from '~/components/ui';
import { NewTrashIcon } from '~/components/svg';
import { TFile } from 'librechat-data-provider/dist/types';
import UploadFileButton from '../FileList/UploadFileButton';
import UploadFileModal from '../FileList/UploadFileModal';
import { BarChart4Icon, Clock3, FileClock, FileIcon, InfoIcon, PlusIcon } from 'lucide-react';

type VectorStorePreviewProps = {
  vectorStore;
  filesAttached: TFile[];
  assistants: { resource: string; id: string }[];
  removeFile: (id: string | undefined) => void;
  deleteVectorStore: () => void;
};

export default function VectorStorePreview({
  vectorStore,
  filesAttached,
  assistants,
  removeFile,
  deleteVectorStore,
}: VectorStorePreviewProps) {
  const [open, setOpen] = useState(false);
  const { _id, name, usageThisMonth, bytes, lastActive, expirationPolicy, expires, createdAt } =
    vectorStore;

  return (
    <div className="m-3 bg-white p-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <b>VECTOR STORE</b>
          <b className="text-2xl">{name}</b>
        </div>
        <div className="flex flex-row gap-x-3">
          <div>
            <DeleteIconButton
              onClick={() => {
                console.log('click');
              }}
            />
          </div>
          <div>
            <UploadFileButton
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col">
        <div className="flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <InfoIcon className="size-4 text-gray-500" />
            &nbsp; ID
          </span>
          <span className="w-4/5 text-gray-500">{_id}</span>
        </div>
        <div className="mt-3 flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <BarChart4Icon className="size-4 text-gray-500" />
            &nbsp;Usage this month
          </span>
          <div className="w-4/5">
            <p className="w-4/5 text-gray-500">
              <span className="text-[#91c561]">0 KB hours</span>
              &nbsp; Free until end of 2024
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <InfoIcon className="size-4 text-gray-500" />
            &nbsp;Size
          </span>
          <span className="w-4/5 text-gray-500">{bytes} bytes</span>
        </div>
        <div className="mt-3 flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <Clock3 className="size-4 text-gray-500" />
            &nbsp;Last active
          </span>
          <span className="w-4/5 text-gray-500">{lastActive}</span>
        </div>
        <div className="mt-3 flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <InfoIcon className="size-4 text-gray-500" />
            &nbsp;Expiration policy
          </span>
          <span className="w-4/5 text-gray-500">{expirationPolicy}</span>
        </div>
        <div className="mt-3 flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <FileClock className="size-4 text-gray-500" />
            &nbsp;Expires
          </span>
          <span className="w-4/5 text-gray-500">{expires}</span>
        </div>
        <div className="mt-3 flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <Clock3 className="size-4 text-gray-500" />
            &nbsp;Created At
          </span>
          <span className="w-4/5 text-gray-500">{createdAt?.toString()}</span>
        </div>
      </div>

      <div className="mt-10 flex flex-col">
        <div>
          <b>Files attached</b>
        </div>
        <div className="flex flex-col divide-y">
          <div className="mt-2 flex flex-row">
            <div className="w-2/3">File</div>
            <div className="w-1/3">Uploaded</div>
          </div>
          <div>
            {filesAttached.map((file, index) => (
              <div key={index} className="my-2 flex h-5 flex-row">
                <div className="flex w-2/3 flex-row content-center">
                  <FileIcon className="m-0 size-5 p-0" />
                  <div className="ml-2 content-center">{file.filename}</div>
                </div>
                <div className="flex w-1/3 flex-row">
                  <div className="content-center">{file.createdAt?.toString()}</div>
                  <Button
                    className="my-0 ml-3 h-min bg-transparent p-0 text-[#666666] hover:bg-slate-200"
                    onClick={() => removeFile(file._id)}
                  >
                    <NewTrashIcon className="m-0 p-0" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col">
        <div className="flex flex-row justify-between">
          <b>Used by</b>
          <Button variant={'default'}>
            <PlusIcon className="h-4 w-4 font-bold" />
            &nbsp; Create Assistant
          </Button>
        </div>
        <div className="flex flex-col divide-y">
          <div className="mt-2 flex flex-row">
            <div className="w-1/3">Resource</div>
            <div className="w-2/3">ID</div>
          </div>
          <div>
            {assistants.map((assistant, index) => (
              <div key={index} className="flex flex-row">
                <div className="w-1/3 content-center">{assistant.resource}</div>
                <div className="flex w-2/3 flex-row">
                  <div className="content-center">{assistant.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {open && <UploadFileModal open={open} onOpenChange={setOpen} />}
    </div>
  );
}
