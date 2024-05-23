import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import {
  Login,
  Registration,
  RequestPasswordReset,
  ResetPassword,
  ApiErrorWatcher,
} from '~/components/Auth';
import { AuthContextProvider } from '~/hooks/AuthContext';
import ShareRoute from './ShareRoute';
import ChatRoute from './ChatRoute';
import Search from './Search';
import Root from './Root';
import FileDashboardView from '~/components/Files/FileDashboardView';
import FilesListView from '~/components/Files/FilesListView';
import VectorStoreView from '~/components/Files/VectorStoreView';
import FilePreview from '~/components/Files/FileList/FilePreview';
import EmptyFilePreview from '~/components/Files/FileList/EmptyFilePreview';
import EmptyVectorStorePreview from '~/components/Files/VectorStore/EmptyVectorStorePreview';
import VectorStorePreview from '~/components/Files/VectorStore/VectorStorePreview';

const AuthLayout = () => (
  <AuthContextProvider>
    <Outlet />
    <ApiErrorWatcher />
  </AuthContextProvider>
);

export const router = createBrowserRouter([
  {
    path: 'register',
    element: <Registration />,
  },
  {
    path: 'forgot-password',
    element: <RequestPasswordReset />,
  },
  {
    path: 'reset-password',
    element: <ResetPassword />,
  },
  {
    path: 'share/:shareId',
    element: <ShareRoute />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'file-dashboard',
        element: <FileDashboardView />,
      },
      {
        path: 'files/*',
        element: <FilesListView />,
        children: [
          {
            index: true,
            element: <EmptyFilePreview />,
          },
          {
            path: ':fileId',
            element: <FilePreview />,
          },
        ],
      },
      {
        path: 'vector-stores/*',
        element: <VectorStoreView />,
        children: [
          {
            index: true,
            element: <EmptyVectorStorePreview />,
          },
          {
            path: ':vectorStoreId',
            element: <VectorStorePreview />,
          },
        ],
      },
      {
        path: '/',
        element: <Root />,
        children: [
          {
            index: true,
            element: <Navigate to="/c/new" replace={true} />,
          },
          {
            path: 'c/:conversationId?',
            element: <ChatRoute />,
          },
          {
            path: 'search',
            element: <Search />,
          },
        ],
      },
    ],
  },
]);
