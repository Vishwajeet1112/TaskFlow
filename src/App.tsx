import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskItem } from './components/TaskItem';
import { FilterTabs } from './components/FilterTabs';
import { SearchBar } from './components/SearchBar';
import { TaskStats } from './components/TaskStats';

function App() {
  const {
    tasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    stats,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-br from-green-300 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-3xl blur-lg opacity-75"></div>
              <div className="relative p-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-3xl shadow-2xl">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
              TaskFlow
            </h1>
          </div>
          <p className="text-white/90 text-xl font-medium drop-shadow-md">
            ✨ Transform your productivity with style ✨
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Task Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Task Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur-lg opacity-20"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <AddTaskForm onAdd={addTask} />
              </div>
            </div>

            {/* Search and Filter */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-2xl blur-lg opacity-20"></div>
                <div className="relative">
                  <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
                </div>
              </div>
              
              <FilterTabs
                currentFilter={filter}
                onFilterChange={setFilter}
                stats={stats}
              />
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-16">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-50"></div>
                    <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                      <Sparkles className="w-16 h-16 text-white animate-bounce" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                    {searchQuery ? '🔍 No tasks found' : '🚀 Ready to start?'}
                  </h3>
                  <p className="text-white/80 max-w-sm mx-auto text-lg">
                    {searchQuery 
                      ? 'Try adjusting your search or filter criteria'
                      : 'Create your first task and watch the magic happen!'
                    }
                  </p>
                </div>
              ) : (
                tasks.map((task, index) => (
                  <div key={task.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                    <TaskItem
                      task={task}
                      onToggle={() => toggleTask(task.id)}
                      onUpdate={(updates) => updateTask(task.id, updates)}
                      onDelete={() => deleteTask(task.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TaskStats stats={stats} onClearCompleted={clearCompleted} />
            
            {/* Enhanced Tips Card */}
            <div className="relative">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"> */}
                {/* <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 animate-spin" />
                  <h3 className="text-xl font-bold">Pro Tips</h3>
                </div> */}
                {/* <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
                    Use priority levels to organize tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse animation-delay-1000"></span>
                    Add descriptions for detailed notes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse animation-delay-2000"></span>
                    Search tasks with keywords
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-300 rounded-full animate-pulse animation-delay-3000"></span>
                    Click on tasks to edit them inline
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-300 rounded-full animate-pulse animation-delay-4000"></span>
                    Clear completed tasks regularly
                  </li>
                </ul> */}
              {/* </div> */}
            </div>

            {/* New Motivation Card */}
            {/* <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl p-6 text-white shadow-2xl">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Daily Motivation
                </h3>
                <p className="text-sm leading-relaxed">
                  "Success is the sum of small efforts repeated day in and day out."
                </p>
                <p className="text-xs mt-2 opacity-80">- Robert Collier</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;