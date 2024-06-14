import { useNavigate } from 'react-router-dom';
import type { TPromptGroup } from 'librechat-data-provider';
import DashGroupItem from '~/components/Prompts/Groups/DashGroupItem';
import ChatGroupItem from '~/components/Prompts/Groups/ChatGroupItem';
import { Button } from '~/components/ui';

export default function List({
  groups,
  isChatRoute,
}: {
  groups?: TPromptGroup[];
  isChatRoute?: boolean;
}) {
  const navigate = useNavigate();
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
