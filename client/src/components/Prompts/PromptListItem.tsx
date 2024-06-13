import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TPromptGroup } from 'librechat-data-provider/dist/types';
import { useDeletePromptGroup, useUpdatePromptGroup } from '~/data-provider';
import DropDownMenu from '~/components/Conversations/DropDownMenu';
import HoverToggle from '~/components/Conversations/HoverToggle';
import { RenameButton } from '~/components/Conversations';
import { NewTrashIcon } from '~/components/svg';
import { Button, Input } from '~/components/ui';

export default function PromptListItem({ prompt }: { prompt: TPromptGroup }) {
  const navigate = useNavigate();
  const updateGroup = useUpdatePromptGroup();
  const [nameEditFlag, setNameEditFlag] = useState(false);
  const [popoverActive, setPopoverActive] = useState(false);
  const [nameInputField, setNameInputField] = useState(prompt.name);
  const deletePromptGroupMutation = useDeletePromptGroup({
    onSuccess: (response, variables) => {
      if (variables.id === prompt._id) {
        navigate('/d/prompts');
      }
    },
  });

  return (
    <div
      className="w-100 mx-2 my-3 flex cursor-pointer flex-row rounded-md border-0 bg-white p-4 transition duration-300 ease-in-out hover:bg-gray-100"
      onClick={() => {
        navigate(`/d/prompts/${prompt._id}`, { replace: true });
      }}
    >
      <div className="flex w-1/2 flex-row items-center justify-start">
        {/* <Checkbox /> */}

        {nameEditFlag ? (
          <div className="flex">
            <Input
              defaultValue={nameInputField}
              className="w-3/5"
              onChange={(e) => {
                setNameInputField(e.target.value);
              }}
            />
            <Button
              className="w-min bg-transparent text-[#666666] hover:bg-gray-200"
              onClick={() => {
                updateGroup.mutate({ payload: { name: nameInputField }, id: prompt?._id || '' });
                setNameEditFlag(false);
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <strong>{prompt.name}</strong>
        )}
      </div>
      <div className="flex w-1/2 flex-row items-center justify-end gap-1">
        <HoverToggle
          isActiveConvo={true}
          isPopoverActive={popoverActive}
          setIsPopoverActive={setPopoverActive}
          className="z-10 h-8 w-8 px-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DropDownMenu>
            <RenameButton
              renaming={false}
              renameHandler={() => {
                setNameEditFlag(true);
              }}
              appendLabel={true}
              className="mb-[3.5px]"
            />
          </DropDownMenu>
        </HoverToggle>
        <Button
          className="z-1 h-8 w-8 bg-transparent p-2 text-[#666666] hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            deletePromptGroupMutation.mutate({ id: prompt?._id || '' });
          }}
        >
          <NewTrashIcon />
        </Button>
      </div>
    </div>
  );
}
