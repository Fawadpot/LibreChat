import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useGetPromptGroups } from '~/data-provider';
import PromptSidePanel from './PromptSidePanel';
import { Button } from '../ui';

export default function PromptsView() {
  const params = useParams();
  const navigate = useNavigate();

  const groupsQuery = useGetPromptGroups({ pageSize: 10, pageNumber: 1 });
  // backend is not returning a data property: { data: [] }
  // The data property is added by useQuery (the base hook) along with other properties
  // like isLoading, isError, etc.

  if (groupsQuery.isLoading) {
    return <div>Loading...</div>;
  }

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
          {/* Typing issue, please fix */}
          {!groupsQuery?.data?.promptGroups ? null : <PromptSidePanel prompts={groupsQuery?.data?.promptGroups} />}
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
