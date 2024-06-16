import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useChatContext } from '~/Providers';
import store from '~/store';

export default function useSubmitMessage(helpers?: { clearDraft?: () => void }) {
  const { ask, index } = useChatContext();
  const methods = useFormContext<{ text: string }>();
  const autoSendPrompts = useRecoilValue(store.autoSendPrompts);
  const setActivePrompt = useSetRecoilState(store.activePromptByIndex(index));

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
        return;
      }

      const currentText = methods.getValues('text');
      const newText = currentText ? `\n${text}` : text;
      setActivePrompt(newText);
    },
    [autoSendPrompts, submitMessage, setActivePrompt, methods],
  );

  return { submitMessage, submitPrompt };
}
