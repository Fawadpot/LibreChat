import React from 'react';
import { Button, Input } from '../ui';
import { ListFilter } from 'lucide-react';
import PromptsList from './PromptsList';
import { useNavigate } from 'react-router-dom';
import { TPromptGroup } from './PromptTypes';

export default function PromptSidePanel({ prompts }: { prompts: TPromptGroup[] }) {
  const navigate = useNavigate();

  return (
    <div className="w-30">
      <h2 className="m-3 text-center text-lg lg:text-left">
        <strong>Prompts</strong>
      </h2>
      <div className="my-2 flex w-full flex-row gap-x-2">
        <div className="flex w-1/3 flex-row">
          <Button variant="default" className="m-0 mr-2 w-full p-0">
            Actions
          </Button>
        </div>
        <div className="flex w-2/3 flex-row justify-start gap-x-2 pr-2">
          <Button variant="ghost" className="m-0 mr-2 p-0">
            <ListFilter className="h-4 w-4" />
          </Button>
          <Input
            placeholder={'Filter prompts...'}
            value={''}
            onChange={() => {
              console.log('changed');
            }}
            className="max-w-sm dark:border-gray-500"
          />
        </div>
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
