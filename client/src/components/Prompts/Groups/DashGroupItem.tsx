import { useState, useRef } from 'react';
import { MenuIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import type { TPromptGroup } from 'librechat-data-provider';
import { useDeletePromptGroup, useUpdatePromptGroup } from '~/data-provider';
import {
  Input,
  Button,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui';
import CategoryIcon from '~/components/Prompts/Groups/CategoryIcon';
import { RenameButton } from '~/components/Conversations';
import { NewTrashIcon } from '~/components/svg';
import { cn, getSnippet } from '~/utils';
import { useLocalize } from '~/hooks';

export default function DashGroupItem({ group }: { group: TPromptGroup }) {
  const params = useParams();
  const navigate = useNavigate();
  const localize = useLocalize();

  const blurTimeoutRef = useRef<NodeJS.Timeout>();
  const [nameEditFlag, setNameEditFlag] = useState(false);
  const [nameInputField, setNameInputField] = useState(group.name);

  const updateGroup = useUpdatePromptGroup({
    onMutate: () => {
      clearTimeout(blurTimeoutRef.current);
      setNameEditFlag(false);
    },
  });
  const deletePromptGroupMutation = useDeletePromptGroup({
    onSuccess: (response, variables) => {
      if (variables.id === group._id) {
        navigate('/d/prompts');
      }
    },
  });

  const cancelRename = () => {
    setNameEditFlag(false);
  };

  const saveRename = () => {
    updateGroup.mutate({ payload: { name: nameInputField }, id: group?._id || '' });
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      cancelRename();
    }, 100);
  };

  return (
    <div
      className={cn(
        'w-100 mx-2 my-3 flex cursor-pointer flex-row rounded-md border-0 bg-white p-4 transition-all duration-300 ease-in-out hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800',
        params.promptId === group._id && 'bg-gray-100/50',
      )}
      onClick={() => {
        if (nameEditFlag) {
          return;
        }
        navigate(`/d/prompts/${group._id}`, { replace: true });
      }}
    >
      <div className="flex w-full flex-row items-center justify-start truncate">
        {/* <Checkbox /> */}
        <div className="relative flex w-full cursor-pointer flex-col gap-1 text-start align-top">
          {nameEditFlag ? (
            <>
              <div className="flex w-full gap-2">
                <Input
                  defaultValue={nameInputField}
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    setNameInputField(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      cancelRename();
                    } else if (e.key === 'Enter') {
                      saveRename();
                    }
                  }}
                  onBlur={handleBlur}
                />
                <Button
                  variant="subtle"
                  className="w-min bg-green-500 text-white hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    saveRename();
                  }}
                >
                  {localize('com_ui_save')}
                </Button>
              </div>
              <div className="break-word line-clamp-3 text-balance text-sm text-gray-600 dark:text-gray-400">
                {localize('com_ui_renaming_var', group.name)}
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full justify-between">
                <div className="flex flex-row gap-2">
                  <CategoryIcon category={group.category ?? ''} className="icon-md" />
                  <h3 className="break-word text-balance text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {group.name}
                  </h3>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="mr-1 h-7 w-7 p-0 hover:bg-gray-200 dark:bg-gray-800 dark:hover:border-gray-400 dark:focus:border-gray-500"
                      >
                        <MenuIcon className="icon-md dark:text-gray-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2 w-36 rounded-lg" collisionPadding={2}>
                      <DropdownMenuGroup>
                        <RenameButton
                          renaming={false}
                          renameHandler={(e) => {
                            e.stopPropagation();
                            setNameEditFlag(true);
                          }}
                          appendLabel={true}
                          className="m-0 w-full p-2"
                        />
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="destructive"
                    className="z-1 h-8 w-8 bg-transparent p-2 text-[#666666] hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePromptGroupMutation.mutate({ id: group?._id || '' });
                    }}
                  >
                    <NewTrashIcon />
                  </Button>
                </div>
              </div>
              <div className="break-word line-clamp-3 text-balance text-sm text-gray-600 dark:text-gray-400">
                {group.oneliner
                  ? group.oneliner
                  : getSnippet(group?.productionPrompt?.prompt ?? '', 40)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
