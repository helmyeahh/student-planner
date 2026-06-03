'use client';
import React, { useState } from 'react';
import { Target, Sparkles, Clock, Trash2, Edit2, Plus } from 'lucide-react';
import { useStore, Task, TaskType } from '@/store/useStore';

export function ExecutionPhase() {
  const { tasks, toggleTask, addTask, updateTask, deleteTask } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    type: 'normal',
    time: ''
  });

  const openModal = (task?: Task) => {
    if (task) {
      setEditingId(task.id);
      setFormData({ title: task.title, type: task.type, time: task.time || '' });
    } else {
      setEditingId(null);
      setFormData({ title: '', type: 'normal', time: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTask(editingId, formData);
    } else {
      addTask(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <section className="mb-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-xl text-gray-900">Action Items</h3>
        </div>
        <button onClick={() => openModal()} className="text-[#6366f1] hover:bg-[#eef2ff] p-1.5 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="flex items-start gap-4 group">
            <div 
              className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                task.completed ? 'bg-[#6366f1] border-[#6366f1] text-white' : 'border-gray-300 bg-white'
              }`}
              onClick={() => toggleTask(task.id)}
            >
              {task.completed && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            
            <div className="flex-1 cursor-pointer" onClick={() => toggleTask(task.id)}>
              <p className={`font-medium text-sm transition-colors flex items-center gap-2 ${
                task.completed ? 'text-gray-400 line-through' : 'text-gray-700'
              }`}>
                {task.title}
                {task.type === 'ai' && <Sparkles className={`w-3.5 h-3.5 ${task.completed ? 'text-gray-300' : 'text-[#6366f1]'}`} />}
              </p>
              
              {task.time && !task.completed && (
                <div className="flex items-center text-xs text-red-500 font-medium mt-1">
                  <Clock className="w-3 h-3 mr-1" /> {task.time}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openModal(task)} className="text-gray-400 hover:text-[#6366f1] p-1">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500 p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No pending tasks.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-xl">{editingId ? 'Edit Task' : 'Add Task'}</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Task Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as TaskType})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] text-gray-900 bg-white">
                  <option value="normal">Normal</option>
                  <option value="deadline">Deadline</option>
                  <option value="ai">AI Suggestion</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Due Time / Info (Optional)</label>
                <input type="text" placeholder="e.g. 6:00 PM" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] text-gray-900 bg-white" />
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-colors font-medium">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
