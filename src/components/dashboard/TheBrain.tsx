'use client';
import React, { useState } from 'react';
import { Sparkles, Loader2, PlusCircle, Check } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function TheBrain() {
  const { journals, subjects, addTask } = useStore();
  const [isScheduling, setIsScheduling] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [addedToList, setAddedToList] = useState(false);

  const handleAutoSchedule = async () => {
    setIsScheduling(true);
    setAdvice(null);
    setAddedToList(false);

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
        throw new Error(data.error || "Failed to generate strategy.");
      }
      if (data.advice) {
        setAdvice(data.advice);
      }
    } catch (error: any) {
      console.error(error);
      setAdvice(error.message || "Oops, something went wrong while analyzing your journals. Please try again later.");
    } finally {
      setIsScheduling(false);
    }
  };

  const handleAddAdviceToTasks = () => {
    if (!advice) return;
    addTask({
      title: advice,
      type: 'ai',
      time: 'AI Suggestion'
    });
    setAddedToList(true);
  };

  return (
    <section className="mb-6 bg-[#fcfaff] border border-purple-100 rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-start gap-4 max-w-2xl">
          <div className="p-3 bg-white rounded-xl shadow-sm text-[#6366f1] shrink-0 mt-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2">
              AI Study Strategist
            </h3>
            <div className="text-sm text-gray-600 leading-relaxed">
              {advice ? (
                <p className="text-gray-900 font-medium bg-white/50 p-3 rounded-lg border border-purple-50 inline-block">
                  {advice}
                </p>
              ) : (
                <p>Click below to analyze your recent reflections and get a tailored study strategy for tonight.</p>
              )}
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleAutoSchedule}
          disabled={isScheduling}
          className="flex items-center justify-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-70 text-sm whitespace-nowrap"
        >
          {isScheduling ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate Daily Strategy'}
        </button>
      </div>

      {advice && (
        <div className="mt-2 pl-[3.25rem] flex items-center gap-3">
          <span className="text-sm font-bold text-gray-500">Would you like to add this strategy to your Action Items?</span>
          {!addedToList ? (
            <button 
              onClick={handleAddAdviceToTasks}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#6366f1] text-[#6366f1] text-xs font-bold rounded-lg hover:bg-[#eef2ff] transition-colors shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Add to Tasks
            </button>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-100">
              <Check className="w-3.5 h-3.5" /> Added Successfully
            </span>
          )}
        </div>
      )}
    </section>
  );
}
