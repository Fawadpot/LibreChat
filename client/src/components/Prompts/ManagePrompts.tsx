import { useNavigate } from 'react-router-dom';
import { buttonVariants } from '~/components/ui';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

export default function ManagePrompts({ className }: { className?: string }) {
  const navigate = useNavigate();
  const localize = useLocalize();
  const clickHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button === 0 && !(event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      navigate('/d/prompts');
    }
  };
  return (
    <a
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      href="/d/prompts"
      onClick={clickHandler}
    >
      {localize('com_ui_manage_prompts')}
    </a>
  );
}
