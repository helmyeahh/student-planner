'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';

export function MiniCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState([
    { date: new Date(new Date().setHours(10, 0, 0, 0)), type: 'exam' },
    { date: new Date(new Date().setDate(new Date().getDate() + 2)), type: 'deadline' },
    { date: new Date(new Date().setDate(new Date().getDate() + 5)), type: 'deadline' }
  ]);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <section className="mb-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl flex items-center gap-2">
          <span className="text-[#6366f1]">📅</span> Monthly Horizon
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-sm font-medium text-gray-600">
        {daysInMonth.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isDayToday = isToday(day);
          const dayEvents = events.filter(e => isSameDay(e.date, day));

          return (
            <div key={i} className="flex flex-col items-center justify-start h-10">
              <span className={`w-7 h-7 flex items-center justify-center rounded-full ${
                isDayToday ? 'bg-[#ebf4ff] text-[#3b82f6] font-bold' : 
                isCurrentMonth ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {format(day, 'd')}
              </span>
              <div className="flex gap-0.5 mt-0.5 h-1">
                {dayEvents.map((e, idx) => (
                  <span key={idx} className={`w-1 h-1 rounded-full ${e.type === 'exam' ? 'bg-[#9333ea]' : 'bg-[#ef4444]'}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
