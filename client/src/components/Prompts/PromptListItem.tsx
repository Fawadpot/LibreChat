import React from 'react';
import { Button, Checkbox } from '../ui';
import { DotsIcon, NewTrashIcon } from '../svg';
import { useNavigate } from 'react-router-dom';

export default function PromptListItem({ prompt }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-100 my-3 mr-2 flex cursor-pointer flex-row rounded-md border border-0 bg-white p-4 transition duration-300 ease-in-out hover:bg-slate-200"
      onClick={() => {
        navigate(`/d/prompts/${prompt._id}`, { replace: true });
      }}
    >
      <div className="flex w-1/2 flex-row items-center justify-around">
        <Checkbox />
        <strong>{prompt.name}</strong>
      </div>
      <div className="mr-0 flex w-1/2 flex-row items-center justify-end sm:mr-4">
        <Button className="w-min content-center bg-transparent text-gray-500 hover:bg-slate-200">
          <DotsIcon className="text-grey-100" />
        </Button>
        <Button
          className="w-min bg-transparent text-[#666666] hover:bg-slate-200"
          onClick={() => console.log('clicked')}
        >
          <NewTrashIcon className="m-0 p-0" />
        </Button>
      </div>
    </div>
  );
}
