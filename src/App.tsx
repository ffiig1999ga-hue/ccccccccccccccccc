import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExamSchedule } from './components/ExamSchedule';
import { SearchSection } from './components/SearchSection';
import { ResultCard } from './components/ResultCard';
import { StatsSection } from './components/StatsSection';
import { AllResultsSection } from './components/AllResultsSection';
import { Footer } from './components/Footer';
import { rankedStudents } from './data/students';
import { calculateStats } from './utils/contestStats';
import { Student } from './types';

function App() {
  const [searchResult, setSearchResult] = useState<Student | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [currentPage, setCurrentPage] = useState<'results' | 'schedule'>('results');
  
  const stats = calculateStats(rankedStudents);

  const handleSearchResult = (student: Student | null) => {
    setSearchResult(student);
    setSearchAttempted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Navigation */}
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCurrentPage('results')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                currentPage === 'results'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              النتائج
            </button>
            <button
              onClick={() => setCurrentPage('schedule')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                currentPage === 'schedule'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              جدول الاختبارات
            </button>
          </div>
        </div>
      </nav>
      
      {currentPage === 'results' ? (
        <>
          <SearchSection 
            students={rankedStudents} 
            onResult={handleSearchResult}
          />
          
          {/* Search Results */}
          {searchAttempted && (
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                {searchResult ? (
                  <ResultCard student={searchResult} />
                ) : (
                  <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-lg">
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      لم يتم العثور على نتيجة
                    </h3>
                    <p className="text-gray-600">
                      تأكد من كتابة الاسم أو الرقم بشكل صحيح وحاول مرة أخرى
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
          
          <StatsSection stats={stats} />
          <AllResultsSection students={rankedStudents} />
        </>
      ) : (
        <ExamSchedule />
      )}
      
      <Footer />
    </div>
  );
}

export default App;