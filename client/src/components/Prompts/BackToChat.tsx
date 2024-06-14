import { useNavigate } from 'react-router-dom';
import { BotMessageSquare } from 'lucide-react';
import { Button } from '~/components/ui';
import { useLocalize } from '~/hooks';

export default function BackToChat({ className }: { className?: string }) {
  const navigate = useNavigate();
  const localize = useLocalize();
  return (
    <Button variant="outline" className={className} onClick={() => navigate('/c/new')}>
      <BotMessageSquare className="icon-md mr-2" />
      {localize('com_ui_back_to_chat')}
    </Button>
  );
}
