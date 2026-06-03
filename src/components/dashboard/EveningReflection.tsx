'use client';
import React, { useState } from 'react';
import { UploadCloud, Star, Send, BookOpen } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function EveningReflection() {
  const { subjects, addJournal } = useStore();
  const [rating, setRating] = useState(0);
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectId || rating === 0 || !notes) return;
    
    addJournal({
      date: new Date().toISOString(),
      subject_id: subjectId,
      rating,
      notes,
    });
    
    setIsSubmitted(true);
    setRating(0);
    setNotes('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="mb-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-yellow-500" />
        <h3 className="font-bold text-xl text-gray-900">Evening Reflection</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase">Select Subject</label>
            <select 
              required
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-1 focus:ring-[#6366f1] focus:outline-none text-sm font-medium"
            >
              <option value="" disabled>Choose a subject...</option>
              {subjects.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase">Upload Notes (Optional)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-[#6366f1] transition-colors bg-gray-50">
              <UploadCloud className="w-6 h-6 mx-auto text-gray-400 mb-2" />
              <p className="text-xs text-gray-500 font-medium">Drag & drop or click to browse</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 flex flex-col">
          <div>
            <label className="block text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase">Understanding Level</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 transition-colors ${rating >= star ? 'text-orange-500' : 'text-gray-300'}`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-xs font-bold text-gray-500 tracking-wider mb-2 uppercase">What was confusing today?</label>
            <textarea 
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="flex-1 w-full p-3 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-1 focus:ring-[#6366f1] focus:outline-none text-sm resize-none"
              placeholder="Briefly describe what you struggled with..."
            ></textarea>
          </div>
          
          <div className="flex justify-end mt-2">
            <button 
              type="submit" 
              disabled={isSubmitted || rating === 0 || !notes}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                isSubmitted ? 'bg-green-100 text-green-700' : 'bg-[#e0e7ff] text-[#4338ca] hover:bg-[#c7d2fe] disabled:opacity-50'
              }`}
            >
              {isSubmitted ? 'Saved!' : <>Submit Journal <Send className="w-4 h-4" /></>}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
