'use client';
import React, { useState } from 'react';
import { Sparkles, Calendar, Loader2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { format } from 'date-fns';

export default function JournalPage() {
  const { journals, subjects } = useStore();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<string | null>(null);

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setEvaluation(null);

    try {
      const response = await fetch('/api/brain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subjects: subjects.map(s => ({ name: s.name, difficulty: s.difficulty })),
          journals: journals.map(j => {
            const subject = subjects.find(s => s.id === j.subject_id);
            return { subject: subject?.name, rating: j.rating, notes: j.notes };
          }),
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate evaluation.");
      }
      if (data.advice) {
        setEvaluation(data.advice);
      }
    } catch (error: any) {
      console.error(error);
      setEvaluation(error.message || "Oops, something went wrong while analyzing your journals. Please try again later.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Journal History</h1>
        <p className="text-gray-500 mt-1">Review your daily reflections and get AI-driven study insights.</p>
      </div>

      {/* AI Evaluation Section */}
      <section className="mb-8 bg-gradient-to-br from-[#fcfaff] to-[#f3f0ff] border border-purple-200 rounded-3xl p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm text-[#6366f1] shrink-0">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-xl mb-2">Weekly AI Evaluation</h3>
            
            {!evaluation ? (
              <>
                <p className="text-gray-600 mb-4">
                  Analyze your journal entries from the past 7 days to get a personalized study schedule and priority list.
                </p>
                <button 
                  onClick={handleEvaluate}
                  disabled={isEvaluating}
                  className="flex items-center gap-2 bg-[#6366f1] text-white px-6 py-3 rounded-xl font-medium shadow-md hover:bg-[#4f46e5] transition-colors disabled:opacity-70"
                >
                  {isEvaluating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  {isEvaluating ? 'Analyzing...' : 'Generate Weekly Evaluation'}
                </button>
              </>
            ) : (
              <div className="bg-white/60 p-4 rounded-xl border border-purple-100 text-gray-800 leading-relaxed">
                {evaluation}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Journal History Timeline */}
      <section className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
        <h3 className="font-bold text-xl text-gray-900 mb-6 border-b border-gray-100 pb-4">Past Entries</h3>
        
        <div className="space-y-6">
          {journals.length === 0 ? (
            <p className="text-gray-500 italic">No journal entries yet. Fill out the Evening Reflection on the home page!</p>
          ) : (
            [...journals].reverse().map(journal => {
              const subject = subjects.find(s => s.id === journal.subject_id);
              return (
                <div key={journal.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2 shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="w-px h-full bg-gray-200"></div>
                  </div>
                  <div className="pb-6 flex-1">
                    <h4 className="font-bold text-lg text-gray-900">{subject?.name || 'Unknown Subject'}</h4>
                    <p className="text-sm text-gray-500 mb-2">{format(new Date(journal.date), 'PPpp')}</p>
                    <div className="flex gap-1 mb-3">
                      <span className="text-orange-500">
                        {'★'.repeat(journal.rating)}{'☆'.repeat(5 - journal.rating)}
                      </span> 
                      <span className="text-xs text-gray-500 ml-2 pt-1">({journal.rating}/5 Understanding)</span>
                    </div>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {journal.notes}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
