import React from 'react';
import VectorStoreSidePanel from './VectorStore/VectorStoreSidePanel';
import FilesSectionSelector from './FilesSectionSelector';
import { Button } from '../ui';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export default function VectorStoreView() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="bg-[#f9f9f9] p-0 lg:p-7">
      <div className="flex w-full flex-row justify-between">
        <FilesSectionSelector />
        <Button
          className="block lg:hidden"
          variant={'outline'}
          size={'sm'}
          onClick={() => {
            navigate('/vector-stores');
          }}
        >
          Go back
        </Button>
      </div>
      <div className="mt-2 flex flex-row divide-x">
        <div className={`w-full lg:w-1/3 ${params.vectorStoreId ? 'hidden lg:block' : ''}`}>
          <VectorStoreSidePanel />
        </div>
        <div className={`w-full lg:w-2/3 ${params.vectorStoreId ? '' : 'hidden lg:block'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
