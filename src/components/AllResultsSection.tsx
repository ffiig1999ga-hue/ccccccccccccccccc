import React, { useState } from 'react';
import { Student } from '../types';
import { ChevronDown, ChevronUp, List, Filter } from 'lucide-react';
import { getCategoryColor, getGradeColor } from '../utils/contestStats';

interface AllResultsSectionProps {
  students: Student[];
}

export const AllResultsSection: React.FC<AllResultsSectionProps> = ({ students }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [...new Set(students.map(s => s.category))];
  const filteredStudents = selectedCategory === 'all' 
    ? students 
    : students.filter(s => s.category === selectedCategory);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-3 mx-auto font-semibold text-lg"
          >
            <List className="w-6 h-6" />
            عرض جميع النتائج
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {isExpanded && (
          <div className="animate-fadeIn">
            {/* Filter section */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex items-center gap-4 justify-center flex-wrap">
                <Filter className="w-5 h-5 text-gray-600" />
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  جميع الفئات
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedCategory === category 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Results table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-center">الترتيب</th>
                      <th className="px-6 py-4 text-center">الاسم</th>
                      <th className="px-6 py-4 text-center">رقم الطالب</th>
                      <th className="px-6 py-4 text-center">الفئة</th>
                      <th className="px-6 py-4 text-center">الدرجة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.slice(0, 50).map((student, index) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                            student.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                            student.rank === 2 ? 'bg-gray-100 text-gray-800' :
                            student.rank === 3 ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {student.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-800">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600">
                          {student.id}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(student.category)}`}>
                            {student.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-lg font-bold text-lg ${getGradeColor(student.grade)}`}>
                            {student.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredStudents.length > 50 && (
                <div className="bg-gray-50 p-4 text-center text-gray-600">
                  عرض أول 50 نتيجة من أصل {filteredStudents.length} نتيجة
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};