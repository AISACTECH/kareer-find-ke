import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from "@/utils";
import { GraduationCap, Home, ClipboardList, Trophy, Bookmark, Shield } from 'lucide-react';
import { SyncProvider } from './components/SyncManager';
import CareerAdvisorWidget from './components/agent/CareerAdvisorWidget';
import ThemeToggle from './components/ThemeToggle';

export default function Layout({ children, currentPageName }) {
  const isHomePage = currentPageName === 'Home';

  const navItems = [
  { name: 'Home', icon: Home, page: 'Home' },
  { name: 'Assessment', icon: ClipboardList, page: 'Assessment' },
  { name: 'Results', icon: Trophy, page: 'Results' },
  { name: 'Saved', icon: Bookmark, page: 'SavedInstitutions' },
  { name: 'KUCCPS', icon: Shield, page: 'KuppsPortal' }];


  return (
    <SyncProvider>
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Navigation - Hidden on print */}
      <nav className="bg-[#0d1526] border-b border-[#1e3a5f]/50 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1e3a5f] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#d4a853]" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-[#1e3a5f] text-lg">PathFinder</span>
                <span className="text-[#d4a853] font-bold text-lg ml-1">KE</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />
              {navItems.map((item) => {
                  const isActive = currentPageName === item.page;
                  return (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)} className="bg-[#1e3a5f] text-white px-3 py-2 text-2xl font-extrabold rounded-xl flex items-center gap-2 sm:px-4 transition-all">






                    <item.icon className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">{item.name}</span>
                  </Link>);

                })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Mobile Bottom Navigation - Only on non-home pages */}
      {!isHomePage &&
        <div className="fixed bottom-0 left-0 right-0 bg-[#0d1526] border-t border-[#1e3a5f]/50 py-2 px-4 sm:hidden print:hidden mb-14">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl ${
                  isActive ? 'text-[#d4a853]' : 'text-slate-400'}`
                  }>

                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>);

            })}
          </div>
        </div>
        }
    </div>
      <CareerAdvisorWidget />
    </SyncProvider>);

}
