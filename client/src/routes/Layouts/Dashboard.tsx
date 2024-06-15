import { Outlet } from 'react-router-dom';
import { useAuthContext } from '~/hooks';

export default function DashboardRoute() {
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
