import {
  BoxIcon,
  Dices,
  GraduationCapIcon,
  LightbulbIcon,
  LineChartIcon,
  PenLineIcon,
  PlaneTakeoffIcon,
  ShoppingBagIcon,
  TerminalSquareIcon,
} from 'lucide-react';
import React from 'react';

export default function CategoryIcon({ category }) {
  switch (category) {
    case 'idea':
      return <LightbulbIcon className="text-yellow-300" />;
    case 'travel':
      return <PlaneTakeoffIcon className="text-yellow-300" />;
    case 'teach-or-explain':
      return <GraduationCapIcon className="text-blue-300" />;
    case 'write':
      return <PenLineIcon className="text-purple-400" />;
    case 'shop':
      return <ShoppingBagIcon className="text-purple-400" />;
    case 'code':
      return <TerminalSquareIcon className="text-red-500" />;
    case 'misc':
      return <BoxIcon className="text-blue-300" />;
    case 'roleplay':
      return <Dices className="text-orange-400" />;
    case 'finance':
      return <LineChartIcon className="text-orange-400" />;
    default:
  }
}
