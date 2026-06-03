'use client';
import React from 'react';
import { Clock, MapPin, Book } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function MorningView() {
  const { subjects } = useStore();

  const getColorClass = (color: string) => {
    const map: Record<string, string> = {
      red: 'border-l-red-500',
      green: 'border-l-green-500',
      blue: 'border-l-blue-500',
      purple: 'border-l-purple-500',
      orange: 'border-l-orange-500',
    };
    return map[color] || map.blue;
  };

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-[#6366f1]" />
        <h3 className="font-bold text-xl text-gray-900">Today's Classes</h3>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {subjects.length > 0 ? subjects.map(subject => (
          <div key={subject.id} className={`flex-1 min-w-[250px] bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border-l-4 ${getColorClass(subject.color)} relative overflow-hidden`}>
            <h4 className="font-bold text-gray-900 text-lg mb-3">{subject.name}</h4>
            <div className="flex items-center text-sm text-gray-500 gap-4">
              {subject.schedule && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {subject.schedule}
                </div>
              )}
              {subject.room && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {subject.room}
                </div>
              )}
            </div>
          </div>
        )) : (
          <div className="w-full bg-white border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-500">
            <Book className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-sm">No classes set up yet. Go to Subjects to add them!</p>
          </div>
        )}
      </div>
    </section>
  );
}
