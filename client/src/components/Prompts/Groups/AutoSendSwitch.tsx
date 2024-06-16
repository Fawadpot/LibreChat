import { useRecoilState } from 'recoil';
import { Switch } from '~/components/ui';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import store from '~/store';

export default function AutoSendSwitch({
  onCheckedChange,
  className = '',
}: {
  onCheckedChange?: (value: boolean) => void;
  className?: string;
}) {
  const [autoSendPrompts, setAutoSendPrompts] = useRecoilState<boolean>(store.autoSendPrompts);
  const localize = useLocalize();

  const handleCheckedChange = (value: boolean) => {
    setAutoSendPrompts(value);
    if (onCheckedChange) {
      onCheckedChange(value);
    }
  };

  return (
    <div
      className={cn('flex select-none items-center justify-end gap-2 px-2 pt-2 text-sm', className)}
    >
      <div> {localize('com_nav_auto_send_prompts')} </div>
      <Switch
        id="autoSendPrompts"
        checked={autoSendPrompts}
        onCheckedChange={handleCheckedChange}
        data-testid="autoSendPrompts"
      />
    </div>
  );
}
