import CategoryIcon from '~/components/Prompts/Groups/CategoryIcon';

export default function ListCard({
  category,
  name,
  snippet,
  children,
}: {
  category: string;
  name: string;
  snippet: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="border-token-border-light relative my-2 flex w-full cursor-pointer flex-col gap-2 rounded-2xl border px-3 pb-4 pt-3 text-start
      align-top text-[15px] shadow-[0_0_2px_0_rgba(0,0,0,0.05),0_4px_6px_0_rgba(0,0,0,0.02)] transition dark:hover:bg-gray-700"
    >
      <div className="flex w-full justify-between">
        <div className="flex flex-row gap-2">
          <CategoryIcon category={category} className="icon-md" />
          <h3 className="break-word text-balance text-sm font-semibold text-gray-800 dark:text-gray-200">
            {name}
          </h3>
        </div>
        <div>{children}</div>
      </div>
      <div className="break-word line-clamp-3 text-balance text-sm text-gray-600 dark:text-gray-400">
        {snippet}
      </div>
    </div>
  );
}
