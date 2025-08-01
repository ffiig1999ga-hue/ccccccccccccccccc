import React, { useState } from 'react';
import { Search, User, Hash } from 'lucide-react';
import { Student } from '../types';

interface SearchSectionProps {
  students: Student[];
  onResult: (student: Student | null) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ students, onResult }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'id'>('name');

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      onResult(null);
      return;
    }

    const student = students.find(s => {
      if (searchType === 'name') {
        return s.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
      } else {
        return s.id.toString() === searchTerm.trim();
      }
    });

    onResult(student || null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-white py-12 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            البحث عن النتيجة
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl shadow-md">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="flex rounded-lg overflow-hidden border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
                  <div className="bg-gray-50 px-4 py-3 flex items-center">
                    {searchType === 'name' ? <User className="w-5 h-5 text-gray-500" /> : <Hash className="w-5 h-5 text-gray-500" />}
                  </div>
                  <input
                    type={searchType === 'id' ? 'number' : 'text'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={searchType === 'name' ? 'ادخل اسم الطالب...' : 'ادخل رقم الطالب...'}
                    className="flex-1 px-4 py-3 text-right focus:outline-none"
                    dir="rtl"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
              >
                <Search className="w-5 h-5" />
                بحث
              </button>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSearchType('name')}
                className={`px-4 py-2 rounded-full transition-all ${
                  searchType === 'name' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                البحث بالاسم
              </button>
              <button
                onClick={() => setSearchType('id')}
                className={`px-4 py-2 rounded-full transition-all ${
                  searchType === 'id' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                البحث برقم الطالب
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};