import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useChatContext } from '~/Providers';

export default function useSubmitMessage(helpers?: { clearDraft?: () => void }) {
  const { ask } = useChatContext();
  const methods = useFormContext<{ text: string }>();
  const submitMessage = useCallback(
    (data?: { text: string }) => {
      if (!data) {
        return console.warn('No data provided to submitMessage');
      }
      ask({ text: data.text });
      methods.reset();
      helpers?.clearDraft && helpers.clearDraft();
    },
    [ask, methods, helpers],
  );

  return submitMessage;
}
