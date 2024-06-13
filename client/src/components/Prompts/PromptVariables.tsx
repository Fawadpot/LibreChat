import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { extractUniqueVariables } from '~/utils';

const PromptPreview = () => {
  const methods = useFormContext();
  const { watch } = methods;
  const watchedPrompt = watch('prompt');

  const variables = useMemo(() => {
    return extractUniqueVariables(watchedPrompt || '');
  }, [watchedPrompt]);

  return (
    <>
      <h3 className="rounded-t-lg border border-gray-300 py-2 pl-4 text-base font-semibold">
        Variables
      </h3>
      <div className="mb-4 flex w-full flex-row flex-wrap rounded-b-lg border border-gray-300 p-4 md:min-h-16">
        {variables.length ? (
          variables.map((variable, index) => (
            <label className="mb-1 mr-1 rounded-full border px-2" key={index}>
              {variable}
            </label>
          ))
        ) : (
          <label className="mb-1 mr-1 rounded-full border px-2">No variables</label>
        )}
      </div>
    </>
  );
};

export default PromptPreview;
