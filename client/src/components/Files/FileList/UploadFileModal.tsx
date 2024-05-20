import React, { useState, ChangeEvent } from 'react';
import AttachFile from '~/components/Chat/Input/Files/AttachFile';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input } from '~/components/ui';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

const UploadFileModal = ({ open, onOpenChange }) => {
  const localize = useLocalize();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn('w-1/3 overflow-x-auto shadow-2xl dark:bg-gray-700 dark:text-white')}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
            Upoad a File
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col p-0 sm:p-6 sm:pb-0 sm:pt-4">
          <div className="flex w-full flex-row">
            <div className="w-1/5">
              <img />
            </div>
            <div className="flex w-4/5 flex-col">
              <div className="italic">Please upload square file, size less than 100KB</div>
              <div className="mt-4 flex w-full flex-row items-center bg-[#f9f9f9] p-2">
                <div className="w-1/3">
                  <Button>Choose File</Button>
                </div>
                <div className="w-1/3"> No File Chosen</div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="name">Name</label>
            <label className="text-[#808080]">The name of the uploaded file</label>
            <Input type="text" id="name" name="name" placeholder="Name" />
          </div>

          <div className="mt-3 flex w-full flex-col">
            <label htmlFor="purpose">Purpose</label>
            <label className="text-[#808080]">The purpose of the uploaded file</label>
            <Input type="text" id="purpose" name="purpose" placeholder="Purpose" />
          </div>

          <div className="mt-3 flex w-full flex-row justify-between">
            <div className="w-1/3">
              <span className="font-bold">Learn about file purpose</span>
            </div>
            <div className="flex w-1/3 flex-row justify-evenly">
              <Button
                className="mr-3 w-full rounded-md border border-black bg-white p-0 text-black hover:bg-white"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="w-full rounded-md border border-black bg-black p-0 text-white"
                onClick={() => {
                  console.log('upload file');
                }}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFileModal;
