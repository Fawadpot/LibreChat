import React from 'react';

type File = {
  id: string;
  name: string;
  status: string;
  size: number;
  purpose: string;
  createdAt: string;
  vectorStoresAttached: { name: string; createdAt: string }[];
  threads: { id: string; createdAt: string }[];
};

type Props = {
  file: File;
  removeFromVectorStore: () => void;
  removeFromThread: () => void;
};

const FilePreview: React.FC<Props> = ({
  file: { id, name, status, size, purpose, createdAt, vectorStoresAttached, threads },
  removeFromVectorStore,
  removeFromThread,
}: Props) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <b>{name}</b>
        <button>Delete</button>
        <button>Add To Vector Store</button>
      </div>

      <div>
        <div>
          <span>File ID</span>
          <span style={{ marginLeft: 'auto' }}>{id}</span>
        </div>
        <div>
          <span>Status</span>
          <span style={{ marginLeft: 'auto' }}>{status}</span>
        </div>
        <div>
          <span>Purpose</span>
          <span style={{ marginLeft: 'auto' }}>{purpose}</span>
        </div>
        <div>
          <span>Size</span>
          <span style={{ marginLeft: 'auto' }}>{size}</span>
        </div>
        <div>
          <span>Created At</span>
          <span style={{ marginLeft: 'auto' }}>{createdAt}</span>
        </div>
      </div>

      <div>
        <div>
          <b>Attached To</b>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Vector Stores</div>
            <div>Uploaded</div>
          </div>
          {vectorStoresAttached.map((file, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{file.name}</div>
              <div>{file.createdAt}</div>
              <button onClick={removeFromVectorStore}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div>
          <b>Used By</b>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Threads</div>
            <div>Uploaded</div>
          </div>
          {threads.map((thread, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>ID: {thread.id}</div>
              <div>{thread.createdAt}</div>
              <button onClick={removeFromThread}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
