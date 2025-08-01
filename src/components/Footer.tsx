import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4">مسابقه المولد النبوي الشريف</h3>
            <p className="text-gray-300 mb-4">
              نسعى لتشجيع الطلاب على حفظ وتلاوة القرآن الكريم وتعلم تعاليم الدين الإسلامي
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-red-400">
              <Heart className="w-5 h-5" />
              <span className="text-sm">صنع بحب لطلاب القرآن الكريم</span>
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:tarekaboya2019@gmail.com" className="hover:text-white transition-colors">
                  tarekaboya2019@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+966111234567" className="hover:text-white transition-colors">
                    +966 11 123 4567
                  </a>
                  <a href="tel:+01559181558" className="hover:text-white transition-colors">
                    +0155 918 1558
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                <a 
                  href="https://maps.app.goo.gl/BA3xbuvekc8kgKaMA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  الجامع الشرقي، دمليج، منوف، المنوفية
                </a>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">روابط مهمة</h4>
            <div className="space-y-2">
              <div>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">قوانين المسابقة</a>
              </div>
              <div>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">الأسئلة الشائعة</a>
              </div>
              <div>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">اتصل بنا</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 مسابقه المولد النبوي الشريف بالجامع الشرقي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};