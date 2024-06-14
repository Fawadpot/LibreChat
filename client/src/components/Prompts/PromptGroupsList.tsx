import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { TPromptGroup } from 'librechat-data-provider';
import DashGroupItem from './DashGroupItem';
import ChatGroupItem from './ChatGroupItem';
import { Button } from '~/components/ui';

export default function PromptGroupsList({ groups }: { groups?: TPromptGroup[] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isChatRoute = useMemo(() => location.pathname.startsWith('/c/'), [location.pathname]);

  return (
    <div className="flex h-full flex-col">
      <div className="my-2 flex w-full flex-row gap-x-2" />
      <div className="flex w-full justify-end">
        <Button
          variant="outline"
          className="mx-2 w-full px-3"
          onClick={() => navigate('/d/prompts/new')}
        >
          + Create Prompt
        </Button>
      </div>
      <div className="mt-3 flex-grow overflow-y-auto">
        <div className="h-[65vh] overflow-y-auto">
          {groups?.map((group) => {
            if (isChatRoute) {
              return <ChatGroupItem key={group._id} group={group} />;
            }
            return <DashGroupItem key={group._id} group={group} />;
          })}
        </div>
      </div>
    </div>
  );
}
