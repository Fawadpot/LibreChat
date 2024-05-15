import React from 'react';
import FileListItem from './FileListItem';

type File = {
  name: string;
  description: string;
  size: number;
  filesCount: number;
  createdAt: string;
  id: string;
};

type FileListProps = {
  files: File[];
  deleteFile: (id: string) => void;
};

const FileList: React.FC<FileListProps> = ({ files, deleteFile }) => {
  return (
    <div>
      {files.map((file) => (
        <FileListItem key={file.id} file={file} deleteFile={deleteFile} />
      ))}
    </div>
  );
};

export default FileList;
