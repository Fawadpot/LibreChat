import { useMemo, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { PermissionTypes, Permissions } from 'librechat-data-provider';
import AutoSendSwitch from '~/components/Prompts/Groups/AutoSendSwitch';
import DashBreadcrumb from '~/routes/Layouts/DashBreadcrumb';
import { usePromptGroupsNav, useHasAccess } from '~/hooks';
import GroupSidePanel from './Groups/GroupSidePanel';
import { cn } from '~/utils';

export default function PromptsView() {
  const params = useParams();
  const navigate = useNavigate();
  const groupsNav = usePromptGroupsNav();
  const isDetailView = useMemo(() => !!(params.promptId || params['*'] === 'new'), [params]);
  const hasAccess = useHasAccess({
    permissionType: PermissionTypes.PROMPTS,
    permission: Permissions.USE,
  });

  useEffect(() => {
    if (!hasAccess) {
      navigate('/c/new');
    }
  }, [hasAccess, navigate]);

  if (!hasAccess) {
    return null;
  }

  return (
    <div className="flex h-screen w-full flex-col bg-[#f9f9f9] p-0 dark:bg-transparent lg:p-2">
      <DashBreadcrumb />
      <div className="flex w-full flex-grow flex-row divide-x overflow-hidden dark:divide-gray-600">
        <GroupSidePanel isDetailView={isDetailView} {...groupsNav}>
          <AutoSendSwitch className="px-2 pt-2 dark:text-white" />
        </GroupSidePanel>
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
