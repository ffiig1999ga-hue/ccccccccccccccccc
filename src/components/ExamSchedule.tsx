import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BookOpen, Users, ChevronRight, Timer, Bell } from 'lucide-react';

interface ExamEvent {
  id: number;
  date: Date;
  day: string;
  title: string;
  description: string;
  parts: string[];
  category: string;
  color: string;
}

export const ExamSchedule: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});

  // حساب التواريخ بناءً على الجمعة القادمة
  const getNextFriday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    return nextFriday;
  };

  const nextFriday = getNextFriday();
  
  const examEvents: ExamEvent[] = [
    {
      id: 1,
      date: nextFriday,
      day: 'الجمعة',
      title: 'تسميع حفظ ثلاثة أجزاء',
      description: 'اختبار تسميع للطلاب الذين حفظوا ثلاثة أجزاء من القرآن الكريم',
      parts: ['الجزء الأول', 'الجزء الثاني', 'الجزء الثالث'],
      category: 'تسميع',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      date: new Date(nextFriday.getTime() + 24 * 60 * 60 * 1000),
      day: 'السبت',
      title: 'اختبار الجزء الخامس والثامن',
      description: 'اختبارات حفظ للجزء الخامس والجزء الثامن من القرآن الكريم',
      parts: ['الجزء الخامس', 'الجزء الثامن'],
      category: 'اختبار',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 3,
      date: new Date(nextFriday.getTime() + 7 * 24 * 60 * 60 * 1000),
      day: 'الجمعة',
      title: 'اختبار الأجزاء المتقدمة',
      description: 'اختبارات للجزء العاشر والخامس عشر والعشرون',
      parts: ['الجزء العاشر', 'الجزء الخامس عشر', 'الجزء العشرون'],
      category: 'اختبار',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 4,
      date: new Date(nextFriday.getTime() + 8 * 24 * 60 * 60 * 1000),
      day: 'السبت',
      title: 'اختبار الأجزاء الأخيرة',
      description: 'اختبارات للجزء الخامس والعشرون والجزء الثلاثون',
      parts: ['الجزء الخامس والعشرون', 'الجزء الثلاثون'],
      category: 'اختبار',
      color: 'from-orange-500 to-red-600'
    }
  ];

  // حساب الوقت المتبقي لكل حدث
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const newTimeLeft: { [key: number]: string } = {};

      examEvents.forEach(event => {
        const eventTime = event.date.getTime();
        const difference = eventTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          if (days > 0) {
            newTimeLeft[event.id] = `${days} يوم و ${hours} ساعة`;
          } else if (hours > 0) {
            newTimeLeft[event.id] = `${hours} ساعة و ${minutes} دقيقة`;
          } else if (minutes > 0) {
            newTimeLeft[event.id] = `${minutes} دقيقة و ${seconds} ثانية`;
          } else {
            newTimeLeft[event.id] = `${seconds} ثانية`;
          }
        } else {
          newTimeLeft[event.id] = 'انتهى الوقت';
        }
      });

      setTimeLeft(newTimeLeft);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUrgencyClass = (eventId: number) => {
    const timeString = timeLeft[eventId];
    if (!timeString || timeString === 'انتهى الوقت') return 'text-red-600 animate-pulse';
    if (timeString.includes('يوم') && parseInt(timeString) <= 2) return 'text-orange-600 animate-bounce';
    if (timeString.includes('ساعة') && !timeString.includes('يوم')) return 'text-red-600 animate-pulse';
    return 'text-green-600';
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-slideInDown">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Calendar className="w-12 h-12 text-blue-600 animate-bounce-slow" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text-animated">
              جدول مواعيد الاختبارات
            </h1>
            <Timer className="w-12 h-12 text-purple-600 animate-spin-slow" />
          </div>
          <p className="text-xl text-gray-600 mb-6">
            مواعيد اختبارات مسابقة المولد النبوي الشريف بالجامع الشرقي
          </p>
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-xl p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-amber-800">
              <Bell className="w-5 h-5 animate-ring" />
              <span className="font-semibold">تنبيه: تأكد من الحضور قبل الموعد بـ 15 دقيقة</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute right-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 rounded-full animate-pulse-glow"></div>

            {examEvents.map((event, index) => (
              <div key={event.id} className="relative mb-12 animate-slideInRight" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Timeline dot */}
                <div className="absolute right-6 w-5 h-5 bg-white border-4 border-blue-500 rounded-full animate-pulse-dot shadow-lg"></div>
                
                {/* Event card */}
                <div className="mr-16 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover-lift">
                  {/* Card header */}
                  <div className={`bg-gradient-to-r ${event.color} text-white p-6`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{event.title}</h3>
                          <p className="text-white/90">{event.day} - {formatDate(event.date)}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="bg-white/20 px-4 py-2 rounded-full">
                          <span className="text-sm font-semibold">{event.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 text-lg">{event.description}</p>
                    
                    {/* Parts list */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        الأجزاء المطلوبة:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {event.parts.map((part, partIndex) => (
                          <span
                            key={partIndex}
                            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold animate-fadeInScale"
                            style={{ animationDelay: `${partIndex * 0.1}s` }}
                          >
                            {part}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Countdown */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600 animate-tick" />
                          <span className="font-semibold text-gray-700">الوقت المتبقي:</span>
                        </div>
                        <div className={`text-xl font-bold ${getUrgencyClass(event.id)}`}>
                          {timeLeft[event.id] || 'جاري الحساب...'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-12 animate-fadeInScale">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 border border-green-300 rounded-xl p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-green-800 mb-2">ملاحظات مهمة</h3>
            <ul className="text-green-700 space-y-2 text-right">
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                يرجى الحضور قبل الموعد المحدد بـ 15 دقيقة على الأقل
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                إحضار المصحف الشريف والأدوات اللازمة
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                في حالة وجود أي استفسار، يرجى التواصل مع إدارة المسجد
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};