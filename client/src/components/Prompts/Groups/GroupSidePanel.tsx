import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { ListFilter, MessageSquareQuote } from 'lucide-react';
import { MessageSquareQuote } from 'lucide-react';
import PanelNavigation from '~/components/Prompts/Groups/PanelNavigation';
import { useLocalize, useMediaQuery, usePromptGroupsNav } from '~/hooks';
import BackToChat from '~/components/Prompts/BackToChat';
import List from '~/components/Prompts/Groups/List';
// import { Button, Input } from '~/components/ui';
import { cn } from '~/utils';

export default function GroupSidePanel({
  isDetailView,
  showHeader,
  className = '',
}: {
  isDetailView?: boolean;
  showHeader?: boolean;
  className?: string;
}) {
  const { prevPage, nextPage, isFetching, hasNextPage, promptGroups, hasPreviousPage } =
    usePromptGroupsNav();
  const localize = useLocalize();
  const location = useLocation();
  const isChatRoute = useMemo(() => location.pathname.startsWith('/c/'), [location.pathname]);
  const isSmallerScreen = useMediaQuery('(max-width: 1024px)');

  return (
    <div
      className={cn(
        'mr-2 flex w-full min-w-72 flex-col overflow-y-auto md:w-full lg:w-1/4 xl:w-1/4',
        isDetailView && isSmallerScreen ? 'hidden' : '',
        className,
      )}
    >
      {showHeader && (
        <h1 className="m-3 flex items-center justify-between gap-x-2 text-center text-xl lg:text-left">
          <div className="flex items-center gap-x-2">
            <MessageSquareQuote className="h-5 w-5 text-gray-500" />
            <strong>{localize('com_ui_prompts')}</strong>
          </div>
          <BackToChat />
        </h1>
      )}
      <div className="flex w-full flex-row justify-between">
        {/* <div className="mx-4 flex w-2/3 flex-row justify-start gap-x-2 pr-2">
          <Button variant="ghost" className="m-0 mr-2 p-0">
            <ListFilter className="h-4 w-4" />
          </Button>
          <Input
            placeholder='Filter prompts...'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-sm dark:border-gray-500"
          />
        </div> */}
      </div>
      <div className="flex-grow overflow-y-auto">
        <List groups={promptGroups} isChatRoute={isChatRoute} />
      </div>
      <PanelNavigation
        nextPage={nextPage}
        prevPage={prevPage}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        isChatRoute={isChatRoute}
        hasPreviousPage={hasPreviousPage}
      />
    </div>
  );
}
