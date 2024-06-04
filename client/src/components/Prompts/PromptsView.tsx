import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui';
import PromptSidePanel from './PromptSidePanel';
import { usePromptsApi } from './PromptsApi';
import { TPromptGroup } from './PromptTypes';

export default function PromptsView() {
  const params = useParams();
  const navigate = useNavigate();
  const [resp, isLoading, error] = usePromptsApi<{ promptGroups: TPromptGroup[] }>(
    '/api/prompts/prompt-groups?pageSize=10&pageNumber=1',
    'GET',
  );

  return (
    <div className="w-full bg-[#f9f9f9] p-0 lg:p-7">
      <div className="flex w-full flex-row justify-between p-2">
        {params?.promptId && (
          <Button
            className="block lg:hidden"
            variant={'outline'}
            size={'sm'}
            onClick={() => {
              navigate('/d/prompts');
            }}
          >
            Go back
          </Button>
        )}
      </div>
      <div className="flex w-full flex-row divide-x">
        <div
          className={`mr-2 w-full xl:w-1/3 ${
            params.promptId ? 'hidden w-2/5 lg:block lg:w-2/5' : 'md:w-full'
          }`}
        >
          {isLoading ? 'Loading...' : <PromptSidePanel prompts={resp?.promptGroups || []} />}
        </div>
        <div
          className={`h-[85vh] w-full overflow-y-auto xl:w-2/3 ${
            params.promptId ? 'lg:w-3/5' : 'hidden md:w-3/5 lg:block'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
