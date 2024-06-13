import { useState, useMemo } from 'react';
import { ListFilter, MessageSquareQuote } from 'lucide-react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { usePromptGroupsInfiniteQuery } from '~/data-provider';
import { Button, Input } from '~/components/ui';
import PromptSidePanel from './PromptSidePanel';
import { cn } from '~/utils';

export default function PromptsView() {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [pageSize, _setPageSize] = useState(10);
  const [pageNumber, _setPageNumber] = useState(1);

  const groupsQuery = usePromptGroupsInfiniteQuery({
    pageSize,
    pageNumber: pageNumber + '',
    name,
  });

  const promptGroups = useMemo(() => {
    return groupsQuery?.data?.pages.flatMap((page) => page.promptGroups) || [];
  }, [groupsQuery.data]);

  const fetchNextPage = () => {
    if (groupsQuery.hasNextPage) {
      groupsQuery.fetchNextPage();
    }
  };

  const isDetailView = params.promptId || params['*'] === 'new';

  return (
    <div className="flex h-screen w-full flex-col bg-[#f9f9f9] p-0 lg:p-7">
      <div className="flex w-full flex-row justify-between p-2">
        {isDetailView && (
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
      <div className="flex w-full flex-grow flex-row divide-x overflow-hidden">
        <div
          className={cn(
            'mr-2 flex w-full flex-col overflow-y-auto lg:w-1/4 xl:w-1/4 ',
            isDetailView ? 'hidden lg:block' : 'md:w-full',
          )}
        >
          <h1 className="m-3 flex items-center gap-x-2 text-center text-xl lg:text-left">
            <MessageSquareQuote className="h-5 w-5 text-gray-500" />
            <strong>Prompts</strong>
          </h1>
          <div className="flex w-full flex-row justify-between">
            <div className="mx-4 flex w-2/3 flex-row justify-start gap-x-2 pr-2">
              <Button variant="ghost" className="m-0 mr-2 p-0">
                <ListFilter className="h-4 w-4" />
              </Button>
              <Input
                placeholder={'Filter prompts...'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="max-w-sm dark:border-gray-500"
              />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto">
            {!groupsQuery.isLoading && <PromptSidePanel prompts={promptGroups} />}
          </div>
          <div className="m-2 flex justify-end gap-2">
            <Button
              variant={'outline'}
              onClick={() => groupsQuery.fetchPreviousPage()}
              disabled={!groupsQuery.hasPreviousPage}
            >
              Prev
            </Button>
            <Button
              variant={'outline'}
              onClick={() => fetchNextPage()}
              disabled={!groupsQuery.hasNextPage || groupsQuery.isFetchingNextPage}
            >
              {groupsQuery.isFetchingNextPage ? 'Loading more...' : 'Next'}
            </Button>
          </div>
        </div>
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
