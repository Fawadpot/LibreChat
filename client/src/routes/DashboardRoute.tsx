import { Outlet } from 'react-router-dom';

export default function DashboardRoute() {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
}
