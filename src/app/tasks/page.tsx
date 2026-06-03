import React from 'react';
import { CheckCircle2, Clock, Calendar } from 'lucide-react';
import { ExecutionPhase } from '@/components/dashboard/ExecutionPhase';

export default function TasksPage() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Tasks Overview</h1>
        <p className="text-gray-500 mt-1">Manage your pending assignments and AI-generated study targets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-1">
          <ExecutionPhase />
        </div>

        {/* Upcoming Tasks - Mock implementation for now */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-xl text-gray-900">Upcoming This Week</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                <div className="mt-0.5 shrink-0 w-5 h-5 rounded border border-gray-300 bg-white" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-700">Calculus Assignment 4</p>
                  <div className="flex items-center text-xs text-gray-500 font-medium mt-1">
                    <Clock className="w-3 h-3 mr-1" /> Thursday, 11:59 PM
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
                <div className="mt-0.5 shrink-0 w-5 h-5 rounded border border-gray-300 bg-white" />
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-700">Digital Ethics Group Project</p>
                  <div className="flex items-center text-xs text-gray-500 font-medium mt-1">
                    <Clock className="w-3 h-3 mr-1" /> Friday, 5:00 PM
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
