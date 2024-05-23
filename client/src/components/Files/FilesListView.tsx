import React from 'react';
import FileSidePanel from './FileList/FileSidePanel';
import { Outlet } from 'react-router-dom';
import FilesSectionSelector from './FilesSectionSelector';

export default function FilesListView() {
  return (
    <div className="bg-[#f9f9f9] p-7">
      <div className="flex w-full flex-row justify-between">
        <FilesSectionSelector />
      </div>
      <div className="flex w-full flex-row divide-x">
        <div className="mr-2 w-2/5">
          <FileSidePanel />
        </div>
        <div className="h-[95vh] w-3/5 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
