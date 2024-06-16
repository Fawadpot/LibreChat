import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { useFormContext } from 'react-hook-form';
import { forceResize, insertTextAtCursor } from '~/utils';
import { useChatContext } from '~/Providers';
import { mainTextareaId } from '~/common';
import store from '~/store';

export default function useSubmitMessage(helpers?: { clearDraft?: () => void }) {
  const { ask } = useChatContext();
  const methods = useFormContext<{ text: string }>();
  const autoSendPrompts = useRecoilValue(store.autoSendPrompts);

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

  const submitPrompt = useCallback(
    (text: string) => {
      if (autoSendPrompts) {
        submitMessage({ text });
      } else {
        const currentText = methods.getValues('text');
        const newText = currentText ? `\n${text}` : text;
        const textarea = document.getElementById(mainTextareaId) as HTMLTextAreaElement | null;
        if (textarea) {
          insertTextAtCursor(textarea, newText);
          forceResize(textarea);
        }
      }
    },
    [autoSendPrompts, submitMessage, methods],
  );

  return { submitMessage, submitPrompt };
}
