import { useMemo } from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import BackToChat from '~/components/Prompts/BackToChat';
import GroupSidePanel from './Groups/GroupSidePanel';
import { Button } from '~/components/ui';
import { cn } from '~/utils';

export default function PromptsView() {
  const params = useParams();
  const navigate = useNavigate();
  const isDetailView = useMemo(() => !!(params.promptId || params['*'] === 'new'), [params]);

  return (
    <div className="flex h-screen w-full flex-col bg-[#f9f9f9] p-0 lg:p-2">
      {isDetailView && (
        <div className="flex w-full flex-row p-2 lg:hidden">
          <Button
            className="mx-2 flex gap-2 lg:hidden"
            variant={'outline'}
            size={'sm'}
            onClick={() => {
              navigate('/d/prompts');
            }}
          >
            <MessageSquareQuote className="h-5 w-5 text-gray-500" />
            Prompts
          </Button>
          <BackToChat className="h-9 lg:hidden" />
        </div>
      )}
      <div className="flex w-full flex-grow flex-row divide-x overflow-hidden">
        <GroupSidePanel isDetailView={isDetailView} showHeader={true} />
        <div
          className={cn(
            'w-full overflow-y-auto lg:w-3/4 xl:w-3/4',
            isDetailView ? 'block' : 'hidden md:block',
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
