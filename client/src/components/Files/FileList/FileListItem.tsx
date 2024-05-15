import React from 'react';
import { TrashIcon } from '~/components/svg';

type File = {
  name: string;
  description: string;
  size: number;
  createdAt: string;
  id: string;
};

type FileListItemProps = {
  file: File;
  deleteFile: (id: string) => void;
};

const FileListItem: React.FC<FileListItemProps> = ({ file, deleteFile }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <strong>{file.name}</strong>
        <p className="text-gray-500">{file.description}</p>
      </div>
      <div>
        <p>{file.size}MB</p>
        <p>{file.createdAt}</p>
      </div>
      <div>
        <button className="text-gray-500">...</button>
        <button onClick={() => deleteFile(file.id)}>
          <TrashIcon className="text-grey-100 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FileListItem;
