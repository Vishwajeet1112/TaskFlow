import React, { useState } from 'react';
import { Plus, Sparkles, Target } from 'lucide-react';
import { Task } from '../types/task';

interface AddTaskFormProps {
  onAdd: (text: string, description: string, priority: Task['priority']) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, description, priority);
      setText('');
      setDescription('');
      setPriority('medium');
    }
  };

  const priorityOptions = [
    { value: 'low', label: '🟢 Low', color: 'from-emerald-400 to-teal-500' },
    { value: 'medium', label: '🟡 Medium', color: 'from-amber-400 to-orange-500' },
    { value: 'high', label: '🔴 High', color: 'from-rose-400 to-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
          <Target className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Create New Task</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What amazing thing will you accomplish?"
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm text-lg font-medium"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add some details to make it shine... ✨"
          rows={3}
          className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none bg-white/80 backdrop-blur-sm"
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Priority Level</label>
            <div className="grid grid-cols-3 gap-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value as Task['priority'])}
                  className={`p-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                    priority === option.value
                      ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                      : 'bg-white/60 text-gray-700 hover:bg-white/80 border border-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-2xl hover:from-purple-600 hover:via-pink-600 hover:to-red-600 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none"
            >
              <Plus className="w-6 h-6" />
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}