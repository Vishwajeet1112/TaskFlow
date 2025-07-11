import React from 'react';
import { CheckCircle2, Circle, Trash2, TrendingUp, Award } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

export function TaskStats({ stats, onClearCompleted }: TaskStatsProps) {
  const completionPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-3xl blur-lg opacity-20"></div>
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Your Progress</h3>
          </div>
          {stats.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Circle className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">Active</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{stats.active}</span>
            </div>

            <div className="relative p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl border border-emerald-200">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-700">Done</span>
              </div>
              <span className="text-2xl font-bold text-emerald-600">{stats.completed}</span>
            </div>
          </div>

          <div className="relative p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">Overall Progress</span>
              </div>
              <span className="text-lg font-bold text-purple-600">
                {Math.round(completionPercentage)}%
              </span>
            </div>
            
            <div className="relative w-full bg-purple-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-3 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${completionPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            
            {completionPercentage === 100 && stats.total > 0 && (
              <div className="mt-3 text-center">
                <span className="text-sm font-medium text-purple-600">🎉 Amazing work! All tasks completed! 🎉</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}