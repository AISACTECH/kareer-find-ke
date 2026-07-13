import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Brain, ArrowRight, ArrowLeft } from 'lucide-react';

const personalityAxes = [
  {
    id: 'practical_theoretical',
    leftLabel: 'Practical',
    rightLabel: 'Theoretical',
    leftDesc: 'I prefer hands-on work and making things',
    rightDesc: 'I prefer thinking about ideas and concepts',
    leftEmoji: '🔨',
    rightEmoji: '💭'
  },
  {
    id: 'people_task',
    leftLabel: 'People-Oriented',
    rightLabel: 'Task-Oriented',
    leftDesc: 'I energize from working with others',
    rightDesc: 'I focus best when working independently',
    leftEmoji: '👥',
    rightEmoji: '📋'
  },
  {
    id: 'structured_flexible',
    leftLabel: 'Structured',
    rightLabel: 'Flexible',
    leftDesc: 'I like clear plans and routines',
    rightDesc: 'I adapt easily and enjoy variety',
    leftEmoji: '📊',
    rightEmoji: '🌊'
  },
  {
    id: 'risk_stable',
    leftLabel: 'Risk-Taking',
    rightLabel: 'Stability-Seeking',
    leftDesc: 'I enjoy challenges and new ventures',
    rightDesc: 'I prefer security and proven paths',
    leftEmoji: '🚀',
    rightEmoji: '🏠'
  }
];

const scenarioQuestions = [
  {
    id: 'q1',
    question: 'When faced with a problem, you usually:',
    options: [
      { label: 'Jump in and start experimenting', score: { practical_theoretical: -20 } },
      { label: 'Research and plan before acting', score: { practical_theoretical: 20 } }
    ]
  },
  {
    id: 'q2',
    question: 'In a group project, you prefer to:',
    options: [
      { label: 'Lead discussions and coordinate the team', score: { people_task: -20 } },
      { label: 'Focus on completing your assigned tasks well', score: { people_task: 20 } }
    ]
  },
  {
    id: 'q3',
    question: 'When your plans suddenly change:',
    options: [
      { label: 'I feel stressed and try to stick to the original plan', score: { structured_flexible: -20 } },
      { label: 'I adapt quickly and see new opportunities', score: { structured_flexible: 20 } }
    ]
  },
  {
    id: 'q4',
    question: 'For your future career, you would rather:',
    options: [
      { label: 'Start my own business with higher risk but more reward', score: { risk_stable: -20 } },
      { label: 'Get a stable job with steady income and growth', score: { risk_stable: 20 } }
    ]
  }
];

export default function PersonalityStep({ data, onUpdate, onNext, onBack }) {
  const [personalityData, setPersonalityData] = useState(data || {
    axes: {
      practical_theoretical: 50,
      people_task: 50,
      structured_flexible: 50,
      risk_stable: 50
    },
    answers: {}
  });

  const handleAxisChange = (axisId, value) => {
    setPersonalityData(prev => ({
      ...prev,
      axes: { ...prev.axes, [axisId]: value[0] }
    }));
  };

  const handleQuestionAnswer = (questionId, option) => {
    setPersonalityData(prev => {
      const newAxes = { ...prev.axes };
      Object.entries(option.score).forEach(([axis, adjustment]) => {
        newAxes[axis] = Math.max(0, Math.min(100, newAxes[axis] + adjustment));
      });
      return {
        ...prev,
        axes: newAxes,
        answers: { ...prev.answers, [questionId]: option.label }
      };
    });
  };

  const handleNext = () => {
    onUpdate(personalityData);
    onNext();
  };

  const answeredQuestions = Object.keys(personalityData.answers).length;
  const isValid = answeredQuestions >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Personality Assessment</h2>
        <p className="text-gray-600">Understanding your work style helps us find careers that suit you best</p>
      </div>

      {/* Scenario Questions */}
      <Card className="border-0 shadow-lg mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold text-[#1e3a5f] mb-4">Quick Scenarios</h3>
          <div className="space-y-6">
            {scenarioQuestions.map((q, idx) => (
              <div key={q.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <p className="font-medium text-gray-700 mb-3">{idx + 1}. {q.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((option, optIdx) => (
                    <motion.button
                      key={optIdx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleQuestionAnswer(q.id, option)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        personalityData.answers[q.id] === option.label
                          ? 'border-[#1e3a5f] bg-[#1e3a5f]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personality Sliders */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-semibold text-[#1e3a5f] mb-2">Fine-tune Your Profile</h3>
          <p className="text-sm text-gray-500 mb-6">Adjust the sliders to better reflect your preferences</p>
          
          <div className="space-y-8">
            {personalityAxes.map(axis => (
              <div key={axis.id}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{axis.leftEmoji}</span>
                    <div>
                      <span className="font-medium text-[#1e3a5f]">{axis.leftLabel}</span>
                      <p className="text-xs text-gray-500">{axis.leftDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <span className="font-medium text-[#1e3a5f]">{axis.rightLabel}</span>
                      <p className="text-xs text-gray-500">{axis.rightDesc}</p>
                    </div>
                    <span className="text-xl">{axis.rightEmoji}</span>
                  </div>
                </div>
                <Slider
                  value={[personalityData.axes[axis.id]]}
                  onValueChange={(value) => handleAxisChange(axis.id, value)}
                  max={100}
                  step={1}
                  className="py-2"
                />
              </div>
            ))}
          </div>

          <div className="pt-6 flex justify-between">
            <Button 
              variant="outline"
              onClick={onBack}
              className="px-6 h-12 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
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
