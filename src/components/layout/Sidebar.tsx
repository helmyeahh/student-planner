'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  Library, 
  Sparkles,
  HelpCircle,
  LogOut,
  User,
  FileText,
  Edit2,
  X
} from 'lucide-react';
import { useStore } from '@/store/useStore';

export function Sidebar() {
  const pathname = usePathname();
  const { user, setUserName, isMobileMenuOpen, setMobileMenuOpen } = useStore();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const handleSaveProfile = () => {
    setUserName(tempName);
    setIsEditingProfile(false);
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Library', href: '/library', icon: Library },
    { name: 'Journal', href: '/journal', icon: Sparkles },
    { name: 'Subjects', href: '/subjects', icon: FileText },
  ];

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
        />
      )}

      {/* Sidebar container */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-[#f8fafc] border-r border-gray-200 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo / Profile Area */}
          <div className="p-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center shrink-0">
                <User className="text-gray-500 w-6 h-6" />
              </div>
              <div className="flex-1 group relative cursor-pointer" onClick={() => setIsEditingProfile(true)}>
                <h2 className="font-bold text-gray-900 text-sm flex items-center gap-1 hover:text-[#6366f1] transition-colors">
                  {user.name}'s Hub <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-xs text-gray-500 font-semibold text-purple-600">Study Planner</p>
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-200 md:hidden text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-4 space-y-1 mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                    isActive 
                      ? 'bg-[#6366f1] text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 space-y-2 mb-4">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium mt-4">
            <HelpCircle className="w-5 h-5 text-gray-400" /> Help
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
            <LogOut className="w-5 h-5 text-gray-400" /> Logout
          </button>
        </div>
      </aside>

    {isEditingProfile && (
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-6 w-96 shadow-xl border border-gray-100">
          <h3 className="font-bold text-lg mb-4 text-gray-900">Edit Profile Name</h3>
          <input 
            type="text" 
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-[#6366f1] focus:outline-none text-gray-900 bg-white"
            placeholder="Your Name"
          />
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => setIsEditingProfile(false)}
              className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-colors font-medium"
            >
              Save Name
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
