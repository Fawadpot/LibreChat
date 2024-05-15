import React from 'react';

const VectorStorePreview = ({ vectorStore, deleteFile, deleteVectorStore }) => {
  const {
    id,
    name,
    usageThisMonth,
    size,
    lastActive,
    expirationPolicy,
    expires,
    createdAt,
    filesAttached,
    assistants,
  } = vectorStore;

  return (
    <div className="vector-store-preview">
      <div className="row">
        <div className="left-align bold">{name}</div>
        <div className="right-align">
          <button onClick={deleteVectorStore}>Delete</button>
          <button>Add Files</button>
        </div>
      </div>

      <div className="row">
        <div className="left-align">ID</div>
        <div className="right-align">{id}</div>
      </div>

      <div className="row">
        <div className="left-align">Usage This Month</div>
        <div className="right-align">{usageThisMonth}</div>
      </div>
      <div className="row">
        <div className="left-align">Size</div>
        <div className="right-align">{size}</div>
      </div>
      <div className="row">
        <div className="left-align">Last active</div>
        <div className="right-align">{lastActive}</div>
      </div>
      <div className="row">
        <div className="left-align">Expiration policy</div>
        <div className="right-align">{expirationPolicy}</div>
      </div>
      <div className="row">
        <div className="left-align">Expires</div>
        <div className="right-align">{expires}</div>
      </div>
      <div className="row">
        <div className="left-align">Created At</div>
        <div className="right-align">{createdAt}</div>
      </div>

      <div className="section">
        <h3>Files Attached</h3>
        <div className="table-header">
          <div>File</div>
          <div>Uploaded</div>
        </div>
        {filesAttached.map((file) => (
          <div className="row" key={file.id}>
            <div>{file.name}</div>
            <div>{file.createdAt}</div>
            <button onClick={() => deleteFile(file.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>Used By</h3>
        <div className="table-header">
          <div>Resource</div>
          <div>ID</div>
        </div>
        {assistants.map((assistant) => (
          <div className="row" key={assistant.id}>
            <div>{assistant.resource}</div>
            <div>{assistant.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VectorStorePreview;
