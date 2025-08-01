import React from 'react';
import { Home, Trophy, Calendar, BookOpen } from 'lucide-react';

interface NavigationProps {
  currentPage: 'main' | 'results' | 'schedule';
  onNavigate: (page: 'main' | 'results' | 'schedule') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    {
      id: 'main',
      label: 'الصفحة الرئيسية',
      icon: Home,
      gradient: 'from-green-500 to-emerald-600',
      hoverGradient: 'hover:from-green-600 hover:to-emerald-700'
    },
    {
      id: 'results',
      label: 'النتائج',
      icon: Trophy,
      gradient: 'from-blue-500 to-purple-600',
      hoverGradient: 'hover:from-blue-600 hover:to-purple-700'
    },
    {
      id: 'schedule',
      label: 'جدول الاختبارات',
      icon: Calendar,
      gradient: 'from-purple-500 to-pink-600',
      hoverGradient: 'hover:from-purple-600 hover:to-pink-700'
    }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Logo/Title section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">مسابقة المولد النبوي</h1>
              <p className="text-sm text-gray-600">الجامع الشرقي - دمليج</p>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>المسابقة نشطة</span>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as 'main' | 'results' | 'schedule')}
                className={`
                  group relative px-6 py-3 rounded-xl font-semibold text-sm md:text-base
                  transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                  ${isActive 
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                    : `bg-gray-100 text-gray-700 hover:bg-gray-200 ${item.hoverGradient} hover:text-white`
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${isActive ? 'animate-bounce-slow' : 'group-hover:animate-bounce'}`} />
                  <span>{item.label}</span>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full animate-pulse"></div>
                )}
                
                {/* Hover glow effect */}
                <div className={`
                  absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  bg-gradient-to-r ${item.gradient} blur-xl -z-10
                `}></div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};