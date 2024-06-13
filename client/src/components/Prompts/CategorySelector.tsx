import React, { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import type { TPromptGroup } from 'librechat-data-provider';
import { useGetCategories, useUpdatePromptGroup } from '~/data-provider';
import { SelectDropDown } from '~/components/ui';
import CategoryIcon from './CategoryIcon';

const loadingCategories = [
  {
    label: 'Loading...',
    value: '',
  },
];

const emptyCategory = {
  label: '-',
  value: '',
};

const CategorySelector = ({
  group,
  updateGroupMutation,
}: {
  group?: TPromptGroup;
  updateGroupMutation: ReturnType<typeof useUpdatePromptGroup>;
}) => {
  const { control, watch } = useFormContext();
  const { data: categories = loadingCategories } = useGetCategories({
    select: (data) =>
      data.map((category) => ({
        label: category.label,
        value: category.value,
        icon: <CategoryIcon category={category.value} />,
      })),
  });

  const watchedCategory = watch('category');
  const categoryOption = useMemo(
    () =>
      categories.find((category) => category.value === (watchedCategory ?? group?.category)) ??
      emptyCategory,
    [watchedCategory, categories, group?.category],
  );

  return (
    <Controller
      name="category"
      control={control}
      rules={{ required: true, minLength: 1 }}
      render={({ field }) => (
        <SelectDropDown
          title="Category"
          value={categoryOption || ''}
          setValue={(value) => {
            field.onChange(value);
            updateGroupMutation.mutate({
              id: group?._id || '',
              payload: { name: group?.name || '', category: value },
            });
          }}
          availableValues={categories}
          showAbove={false}
          showLabel={false}
          emptyTitle={true}
          showOptionIcon={true}
          searchPlaceholder="Search categories..."
          className="h-10 w-56 cursor-pointer"
          currentValueClass="text-md gap-2"
          optionsListClass="text-sm"
        />
      )}
    />
  );
};

export default CategorySelector;
