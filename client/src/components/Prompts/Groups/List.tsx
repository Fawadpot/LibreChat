import { useNavigate } from 'react-router-dom';
import { useGetStartupConfig } from 'librechat-data-provider/react-query';
import type { TPromptGroup, TStartupConfig } from 'librechat-data-provider';
import DashGroupItem from '~/components/Prompts/Groups/DashGroupItem';
import ChatGroupItem from '~/components/Prompts/Groups/ChatGroupItem';
import { Button } from '~/components/ui';
import { useLocalize } from '~/hooks';

export default function List({
  groups = [],
  isChatRoute,
}: {
  groups?: TPromptGroup[];
  isChatRoute?: boolean;
}) {
  const navigate = useNavigate();
  const localize = useLocalize();
  const { data: startupConfig = {} as Partial<TStartupConfig> } = useGetStartupConfig();
  const { instanceProjectId } = startupConfig;
  return (
    <div className="flex h-full flex-col">
      <div className="my-2 flex w-full flex-row gap-x-2" />
      <div className="flex w-full justify-end">
        <Button
          variant="outline"
          className="mx-2 w-full px-3"
          onClick={() => navigate('/d/prompts/new')}
        >
          + {localize('com_ui_create_var', localize('com_ui_prompt'))}
        </Button>
      </div>
      <div className="mt-3 flex-grow overflow-y-auto">
        <div className="overflow-y-auto">
          {groups?.map((group) => {
            if (isChatRoute) {
              return (
                <ChatGroupItem
                  key={group._id}
                  group={group}
                  instanceProjectId={instanceProjectId}
                />
              );
            }
            return (
              <DashGroupItem key={group._id} group={group} instanceProjectId={instanceProjectId} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
