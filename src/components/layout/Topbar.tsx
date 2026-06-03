'use client';
import React from 'react';
import { Search, User, Menu } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function Topbar() {
  const { user, setMobileMenuOpen } = useStore();

  return (
    <header className="w-full flex justify-between items-center py-4 px-6 md:py-6 md:px-8 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -ml-2 rounded-xl text-gray-600 hover:bg-gray-100 md:hidden transition-colors"
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-[#1e293b] tracking-tight">Good Morning, {user.name}!</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">Ready to tackle today's challenges?</p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-full w-64 focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all text-sm"
          />
        </div>
        <div className="w-9 h-9 md:w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0 cursor-pointer shadow-sm">
           <User className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
    </header>
  );
}
