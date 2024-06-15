import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { QueryKeys } from 'librechat-data-provider';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '~/hooks';
import store from '~/store';

export default function DashboardRoute() {
  const queryClient = useQueryClient();
  const clearConvoState = store.useClearConvoState();
  useEffect(() => {
    queryClient.removeQueries([QueryKeys.messages, 'new']);
    clearConvoState();
  }, [queryClient, clearConvoState]);
  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
}
