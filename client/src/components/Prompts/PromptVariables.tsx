import { useMemo } from 'react';
import { Variable } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { extractUniqueVariables } from '~/utils';
import { useLocalize } from '~/hooks';

const PromptVariables = () => {
  const localize = useLocalize();
  const methods = useFormContext();
  const { watch } = methods;
  const watchedPrompt = watch('prompt');

  const variables = useMemo(() => {
    return extractUniqueVariables(watchedPrompt || '');
  }, [watchedPrompt]);

  return (
    <>
      <h3 className="flex items-center gap-2 rounded-t-lg border border-gray-300 py-2 pl-4 text-base font-semibold">
        <Variable className="icon-sm" />
        {localize('com_ui_variables')}
      </h3>
      <div className="mb-4 flex w-full flex-row flex-wrap rounded-b-lg border border-gray-300 p-4 md:min-h-16">
        {variables.length ? (
          variables.map((variable, index) => (
            <label className="mb-1 mr-1 rounded-full border px-2" key={index}>
              {variable}
            </label>
          ))
        ) : (
          <span className="text-sm text-gray-500">{localize('com_ui_variables_info')}</span>
        )}
      </div>
    </>
  );
};

export default PromptVariables;
