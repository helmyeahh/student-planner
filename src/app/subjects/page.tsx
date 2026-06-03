'use client';
import React, { useState } from 'react';
import { Book, Plus, Clock, Target, Hash, Trash2 } from 'lucide-react';
import { useStore, Subject } from '@/store/useStore';

export default function SubjectsPage() {
  const { subjects, addSubject, updateSubject, deleteSubject } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Subject, 'id'>>({
    name: '',
    difficulty: 'medium',
    color: 'blue',
    target_grade: '',
    schedule: '',
    room: ''
  });

  const openModal = (subject?: Subject) => {
    if (subject) {
      setEditingId(subject.id);
      setFormData(subject);
    } else {
      setEditingId(null);
      setFormData({ name: '', difficulty: 'medium', color: 'blue', target_grade: '', schedule: '', room: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateSubject(editingId, formData);
    } else {
      addSubject(formData);
    }
    setIsModalOpen(false);
  };

  const getColorClass = (color: string) => {
    const map: Record<string, string> = {
      red: 'border-t-red-500 text-red-600 bg-red-50',
      green: 'border-t-green-500 text-green-600 bg-green-50',
      blue: 'border-t-blue-500 text-blue-600 bg-blue-50',
      purple: 'border-t-purple-500 text-purple-600 bg-purple-50',
      orange: 'border-t-orange-500 text-orange-600 bg-orange-50',
    };
    return map[color] || map.blue;
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col">
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Subjects & Schedules</h1>
          <p className="text-gray-500 mt-1">Manage your courses, set schedules, and define target grades.</p>
        </div>
        
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#6366f1] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-[#4f46e5] transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Subject
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => (
          <div key={subject.id} className={`bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border-t-4 ${getColorClass(subject.color).split(' ')[0]}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-1">{subject.name}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${getColorClass(subject.color).replace(getColorClass(subject.color).split(' ')[0], '')}`}>
                  {subject.difficulty.charAt(0).toUpperCase() + subject.difficulty.slice(1)} Difficulty
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <Book className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              <div className="flex items-center text-sm text-gray-600">
                <Target className="w-4 h-4 mr-3 text-gray-400" />
                <span className="font-medium w-24">Target Grade:</span>
                <span className="font-bold text-gray-900">{subject.target_grade || 'None'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-3 text-gray-400" />
                <span className="font-medium w-24">Schedule:</span>
                <span className="text-gray-900">{subject.schedule || 'None'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Hash className="w-4 h-4 mr-3 text-gray-400" />
                <span className="font-medium w-24">Room:</span>
                <span className="text-gray-900">{subject.room || 'None'}</span>
              </div>
            </div>
            
            <button 
              onClick={() => openModal(subject)}
              className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Edit Subject
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-xl">{editingId ? 'Edit Subject' : 'Add Subject'}</h3>
              {editingId && (
                <button onClick={() => { deleteSubject(editingId); setIsModalOpen(false); }} className="text-red-500 hover:text-red-600 transition-colors p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subject Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] text-gray-900 bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Difficulty</label>
                  <select value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value as any})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] text-gray-900 bg-white">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Color Theme</label>
                  <select value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] text-gray-900 bg-white">
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Target Grade</label>
                <input type="text" placeholder="e.g. A, B+, 95" value={formData.target_grade} onChange={e => setFormData({...formData, target_grade: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Schedule</label>
                <input type="text" placeholder="e.g. Mon, Wed 09:00" value={formData.schedule} onChange={e => setFormData({...formData, schedule: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] text-gray-900 bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Room</label>
                <input type="text" placeholder="e.g. Room 302" value={formData.room} onChange={e => setFormData({...formData, room: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] text-gray-900 bg-white" />
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-colors font-medium">Save Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
