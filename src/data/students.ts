import { Student } from '../types';

export const studentsData: Student[] = [
  { id: 1001, name: "أحمد محمد علي", category: "المرحله الثانويه بالاطفال", grade: 95 },
  { id: 1002, name: "فاطمة إبراهيم", category: "المرحله الثانويه بالاطفال", grade: 88 },
  { id: 1003, name: "عمر حسن", category: "المرحله الثانويه بالاطفال", grade: 92 },
  { id: 1004, name: "نور الدين محمود", category: "المرحله الثانويه بالاطفال", grade: 85 },
  { id: 1005, name: "ريم عبدالله", category: "المرحله الثانويه بالاطفال", grade: 90 },
  
  { id: 2001, name: "يوسف الأحمد", category: "المرحله المتوسطه الطلاب", grade: 97 },
  { id: 2002, name: "مريم سالم", category: "المرحله المتوسطه الطلاب", grade: 89 },
  { id: 2003, name: "حسام النجار", category: "المرحله المتوسطه الطلاب", grade: 94 },
  { id: 2004, name: "ليلى الخطيب", category: "المرحله المتوسطه الطلاب", grade: 91 },
  { id: 2005, name: "طارق عيسى", category: "المرحله المتوسطه الطلاب", grade: 86 }
];

// Add ranks to students based on their grades
export const rankedStudents = studentsData
  .sort((a, b) => b.grade - a.grade)
  .map((student, index) => ({
    ...student,
    rank: index + 1
  }));