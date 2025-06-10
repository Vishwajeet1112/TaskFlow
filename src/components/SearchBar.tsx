import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-20"></div>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Search className="text-gray-400 w-5 h-5" />
          <Sparkles className="text-purple-400 w-4 h-4 animate-pulse" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search through your amazing tasks..."
          className="w-full pl-16 pr-12 py-4 border-2 border-white/30 rounded-2xl focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 font-medium"
        />
        {query && (
          <button
            onClick={() => onQueryChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-all duration-200 p-1 hover:bg-red-50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}