import type { TFile } from 'librechat-data-provider';
import React from 'react';
import FileListItem from './FileListItem';
import FileListItem2 from './FileListItem2';

type FileListProps = {
  files: TFile[];
  deleteFile: (id: string | undefined) => void;
  attachedVectorStores: { name: string }[];
};

export default function FileList({ files, deleteFile, attachedVectorStores }: FileListProps) {
  return (
    <div className=" h-screen overflow-y-auto py-2">
      {files.map((file) => (
        // <FileListItem key={file._id} file={file} deleteFile={deleteFile} width="100%" />
        <FileListItem2
          key={file._id}
          file={file}
          deleteFile={deleteFile}
          width="100%"
          attachedVectorStores={attachedVectorStores}
        />
      ))}
    </div>
  );
}
