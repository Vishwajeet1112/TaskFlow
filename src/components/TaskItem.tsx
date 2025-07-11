import React, { useState } from 'react';
import { Check, Edit2, Trash2, AlertCircle, Circle, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
}

export function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate({ 
        text: editText.trim(),
        description: editDescription.trim() || undefined
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const priorityStyles = {
    low: {
      gradient: 'from-emerald-400 to-teal-500',
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-200',
      icon: 'text-emerald-500',
      glow: 'shadow-emerald-200/50'
    },
    medium: {
      gradient: 'from-amber-400 to-orange-500',
      bg: 'bg-amber-50/80',
      border: 'border-amber-200',
      icon: 'text-amber-500',
      glow: 'shadow-amber-200/50'
    },
    high: {
      gradient: 'from-rose-400 to-pink-500',
      bg: 'bg-rose-50/80',
      border: 'border-rose-200',
      icon: 'text-rose-500',
      glow: 'shadow-rose-200/50'
    },
  };

  const priorityIcons = {
    low: <Circle className={`w-5 h-5 ${priorityStyles.low.icon}`} />,
    medium: <AlertCircle className={`w-5 h-5 ${priorityStyles.medium.icon}`} />,
    high: <Star className={`w-5 h-5 ${priorityStyles.high.icon} fill-current`} />,
  };

  const currentStyle = priorityStyles[task.priority];
  const hasDescription = task.description && task.description.trim().length > 0;

  return (
    <div className="relative group">
      {/* Animated glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentStyle.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>
      
      <div className={`relative p-4 sm:p-6 bg-white/95 backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
        task.completed
          ? 'border-emerald-300 bg-emerald-50/50 shadow-emerald-100/50'
          : `${currentStyle.border} ${currentStyle.bg} shadow-lg ${currentStyle.glow}`
      } hover:scale-[1.02] hover:-translate-y-1`}>
        <div className="flex items-start gap-4">
          <button
            onClick={onToggle}
            className={`flex-shrink-0 w-7 h-7 rounded-full border-3 flex items-center justify-center transition-all duration-300 mt-1 transform hover:scale-110 ${
              task.completed
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 border-emerald-400 text-white shadow-lg shadow-emerald-200/50'
                : `border-gray-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50`
            }`}
          >
            {task.completed && <Check className="w-4 h-4" />}
          </button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 bg-white/90"
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Add a description..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 resize-none bg-white/90"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-sm font-medium rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {priorityIcons[task.priority]}
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                      task.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  {hasDescription && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:bg-white/50 rounded-lg"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
                
                <h3 className={`text-lg font-semibold mb-1 ${
                  task.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-900'
                }`}>
                  {task.text}
                </h3>
                
                {hasDescription && isExpanded && (
                  <div className="mt-3 p-4 bg-white/60 rounded-xl border border-gray-200/50">
                    <p className={`text-sm leading-relaxed ${
                      task.completed ? 'text-gray-400' : 'text-gray-700'
                    }`}>
                      {task.description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 transition-all duration-300">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-200 transform hover:scale-110"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 pl-11">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
            Created {new Date(task.createdAt).toLocaleDateString()}
          </span>
          {hasDescription && (
            <span className="flex items-center gap-1 text-blue-500">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              Has notes
            </span>
          )}
        </div>
      </div>
    </div>
  );
}