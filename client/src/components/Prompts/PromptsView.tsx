import { useState, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ListFilter } from 'lucide-react';
import { usePromptGroupsInfiniteQuery } from '~/data-provider';
import { Button, Input } from '~/components/ui';
import PromptSidePanel from './PromptSidePanel';

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
    isActive: true,
  });

  const promptGroups = useMemo(() => {
    return groupsQuery?.data?.pages.flatMap((page) => page.promptGroups) || [];
  }, [groupsQuery.data]);

  const fetchNextPage = () => {
    if (groupsQuery.hasNextPage) {
      groupsQuery.fetchNextPage();
    }
  };

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
          <h2 className="m-3 text-center text-lg lg:text-left">
            <strong>Prompts</strong>
          </h2>
          <div className="flex w-full flex-row justify-between">
            <div className="flex w-2/3 flex-row justify-start gap-x-2 pr-2">
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
            <div className="w-fit">
              <Button variant="default" className="m-0 mr-2 px-4">
                Upload CSV
              </Button>
            </div>
          </div>
          {groupsQuery.isLoading ? null : <PromptSidePanel prompts={promptGroups} />}
          <div className="mx-2 mt-2 flex justify-between">
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
          className={`h-[90vh] w-full overflow-y-auto xl:w-2/3 ${
            params.promptId || params['*'] === 'new' ? 'lg:w-3/5' : 'hidden md:w-3/5 lg:block'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
