import { Outlet } from 'react-router-dom';
import { ThemeSelector } from '~/components/ui';
import { useAuthContext } from '~/hooks';

export default function DashboardRoute() {
  const { isAuthenticated } = useAuthContext();
  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="h-screen w-full">
      <Outlet />
      <div className="absolute bottom-0 left-0 md:m-4">
        <ThemeSelector />
      </div>
    </div>
  );
}
