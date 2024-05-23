import { TFile } from 'librechat-data-provider/dist/types';
import React, { useState } from 'react';
import { TThread, TVectorStore } from '~/common';
import { CheckMark, NewTrashIcon } from '~/components/svg';
import { Button } from '~/components/ui';
import DeleteIconButton from '../DeleteIconButton';
import VectorStoreButton from '../VectorStore/VectorStoreButton';
import { CircleIcon, Clock3Icon, InfoIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

const tempFile: TFile = {
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

const tempThreads: TThread[] = [
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
  { id: 'thead_id', createdAt: '2022-01-01T10:00:00' },
];

const tempVectorStoresAttached: TVectorStore[] = [
  { name: 'vector 1', created_at: '2022-01-01T10:00:00', _id: 'id', object: 'vector_store' },
  { name: 'vector 1', created_at: '2022-01-01T10:00:00', _id: 'id', object: 'vector_store' },
  { name: 'vector 1', created_at: '2022-01-01T10:00:00', _id: 'id', object: 'vector_store' },
];

export default function FilePreview() {
  const [file, setFile] = useState(tempFile);
  const [threads, setThreads] = useState(tempThreads);
  const [vectorStoresAttached, setVectorStoresAttached] = useState(tempVectorStoresAttached);
  const params = useParams();

  return (
    <div className="m-3 bg-white p-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <b>FILE</b>
          <b className="text-2xl">{file.filename}</b>
        </div>
        <div className="flex flex-row">
          <div>
            <DeleteIconButton
              onClick={() => {
                console.log('click');
              }}
            />
          </div>
          <div className="ml-3">
            <VectorStoreButton
              onClick={() => {
                console.log('click');
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col">
        <div className="flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <InfoIcon className="size-4 text-gray-500" />
            &nbsp; File ID
          </span>
          <span className="w-4/5 text-gray-500">{file._id}</span>
        </div>
        <div className="mt-3 flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <CircleIcon className="m-0 size-4 p-0 text-gray-500" />
            &nbsp; Status
          </span>
          <div className="w-4/5">
            <span className="flex w-20 flex-row items-center justify-evenly rounded-full bg-[#f2f8ec] p-1 text-[#91c561]">
              <CheckMark className="m-0 p-0" />
              <div>{file.object}</div>
            </span>
          </div>
        </div>
        <div className="mt-3 flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <Clock3Icon className="m-0 size-4 p-0 text-gray-500" />
            &nbsp;Purpose
          </span>
          <span className="w-4/5 text-gray-500">{file.message}</span>
        </div>
        <div className="mt-3 flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <Clock3Icon className="m-0 size-4 p-0 text-gray-500" />
            &nbsp; Size
          </span>
          <span className="w-4/5 text-gray-500">{file.bytes}</span>
        </div>
        <div className="mt-3 flex flex-row">
          <span className="flex w-1/5 flex-row items-center">
            <Clock3Icon className="m-0 size-4 p-0 text-gray-500" />
            &nbsp; Created At
          </span>
          <span className="w-4/5 text-gray-500">{file.createdAt?.toString()}</span>
        </div>
      </div>

      <div className="mt-10 flex flex-col">
        <div>
          <b>Attached To</b>
        </div>
        <div className="flex flex-col divide-y">
          <div className="mt-2 flex flex-row">
            <div className="w-2/3">Vector Stores</div>
            <div className="w-1/3">Uploaded</div>
          </div>
          <div>
            {vectorStoresAttached.map((vectors, index) => (
              <div key={index} className="mt-2 flex flex-row">
                <div className="ml-4 w-2/3 content-center">{vectors.name}</div>
                <div className="flex w-1/3 flex-row">
                  <div className="content-center">{vectors.created_at.toString()}</div>
                  <Button
                    className="m-0 ml-3 h-full bg-transparent p-0 text-[#666666] hover:bg-slate-200"
                    onClick={() => {
                      console.log('Remove from vector store');
                    }}
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
        <div className="flex flex-col divide-y">
          <div className="flex flex-row">
            <div className="w-2/3">Threads</div>
            <div className="w-1/3">Uploaded</div>
          </div>
          <div>
            {threads.map((thread, index) => (
              <div key={index} className=" mt-2 flex flex-row">
                <div className="ml-4 w-2/3 content-center">ID: {thread.id}</div>
                <div className="flex w-1/3 flex-row">
                  <div className="content-center">{thread.createdAt}</div>
                  <Button
                    className="m-0 ml-3 h-full bg-transparent p-0 text-[#666666] hover:bg-slate-200"
                    onClick={() => {
                      console.log('Remove from thread');
                    }}
                  >
                    <NewTrashIcon className="m-0 p-0" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
