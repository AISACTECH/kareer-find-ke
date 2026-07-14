import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, User, Cloud, Wifi, WifiOff } from 'lucide-react';
import { createPageUrl } from "@/utils";
import { base44 } from '@/api/base44Client';
import { useSyncManager } from '../components/SyncManager';

import ProgressIndicator from '../components/assessment/ProgressIndicator';
import AcademicStep from '../components/assessment/AcademicStep';
import HobbiesStep from '../components/assessment/HobbiesStep';
import PersonalityStep from '../components/assessment/PersonalityStep';
import InterestsStep from '../components/assessment/InterestsStep';
import AstrologyStep from '../components/assessment/AstrologyStep';

export default function Assessment() {
  const navigate = useNavigate();
  const { isOnline, addToSyncQueue, performSync } = useSyncManager();
  const [currentStep, setCurrentStep] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [assessmentData, setAssessmentData] = useState({
    academic_data: null,
    hobbies_background: null,
    personality_scores: null,
    interest_ratings: null,
    astrology_data: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load any existing draft assessment
  useEffect(() => {
    const draft = localStorage.getItem('pathfinder_assessment_draft');
    if (draft) {
      const parsed = JSON.parse(draft);
      if (parsed.student_name) {
        setStudentName(parsed.student_name);
      }
      if (parsed.academic_data) setAssessmentData((prev) => ({ ...prev, academic_data: parsed.academic_data }));
      if (parsed.hobbies_background) setAssessmentData((prev) => ({ ...prev, hobbies_background: parsed.hobbies_background }));
      if (parsed.personality_scores) setAssessmentData((prev) => ({ ...prev, personality_scores: parsed.personality_scores }));
      if (parsed.interest_ratings) setAssessmentData((prev) => ({ ...prev, interest_ratings: parsed.interest_ratings }));
      if (parsed.astrology_data) setAssessmentData((prev) => ({ ...prev, astrology_data: parsed.astrology_data }));
    }
  }, []);

  // Auto-save draft on data changes
  useEffect(() => {
    if (studentName || Object.values(assessmentData).some((v) => v !== null)) {
      const draft = {
        student_name: studentName,
        ...assessmentData,
        last_updated: new Date().toISOString()
      };
      localStorage.setItem('pathfinder_assessment_draft', JSON.stringify(draft));
    }
  }, [studentName, assessmentData]);

  const handleStartAssessment = () => {
    if (studentName.trim()) {
      setCurrentStep(1);
    }
  };

  const updateStepData = (key, data) => {
    setAssessmentData((prev) => ({
      ...prev,
      [key]: data
    }));
  };

  const handleComplete = async () => {
    setIsSubmitting(true);

    // Store assessment in local storage for offline use
    const fullAssessment = {
      student_name: studentName,
      ...assessmentData,
      completed: true,
      completed_date: new Date().toISOString()
    };

    localStorage.setItem('pathfinder_assessment', JSON.stringify(fullAssessment));

    // Clear draft
    localStorage.removeItem('pathfinder_assessment_draft');

    // Try to save to database if online
    if (isOnline) {
      try {
        await base44.entities.Assessment.create(fullAssessment);
        // Trigger sync to ensure data is saved
        performSync();
      } catch (error) {
        console.log('Failed to save to server, adding to sync queue');
        addToSyncQueue('assessment', 'create', fullAssessment);
      }
    } else {
      // Add to sync queue for later
      addToSyncQueue('assessment', 'create', fullAssessment);
    }

    setIsSubmitting(false);
    navigate(createPageUrl('Results'));
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Career Assessment
          </h1>
          <p className="text-slate-400 mt-1">
            {currentStep === 0 ? 'Let\'s start by getting to know you' : 'Complete all steps for personalized results'}
          </p>
        </div>

        {/* Progress */}
        {currentStep > 0 &&
        <ProgressIndicator currentStep={currentStep} />
        }

        {/* Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 0 &&
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-lg mx-auto">

              <Card className="border border-[#1e3a5f]/30 bg-[#0d1526] shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-[#1e3a5f]/20 border border-[#1e3a5f]/40 flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-[#d4a853]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome!</h2>
                    <p className="text-slate-400">
                      This assessment takes about 10-15 minutes and works completely offline.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        What is your full name?
                      </label>
                      <Input
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter name e.g Isaac Odiwuor"
                        className="h-12"
                        onKeyPress={(e) => e.key === 'Enter' && handleStartAssessment()}
                      />
                    </div>

                    <Button
                    onClick={handleStartAssessment}
                    disabled={!studentName.trim()}
                    className="w-full bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white h-12 rounded-xl">

                      Begin Assessment
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-[#0a0f1e] border border-[#1e3a5f]/30">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                      {isOnline ?
                    <>
                          <Wifi className="w-4 h-4 text-emerald-500" />
                          <span>Online - Your progress syncs automatically</span>
                        </> :

                    <>
                          <WifiOff className="w-4 h-4 text-gray-400" />
                          <span>Offline - Progress saved locally, will sync when online</span>
                        </>
                    }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          }

          {currentStep === 1 &&
          <AcademicStep
            key="academic"
            data={assessmentData.academic_data}
            onUpdate={(data) => updateStepData('academic_data', data)}
            onNext={() => setCurrentStep(2)} />

          }

          {currentStep === 2 &&
          <HobbiesStep
            key="hobbies"
            data={assessmentData.hobbies_background}
            onUpdate={(data) => updateStepData('hobbies_background', data)}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)} />

          }

          {currentStep === 3 &&
          <PersonalityStep
            key="personality"
            data={assessmentData.personality_scores}
            onUpdate={(data) => updateStepData('personality_scores', data)}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)} />

          }

          {currentStep === 4 &&
          <InterestsStep
            key="interests"
            data={assessmentData.interest_ratings}
            onUpdate={(data) => updateStepData('interest_ratings', data)}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)} />

          }

          {currentStep === 5 &&
          <AstrologyStep
            key="astrology"
            data={assessmentData.astrology_data}
            onUpdate={(data) => updateStepData('astrology_data', data)}
            onNext={handleComplete}
            onBack={() => setCurrentStep(4)} />

          }
        </AnimatePresence>
      </div>
    </div>);

}
