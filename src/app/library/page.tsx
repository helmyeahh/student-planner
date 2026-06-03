import React from 'react';
import { UploadCloud, FileText, Search } from 'lucide-react';

export default function LibraryPage() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col">
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Library & Notes</h1>
          <p className="text-gray-500 mt-1">Access your uploaded notes and study materials.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-[#6366f1] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-[#4f46e5] transition-colors">
          <UploadCloud className="w-5 h-5" /> Upload File
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search notes..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all text-sm"
            />
          </div>
          <select className="p-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#6366f1]">
            <option>All Subjects</option>
            <option>Advanced Calculus</option>
            <option>Digital Ethics</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Mock Note Card 1 */}
          <div className="border border-gray-200 rounded-xl p-4 hover:border-[#6366f1] transition-colors cursor-pointer group">
            <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400 group-hover:bg-[#eef2ff] group-hover:text-[#6366f1] transition-colors">
              <FileText className="w-10 h-10" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 truncate">Calculus Chapter 4 Notes</h4>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">Oct 12, 2023</span>
              <span className="text-xs font-medium px-2 py-0.5 bg-red-50 text-red-600 rounded">Calculus</span>
            </div>
          </div>

          {/* Mock Note Card 2 */}
          <div className="border border-gray-200 rounded-xl p-4 hover:border-[#6366f1] transition-colors cursor-pointer group">
            <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400 group-hover:bg-[#eef2ff] group-hover:text-[#6366f1] transition-colors">
              <FileText className="w-10 h-10" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 truncate">Ethics Essay Outline</h4>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">Oct 10, 2023</span>
              <span className="text-xs font-medium px-2 py-0.5 bg-green-50 text-green-600 rounded">Ethics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
