import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import {
  Login,
  Registration,
  RequestPasswordReset,
  ResetPassword,
  ApiErrorWatcher,
} from '~/components/Auth';
import { AuthContextProvider } from '~/hooks/AuthContext';
import FileDashboardView from '~/components/Files/FileDashboardView';
import FilesListView from '~/components/Files/FilesListView';
import VectorStoreView from '~/components/Files/VectorStoreView';
import FilePreview from '~/components/Files/FileList/FilePreview';
import EmptyFilePreview from '~/components/Files/FileList/EmptyFilePreview';
import EmptyVectorStorePreview from '~/components/Files/VectorStore/EmptyVectorStorePreview';
import VectorStorePreview from '~/components/Files/VectorStore/VectorStorePreview';
import DataTableFilePreview from '~/components/Files/FileList/DataTableFilePreview';
import PromptsView from '~/components/Prompts/PromptsView';
import EmptyPromptPreview from '~/components/Prompts/EmptyPromptPreview';
import PromptPreview from '~/components/Prompts/PromptPreview';
import CreatePrompt from '~/components/Prompts/CreatePrompt';
import DashboardRoute from './DashboardRoute';
import Root from './Root';
import Search from './Search';
import ChatRoute from './ChatRoute';
import ShareRoute from './ShareRoute';
import LoginLayout from './Layouts/Login';
import StartupLayout from './Layouts/Startup';

const AuthLayout = () => (
  <AuthContextProvider>
    <Outlet />
    <ApiErrorWatcher />
  </AuthContextProvider>
);

export const router = createBrowserRouter([
  {
    path: 'share/:shareId',
    element: <ShareRoute />,
  },
  {
    path: '/',
    element: <StartupLayout />,
    children: [
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
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <LoginLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
        ],
      },
      {
        path: 'd/*',
        element: <DashboardRoute />,
        children: [
          {
            element: <FileDashboardView />,
            children: [
              {
                index: true,
                element: <EmptyVectorStorePreview />,
              },
              {
                path: ':vectorStoreId',
                element: <DataTableFilePreview />,
              },
            ],
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
            path: 'prompts/*',
            element: <PromptsView />,
            children: [
              {
                index: true,
                element: <EmptyPromptPreview />,
              },
              {
                path: 'new',
                element: <CreatePrompt />,
              },
              {
                path: ':promptId',
                element: <PromptPreview />,
              },
              //   {
              //     path: ':promptId/edit',
              //     element: <CreateEditPrompt />,
              //   },
            ],
          },
          {
            path: '*',
            element: <Navigate to="/d/files" replace={true} />,
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
