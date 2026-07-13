import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, ArrowRight } from 'lucide-react';

const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'];
const meanGrades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'];

const subjects = [
  { id: 'mathematics', name: 'Mathematics', icon: '📐' },
  { id: 'english', name: 'English', icon: '📚' },
  { id: 'kiswahili', name: 'Kiswahili', icon: '🗣️' },
  { id: 'physics', name: 'Physics', icon: '⚡' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
  { id: 'biology', name: 'Biology', icon: '🧬' },
  { id: 'history', name: 'History & Government', icon: '📜' },
  { id: 'geography', name: 'Geography', icon: '🌍' },
  { id: 'cre', name: 'CRE / IRE / HRE', icon: '📖' },
  { id: 'business', name: 'Business Studies', icon: '💼' },
  { id: 'agriculture', name: 'Agriculture', icon: '🌾' },
  { id: 'computer', name: 'Computer Studies', icon: '💻' },
  { id: 'literature', name: 'Literature in English', icon: '📖' },
  { id: 'french', name: 'French / German / Arabic', icon: '🌐' },
  { id: 'art', name: 'Art & Design', icon: '🎨' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'home_science', name: 'Home Science', icon: '🍳' },
  { id: 'aviation', name: 'Aviation Technology', icon: '✈️' }
];

export default function AcademicStep({ data, onUpdate, onNext }) {
  const [academicData, setAcademicData] = useState(data || {
    examType: '',
    meanGrade: '',
    subjects: {}
  });

  const handleSubjectChange = (subjectId, grade) => {
    setAcademicData(prev => {
      const newSubjects = { ...prev.subjects };
      if (grade === 'none') {
        delete newSubjects[subjectId];
      } else {
        newSubjects[subjectId] = grade;
      }
      return { ...prev, subjects: newSubjects };
    });
  };

  const handleNext = () => {
    onUpdate(academicData);
    onNext();
  };

  const isValid = academicData.examType && academicData.meanGrade && 
    Object.keys(academicData.subjects).length >= 4;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1e3a5f]/10 mb-4">
          <GraduationCap className="w-8 h-8 text-[#1e3a5f]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Academic Performance</h2>
        <p className="text-gray-600">Tell us about your KCSE or CBE results</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6 space-y-6">
          {/* Exam Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Examination Type
              </Label>
              <Select 
                value={academicData.examType} 
                onValueChange={(value) => setAcademicData(prev => ({ ...prev, examType: value }))}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kcse">KCSE (8-4-4)</SelectItem>
                  <SelectItem value="cbe">CBE (Competency Based)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Overall Mean Grade
              </Label>
              <Select 
                value={academicData.meanGrade} 
                onValueChange={(value) => setAcademicData(prev => ({ ...prev, meanGrade: value }))}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select mean grade" />
                </SelectTrigger>
                <SelectContent>
                  {meanGrades.map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subject Grades */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Subject Grades (select at least 4 subjects you took)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subjects.map(subject => (
                <div 
                  key={subject.id}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    academicData.subjects[subject.id] 
                      ? 'border-[#d4a853] bg-[#d4a853]/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{subject.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                  </div>
                  <Select 
                    value={academicData.subjects[subject.id] || ''} 
                    onValueChange={(value) => handleSubjectChange(subject.id, value)}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not taken</SelectItem>
                      {grades.map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
              onClick={handleNext}
              disabled={!isValid}
              className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white px-8 h-12 rounded-xl"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
