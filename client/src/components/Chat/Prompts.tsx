import { useGetRandomPrompts } from '~/data-provider';
import PromptCard from './PromptCard';

export default function Prompts() {
  const randomPromptsQuery = useGetRandomPrompts({ limit: 4, skip: 0 });
  return (
    !!randomPromptsQuery.data && (
      <div className="mx-3 mt-12 flex max-w-3xl flex-wrap items-stretch justify-center gap-4 fade-in">
        <div className="flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
          {randomPromptsQuery.data.prompts.map(
            (promptGroup, i) =>
              i < 2 && <PromptCard key={promptGroup._id} promptGroup={promptGroup} />,
          )}
        </div>
        <div className="flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
          {randomPromptsQuery.data.prompts.map(
            (promptGroup, i) =>
              i > 1 && <PromptCard key={promptGroup._id} promptGroup={promptGroup} />,
          )}
        </div>
      </div>
    )
  );
}
