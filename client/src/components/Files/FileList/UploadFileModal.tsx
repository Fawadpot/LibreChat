import React, { useState, ChangeEvent } from 'react';

const UploadFileModal = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="purpose">Purpose:</label>
      <input type="text" id="purpose" name="purpose" />

      <input type="file" onChange={handleFileChange} />

      <button>Upload</button>
      <button>Cancel</button>
    </div>
  );
};

export default UploadFileModal;
