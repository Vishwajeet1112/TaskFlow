import React from 'react';
import { FilterType } from '../types/task';
import { CheckCircle2, Circle, List } from 'lucide-react';

interface FilterTabsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export function FilterTabs({ currentFilter, onFilterChange, stats }: FilterTabsProps) {
  const filters: { key: FilterType; label: string; count: number; icon: React.ReactNode; gradient: string }[] = [
    { 
      key: 'all', 
      label: 'All Tasks', 
      count: stats.total, 
      icon: <List className="w-4 h-4" />,
      gradient: 'from-blue-500 to-purple-600'
    },
    { 
      key: 'active', 
      label: 'Active', 
      count: stats.active, 
      icon: <Circle className="w-4 h-4" />,
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      key: 'completed', 
      label: 'Completed', 
      count: stats.completed, 
      icon: <CheckCircle2 className="w-4 h-4" />,
      gradient: 'from-emerald-500 to-teal-600'
    },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur-lg opacity-20"></div>
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
        <div className="grid grid-cols-3 gap-2">
          {filters.map(({ key, label, count, icon, gradient }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`relative px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                currentFilter === key
                  ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                {icon}
                <span className="text-sm">{label}</span>
              </div>
              <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                currentFilter === key
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {count}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}