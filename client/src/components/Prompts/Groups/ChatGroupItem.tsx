import { useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, Edit as EditIcon } from 'lucide-react';
import { TPromptGroup } from 'librechat-data-provider/dist/types';
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui';
import ListCard from '~/components/Prompts/Groups/ListCard';
import { useLocalize } from '~/hooks';

export default function ChatGroupItem({ group }: { group: TPromptGroup }) {
  const localize = useLocalize();
  const navigate = useNavigate();

  return (
    <ListCard
      name={group.name}
      category={group.category ?? ''}
      snippet={group.oneliner ?? group.snippet ?? ''}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="h-7 w-7 p-0 dark:bg-gray-800">
            <MenuIcon className="icon-md dark:text-gray-300" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 w-36 rounded-lg" collisionPadding={2} align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="rounded-lg dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              onClick={() => navigate(`/d/prompts/${group._id}`)}
            >
              <EditIcon className="mr-2 h-4 w-4" />
              <span>{localize('com_ui_edit')}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ListCard>
  );
}
