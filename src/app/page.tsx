import { MorningView } from '@/components/dashboard/MorningView';
import { ExecutionPhase } from '@/components/dashboard/ExecutionPhase';
import { TheBrain } from '@/components/dashboard/TheBrain';
import { EveningReflection } from '@/components/dashboard/EveningReflection';
import { MiniCalendar } from '@/components/dashboard/MiniCalendar';

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (Classes, AI, Reflection) */}
        <div className="xl:col-span-2 space-y-6">
          <MorningView />
          <TheBrain />
          <EveningReflection />
        </div>
        
        {/* Right Column (Action Items, Mini Calendar) */}
        <div className="xl:col-span-1 space-y-6">
          <ExecutionPhase />
          <MiniCalendar />
        </div>
        
      </div>
    </div>
  );
}
