import { MonthlyCalendar } from '@/components/dashboard/MonthlyCalendar';

export default function CalendarPage() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Full Calendar</h1>
          <p className="text-gray-500 mt-1">View all your upcoming schedules and deadlines.</p>
        </div>
      </div>
      
      <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] min-h-[600px]">
        <MonthlyCalendar />
      </div>
    </div>
  );
}
