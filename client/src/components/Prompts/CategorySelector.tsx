import React, { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useGetCategories } from '~/data-provider';
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
  currentCategory,
  onValueChange,
}: {
  currentCategory?: string;
  onValueChange?: (value: string) => void;
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
      categories.find((category) => category.value === (watchedCategory ?? currentCategory)) ??
      emptyCategory,
    [watchedCategory, categories, currentCategory],
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
            onValueChange?.(value);
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
