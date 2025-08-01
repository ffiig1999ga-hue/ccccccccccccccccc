import React from 'react';
import { Users, Trophy, TrendingUp, Target } from 'lucide-react';
import { ContestStats } from '../types';

interface StatsSectionProps {
  stats: ContestStats;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          إحصائيات المسابقة
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{stats.totalStudents}</h3>
            <p className="text-gray-600">إجمالي المشاركين</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{stats.topGrade}</h3>
            <p className="text-gray-600">أعلى درجة</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{stats.averageGrade}</h3>
            <p className="text-gray-600">المتوسط العام</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{stats.categories.length}</h3>
            <p className="text-gray-600">عدد الفئات</p>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">الفئات المشاركة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.categories.map((category, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl text-center">
                <p className="font-semibold text-gray-800">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};