import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, BookOpen, Sparkles, FileText } from 'lucide-react';
import { KCSE_GRADES } from '@/lib/kuccpsEngine';

const SUBJECTS = [
  { key: 'mathematics', label: 'Mathematics', icon: '🔢' },
  { key: 'english', label: 'English', icon: '📖' },
  { key: 'kiswahili', label: 'Kiswahili', icon: '🗣️' },
  { key: 'physics', label: 'Physics', icon: '⚛️' },
  { key: 'chemistry', label: 'Chemistry', icon: '🧪' },
  { key: 'biology', label: 'Biology', icon: '🧬' },
  { key: 'geography', label: 'Geography', icon: '🌍' },
  { key: 'history', label: 'History', icon: '📜' },
  { key: 'cre', label: 'CRE', icon: '✝️' },
  { key: 'computer', label: 'Computer Studies', icon: '💻' },
  { key: 'business', label: 'Business Studies', icon: '📊' },
  { key: 'literature', label: 'Literature', icon: '📚' }
];

const CATEGORIES = ['Health', 'Engineering', 'Technology', 'Business', 'Law', 'Education', 'Media', 'Agriculture', 'TVET'];

export default function GradeInputForm({ onCalculate, initialData, studentName, onStudentName }) {
  const [grades, setGrades] = useState({});
  const [preferredCategory, setPreferredCategory] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialData?.academic_data?.subjects) {
      setGrades(initialData.academic_data.subjects);
    }
    if (initialData?.student_name) {
      setName(initialData.student_name);
      onStudentName?.(initialData.student_name);
    }
  }, [initialData]);

  useEffect(() => {
    if (studentName !== undefined) {
      onStudentName?.(name);
    }
  }, [name]);

  const handleGradeChange = (subject, grade) => {
    setGrades(prev => ({ ...prev, [subject]: grade }));
  };

  const handleSubmit = () => {
    onCalculate({ subjects: grades, preferredCategory, studentName: name });
  };

  const filledCount = Object.values(grades).filter(v => v).length;

  return (
    <Card className="border border-[#1e3a5f]/40 bg-[#0d1526] shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-[#d4a853]" />
          <h3 className="font-semibold text-white text-base">Academic Requirements</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Enter your KCSE subject grades. The system reads these to calculate cluster points and filter eligible courses.
        </p>

        {/* Instructions Banner */}
        <div className="mb-4 p-3 rounded-xl bg-[#d4a853]/10 border border-[#d4a853]/20 flex gap-2">
          <FileText className="w-4 h-4 text-[#d4a853] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <p><strong className="text-[#d4a853]">Instructions:</strong></p>
            <p>• Select the grade you scored in each subject</p>
            <p>• At least 4 subjects are needed for cluster calculation</p>
            <p>• Choose your preferred career category for better matching</p>
          </div>
        </div>

        {/* Student Name */}
        <div className="mb-4">
          <Label className="text-sm text-slate-300 mb-1.5 block">Student Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
            className="bg-[#0a0f1e] border-[#1e3a5f]/50 text-white"
          />
        </div>

        {/* Preferred Category */}
        <div className="mb-4">
          <Label className="text-sm text-slate-300 mb-1.5 block">Preferred Career Category</Label>
          <Select value={preferredCategory} onValueChange={setPreferredCategory}>
            <SelectTrigger className="bg-[#0a0f1e] border-[#1e3a5f]/50 text-white">
              <SelectValue placeholder="Select preferred field" />
            </SelectTrigger>
            <SelectContent className="bg-[#0d1526] border-[#1e3a5f]/50">
              {CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat} className="text-white hover:bg-[#1e3a5f]/40">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject Grades Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {SUBJECTS.map(subject => (
            <div key={subject.key} className="flex flex-col gap-1">
              <label className="text-xs text-slate-400 flex items-center gap-1">
                <span>{subject.icon}</span>
                {subject.label}
              </label>
              <Select
                value={grades[subject.key] || ''}
                onValueChange={(val) => handleGradeChange(subject.key, val)}
              >
                <SelectTrigger className="bg-[#0a0f1e] border-[#1e3a5f]/50 text-white h-9 text-sm">
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent className="bg-[#0d1526] border-[#1e3a5f]/50 max-h-60">
                  {KCSE_GRADES.map(grade => (
                    <SelectItem key={grade} value={grade} className="text-white hover:bg-[#1e3a5f]/40">
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-slate-400">{filledCount} subjects entered</span>
          {filledCount >= 4 && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Ready to calculate
            </span>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={filledCount < 4}
          className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white disabled:opacity-40"
        >
          <GraduationCap className="w-4 h-4 mr-2" />
          Calculate Cluster Points
        </Button>
      </CardContent>
    </Card>
  );
}
