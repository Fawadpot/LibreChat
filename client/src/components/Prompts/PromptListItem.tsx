import React from 'react';
import { Button, Checkbox } from '../ui';
import { DotsIcon, NewTrashIcon } from '../svg';
import { useNavigate } from 'react-router-dom';
import { TPromptGroup } from 'librechat-data-provider/dist/types';
import { useDeletePromptGroup, useUpdatePromptGroup } from '~/data-provider';

export default function PromptListItem({ prompt }: { prompt: TPromptGroup }) {
  const navigate = useNavigate();
  const updateGroup = useUpdatePromptGroup();
  const deletePromptGroupMutation = useDeletePromptGroup({
    onSuccess: (response, variables) => {
      if(variables.id===prompt._id){
        navigate('/d/prompts');
      }
    }
  });
  return (
    <div
      className="w-100 my-3 mr-2 flex cursor-pointer flex-row rounded-md border border-0 bg-white p-4 transition duration-300 ease-in-out hover:bg-slate-200"
      onClick={() => {
        navigate(`/d/prompts/${prompt._id}`, { replace: true });
      }}
    >
      <div className="flex w-1/2 flex-row items-center justify-start">
        {/* <Checkbox /> */}
        <strong>{prompt.name}</strong>
      </div>
      <div className="mr-0 flex w-1/2 flex-row items-center justify-end sm:mr-4">
        <Button className="w-min content-center bg-transparent text-gray-500 hover:bg-slate-200">
          <DotsIcon className="text-grey-100" />
        </Button>
        <Button
          className="w-min bg-transparent text-[#666666] hover:bg-slate-200"
          onClick={() => deletePromptGroupMutation.mutate({id: prompt?._id || ''})}
        >
          <NewTrashIcon className="m-0 p-0" />
        </Button>
      </div>
    </div>
  );
}
