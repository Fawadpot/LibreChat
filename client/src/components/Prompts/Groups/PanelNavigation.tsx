import ManagePrompts from '~/components/Prompts/ManagePrompts';
import BackToChat from '~/components/Prompts/BackToChat';
import { Button } from '~/components/ui';
import { useLocalize } from '~/hooks';

export default function PanelNavigation({
  prevPage,
  nextPage,
  hasPreviousPage,
  hasNextPage,
  isFetching,
  isChatRoute,
}: {
  prevPage: () => void;
  nextPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFetching: boolean;
  isChatRoute: boolean;
}) {
  const localize = useLocalize();
  return (
    <div className="flex justify-between">
      <div className="mb-2 flex gap-2">{isChatRoute ? <ManagePrompts /> : <BackToChat />}</div>
      <div className="mb-2 flex gap-2">
        <Button variant="outline" onClick={() => prevPage()} disabled={!hasPreviousPage}>
          {localize('com_ui_prev')}
        </Button>
        <Button variant="outline" onClick={() => nextPage()} disabled={!hasNextPage || isFetching}>
          {isFetching ? localize('com_ui_loading') : localize('com_ui_next')}
        </Button>
      </div>
    </div>
  );
}
