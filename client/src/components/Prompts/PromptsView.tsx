import { useMemo } from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import PromptSidePanel from './Groups/GroupsSidePanel';
import { Button } from '~/components/ui';
import { cn } from '~/utils';

export default function PromptsView() {
  const params = useParams();
  const navigate = useNavigate();
  const isDetailView = useMemo(() => !!(params.promptId || params['*'] === 'new'), [params]);

  return (
    <div className="flex h-screen w-full flex-col bg-[#f9f9f9] p-0 lg:p-7">
      <div className="flex w-full flex-row justify-between p-2">
        {isDetailView && (
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
        )}
      </div>
      <div className="flex w-full flex-grow flex-row divide-x overflow-hidden">
        <PromptSidePanel isDetailView={isDetailView} showHeader={true} />
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
