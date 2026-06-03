'use client';
import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export function MonthlyCalendar() {
  const [events] = useState([
    {
      title: 'Calculus Midterm',
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(12, 0, 0, 0)),
      type: 'exam'
    },
    {
      title: 'Psych Essay Due',
      start: new Date(new Date().setDate(new Date().getDate() + 2)),
      end: new Date(new Date().setDate(new Date().getDate() + 2)),
      type: 'deadline'
    }
  ]);

  const eventStyleGetter = (event: any) => {
    let backgroundColor = 'var(--color-brand-500)';
    if (event.type === 'exam') backgroundColor = '#9333ea'; // purple
    if (event.type === 'deadline') backgroundColor = '#ef4444'; // red

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <div className="h-[600px] w-full">
      <style dangerouslySetInnerHTML={{__html: `
        .rbc-calendar { font-family: var(--font-sans); }
        .rbc-header { padding: 10px; font-weight: 600; border-bottom: 1px solid var(--surface-border); }
        .rbc-month-view { border-color: var(--surface-border); border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
        .rbc-day-bg { border-color: #e5e7eb; }
        .rbc-today { background-color: #eff6ff; }
        .rbc-event { padding: 2px 5px; font-size: 12px; font-weight: 500; }
      `}} />
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        eventPropGetter={eventStyleGetter}
        className="text-gray-700"
      />
    </div>
  );
}
