import React from 'react';
import {
  Dices,
  BoxIcon,
  PenLineIcon,
  LightbulbIcon,
  LineChartIcon,
  ShoppingBagIcon,
  PlaneTakeoffIcon,
  GraduationCapIcon,
  TerminalSquareIcon,
} from 'lucide-react';

const categoryIconMap: Record<string, React.ElementType> = {
  misc: BoxIcon,
  roleplay: Dices,
  write: PenLineIcon,
  idea: LightbulbIcon,
  shop: ShoppingBagIcon,
  finance: LineChartIcon,
  code: TerminalSquareIcon,
  travel: PlaneTakeoffIcon,
  teach: GraduationCapIcon,
};

const categoryColorMap: Record<string, string> = {
  code: 'text-red-500',
  misc: 'text-blue-300',
  teach: 'text-blue-300',
  shop: 'text-purple-400',
  idea: 'text-yellow-300',
  write: 'text-purple-400',
  travel: 'text-yellow-300',
  finance: 'text-orange-400',
  roleplay: 'text-orange-400',
};

export default function CategoryIcon({ category }: { category: string }) {
  const IconComponent = categoryIconMap[category];
  const colorClass = categoryColorMap[category];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent className={colorClass} />;
}
