import { useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import DashBreadcrumb from '~/routes/Layouts/DashBreadcrumb';
import GroupSidePanel from './Groups/GroupSidePanel';
import { usePromptGroupsNav } from '~/hooks';
import { cn } from '~/utils';

export default function PromptsView() {
  const params = useParams();
  const groupsNav = usePromptGroupsNav();
  const isDetailView = useMemo(() => !!(params.promptId || params['*'] === 'new'), [params]);

  return (
    <div className="flex h-screen w-full flex-col bg-[#f9f9f9] p-0 dark:bg-transparent lg:p-2">
      <DashBreadcrumb />
      <div className="flex w-full flex-grow flex-row divide-x overflow-hidden dark:divide-gray-600">
        <GroupSidePanel isDetailView={isDetailView} {...groupsNav} />
        <div
          className={cn(
            'w-full overflow-y-auto lg:w-3/4 xl:w-3/4',
            isDetailView ? 'block' : 'hidden md:block',
          )}
        >
          <Outlet context={groupsNav} />
        </div>
      </div>
    </div>
  );
}
