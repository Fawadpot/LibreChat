import { PlusIcon } from 'lucide-react';
import React from 'react';
import { Button } from '~/components/ui';

type UploadFileProps = {
  onClick: () => void;
};

export default function UploadFileButton({ onClick }: UploadFileProps) {
  return (
    <div className="w-40">
      <Button className="w-full bg-black p-0 text-white" onClick={onClick}>
        <PlusIcon className="h-4 w-4 font-bold" />
        &nbsp; Upload New File
      </Button>
    </div>
  );
}
