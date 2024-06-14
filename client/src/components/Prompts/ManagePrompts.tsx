import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/ui';
import { useLocalize } from '~/hooks';

export default function ManagePrompts({ className }: { className?: string }) {
  const navigate = useNavigate();
  const localize = useLocalize();
  return (
    <Button variant="outline" className={className} onClick={() => navigate('/d/prompts')}>
      {localize('com_ui_manage_prompts')}
    </Button>
  );
}
