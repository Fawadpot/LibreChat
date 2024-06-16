import { useState } from 'react';
import { Menu as MenuIcon, Edit as EditIcon } from 'lucide-react';
import type { TPromptGroup } from 'librechat-data-provider';
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui';
import VariableDialog from '~/components/Prompts/Groups/VariableDialog';
import { useLocalize, useSubmitMessage, useCustomLink } from '~/hooks';
import ListCard from '~/components/Prompts/Groups/ListCard';
import { getSnippet, detectVariables } from '~/utils';

export default function ChatGroupItem({ group }: { group: TPromptGroup }) {
  const localize = useLocalize();
  const { submitPrompt } = useSubmitMessage();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const onEditClick = useCustomLink<HTMLDivElement>(`/d/prompts/${group._id}`);

  const onCardClick = () => {
    const text = group.productionPrompt?.prompt ?? '';
    if (!text) {
      return;
    }
    const hasVariables = detectVariables(text);
    if (hasVariables) {
      return setDialogOpen(true);
    }

    submitPrompt(text);
  };

  return (
    <>
      <ListCard
        name={group.name}
        category={group.category ?? ''}
        onClick={onCardClick}
        snippet={
          group.oneliner ? group.oneliner : getSnippet(group?.productionPrompt?.prompt ?? '', 40)
        }
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-7 w-7 p-0 transition-all duration-300 ease-in-out hover:border-white dark:bg-gray-800 dark:hover:border-gray-400 dark:focus:border-gray-500"
            >
              <MenuIcon className="icon-md dark:text-gray-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-36 rounded-lg" collisionPadding={2} align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer rounded-lg dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                onClick={onEditClick}
              >
                <EditIcon className="mr-2 h-4 w-4" />
                <span>{localize('com_ui_edit')}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ListCard>
      <VariableDialog open={isDialogOpen} onClose={() => setDialogOpen(false)} group={group} />
    </>
  );
}
