import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useGetPromptGroups } from '~/data-provider';
import { Button } from '../ui';
import PromptSidePanel from './PromptSidePanel';

export default function PromptsView() {
  const params = useParams();
  const navigate = useNavigate();

  const groups = useGetPromptGroups({ pageSize: 10, pageNumber: 1 });
  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    setGroupsList(groups?.data?.promptGroups || []);
  }, [groups?.data]);

  return (
    <div className="w-full bg-[#f9f9f9] p-0 lg:p-7">
      <div className="flex w-full flex-row justify-between p-2">
        {params?.promptId || params['*'] === 'new' ? (
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
        ) : null}
      </div>
      <div className="flex w-full flex-row divide-x">
        <div
          className={`mr-2 w-full xl:w-1/3 ${
            params.promptId || params['*'] === 'new'
              ? 'hidden w-2/5 lg:block lg:w-2/5'
              : 'md:w-full'
          }`}
        >
          {!groups?.data ? null : <PromptSidePanel prompts={groupsList} />}
        </div>
        <div
          className={`h-[85vh] w-full overflow-y-auto xl:w-2/3 ${
            params.promptId || params['*'] === 'new' ? 'lg:w-3/5' : 'hidden md:w-3/5 lg:block'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
