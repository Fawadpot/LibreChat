import { useNavigate } from 'react-router-dom';
import { TPromptGroup } from 'librechat-data-provider/dist/types';
import DropDownMenu from '~/components/Conversations/DropDownMenu';
import { RenameButton } from '~/components/Conversations';
import ListCard from '~/components/Prompts/Groups/ListCard';
import { cn } from '~/utils';

export default function ChatGroupItem({ group }: { group: TPromptGroup }) {
  // const navigate = useNavigate();

  return (
    <ListCard category="write" snippet="Email for plumber quote">
      <div className="h-4 w-4 bg-green-500">
        {/* <DropDownMenu>
          <RenameButton
            renaming={false}
            renameHandler={() => {
              setNameEditFlag(true);
            }}
            appendLabel={true}
            className="mb-[3.5px]"
          />
        </DropDownMenu> */}
      </div>
    </ListCard>
  );
}
