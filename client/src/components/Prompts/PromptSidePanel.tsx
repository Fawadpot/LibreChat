import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TPromptGroup } from 'librechat-data-provider/dist/types';
import { Button } from '~/components/ui';
import PromptsList from './PromptsList';

export default function PromptSidePanel({ prompts }: { prompts?: TPromptGroup[] }) {
  const navigate = useNavigate();

  return (
    <div className="w-30">
      <div className="my-2 flex w-full flex-row gap-x-2">
        {/* <div className="flex w-1/3 flex-row">
          <Button variant="default" className="m-0 mr-2 w-full p-0">
            Actions
          </Button>
        </div> */}
      </div>
      <div className="flex w-full justify-end">
        <Button
          variant="outline"
          className="m-0 mr-2 w-full px-3"
          onClick={() => navigate('/d/prompts/new')}
        >
          + Add new Prompt
        </Button>
      </div>
      <div className="mt-3">
        <PromptsList prompts={prompts} />
      </div>
    </div>
  );
}
