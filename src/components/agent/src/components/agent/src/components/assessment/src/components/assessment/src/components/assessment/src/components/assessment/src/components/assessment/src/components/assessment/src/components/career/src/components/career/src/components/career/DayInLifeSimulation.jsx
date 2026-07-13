import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Sun, Coffee, Briefcase, Users, FileText, 
  Phone, CheckCircle, AlertTriangle, Star, ArrowRight,
  RotateCcw, Trophy, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Day in the life scenarios
const careerSimulations = {
  software_developer: {
    title: 'Software Developer',
    icon: '💻',
    intro: "Welcome to your day as a Software Developer at a tech company in Nairobi. You'll face real decisions that developers make daily.",
    scenarios: [
      {
        id: 1,
        time: '8:00 AM',
        icon: Coffee,
        situation: "You arrive at work. Your team uses Slack for communication. You have 15 unread messages and 3 code review requests waiting.",
        question: "What do you prioritize first?",
        options: [
          { text: "Check Slack messages to stay updated", score: 2, feedback: "Good choice! Staying informed helps you plan your day." },
          { text: "Start coding immediately on your task", score: 1, feedback: "Eager to work! But you might miss important updates." },
          { text: "Review the pending code reviews", score: 3, feedback: "Excellent! Unblocking teammates first shows great teamwork." }
        ]
      },
      {
        id: 2,
        time: '10:30 AM',
        icon: AlertTriangle,
        situation: "A production bug is reported! Users can't complete payments. Your manager asks if you can investigate.",
        question: "How do you respond?",
        options: [
          { text: "Drop everything and start debugging", score: 3, feedback: "Great urgency! Production issues need immediate attention." },
          { text: "Finish your current task first", score: 0, feedback: "Hmm, production bugs usually can't wait..." },
          { text: "Ask for more details before investigating", score: 2, feedback: "Smart! But time is critical with payment issues." }
        ]
      },
      {
        id: 3,
        time: '2:00 PM',
        icon: Users,
        situation: "Sprint planning meeting. The product manager proposes a feature that seems technically complex and risky.",
        question: "What's your approach?",
        options: [
          { text: "Stay quiet and accept the requirement", score: 0, feedback: "Your technical input is valuable - share it!" },
          { text: "Explain the risks and propose alternatives", score: 3, feedback: "Perfect! Good developers communicate technical concerns." },
          { text: "Say it's impossible to build", score: 1, feedback: "Be constructive - there's usually a way with tradeoffs." }
        ]
      },
      {
        id: 4,
        time: '4:30 PM',
        icon: FileText,
        situation: "You finished a complex feature. Time to write documentation.",
        question: "How do you approach documentation?",
        options: [
          { text: "Skip it - the code is self-explanatory", score: 0, feedback: "Future you (and teammates) will regret this!" },
          { text: "Write basic comments in the code", score: 2, feedback: "Good start, but consider future maintainers." },
          { text: "Document thoroughly with examples", score: 3, feedback: "Excellent! This saves hours of confusion later." }
        ]
      }
    ],
    summary: {
      high: "You'd make an excellent developer! Your decision-making shows strong technical judgment and teamwork skills.",
      medium: "You have good instincts for software development. Keep learning about prioritization and communication.",
      low: "Software development might be challenging for you. Consider if you enjoy problem-solving and teamwork."
    }
  },
  doctor: {
    title: 'Medical Doctor',
    icon: '🩺',
    intro: "You're a junior doctor at a county hospital. Today will test your medical knowledge, ethics, and people skills.",
    scenarios: [
      {
        id: 1,
        time: '7:00 AM',
        icon: Sun,
        situation: "Morning ward rounds. A patient's family is angry about waiting too long for test results.",
        question: "How do you handle this?",
        options: [
          { text: "Apologize and blame the lab", score: 1, feedback: "Never blame colleagues - it undermines trust." },
          { text: "Listen empathetically and follow up on the results", score: 3, feedback: "Perfect! Empathy and action solve most complaints." },
          { text: "Tell them to be patient", score: 0, feedback: "This could escalate the situation further." }
        ]
      },
      {
        id: 2,
        time: '10:00 AM',
        icon: AlertTriangle,
        situation: "Emergency! A road accident victim arrives. Multiple injuries, unconscious, no family present.",
        question: "What's your first priority?",
        options: [
          { text: "Wait for family consent before treatment", score: 0, feedback: "In emergencies, saving life comes first." },
          { text: "Assess ABCs (Airway, Breathing, Circulation)", score: 3, feedback: "Correct! Follow emergency protocols." },
          { text: "Order all possible tests immediately", score: 1, feedback: "Stabilize first, then investigate systematically." }
        ]
      },
      {
        id: 3,
        time: '1:00 PM',
        icon: Phone,
        situation: "A wealthy patient offers you 'appreciation money' to see them faster than others in the queue.",
        question: "What do you do?",
        options: [
          { text: "Accept - it's just appreciation", score: 0, feedback: "This violates medical ethics and equity principles." },
          { text: "Politely decline and explain the queue system", score: 3, feedback: "Excellent! Integrity is non-negotiable in medicine." },
          { text: "Report them to administration", score: 2, feedback: "Good ethics, but education might work better first." }
        ]
      },
      {
        id: 4,
        time: '6:00 PM',
        icon: FileText,
        situation: "End of shift, but a colleague hasn't arrived for handover. A patient needs monitoring.",
        question: "What do you do?",
        options: [
          { text: "Leave detailed notes and go home", score: 1, feedback: "Patient safety requires proper handover." },
          { text: "Stay until proper handover is done", score: 3, feedback: "Correct! Patient continuity of care is paramount." },
          { text: "Ask a nurse to handle it", score: 0, feedback: "Doctor responsibilities can't be delegated this way." }
        ]
      }
    ],
    summary: {
      high: "You demonstrate excellent clinical judgment and ethics! Medicine could be your calling.",
      medium: "You show promise but need to develop stronger emergency response and ethical decision-making.",
      low: "The medical field's demands might not align with your natural instincts. Consider what draws you to healthcare."
    }
  },
  entrepreneur: {
    title: 'Entrepreneur',
    icon: '🚀',
    intro: "You're running an early-stage startup in Nairobi. Today brings challenges that test your business instincts.",
    scenarios: [
      {
        id: 1,
        time: '8:00 AM',
        icon: Coffee,
        situation: "You have KES 500,000 left in the bank. Enough for 2 months. An investor wants to meet today.",
        question: "How do you prepare?",
        options: [
          { text: "Focus on how much money you need", score: 1, feedback: "Investors invest in vision, not just funding needs." },
          { text: "Prepare metrics, traction, and growth story", score: 3, feedback: "Perfect! Data-driven pitching wins investors." },
          { text: "Wing it - you know your business", score: 0, feedback: "Always prepare! Investors can tell when you haven't." }
        ]
      },
      {
        id: 2,
        time: '11:00 AM',
        icon: Users,
        situation: "Your best developer wants a 50% salary increase or they'll leave for Safaricom.",
        question: "What's your response?",
        options: [
          { text: "Match their demands immediately", score: 1, feedback: "Consider if this is sustainable for your startup." },
          { text: "Negotiate with equity and future prospects", score: 3, feedback: "Smart! Align their success with company success." },
          { text: "Let them leave - no one is irreplaceable", score: 1, feedback: "Losing key talent can set startups back significantly." }
        ]
      },
      {
        id: 3,
        time: '2:00 PM',
        icon: AlertTriangle,
        situation: "A big potential customer wants you to customize your product significantly for them.",
        question: "How do you handle this?",
        options: [
          { text: "Say yes to everything they want", score: 1, feedback: "Be careful - custom work can distract from your core product." },
          { text: "Evaluate if it aligns with your roadmap", score: 3, feedback: "Excellent! Strategic customer selection is crucial." },
          { text: "Refuse - you have a product vision", score: 2, feedback: "Sometimes flexibility with big customers pays off." }
        ]
      },
      {
        id: 4,
        time: '5:00 PM',
        icon: Trophy,
        situation: "Your co-founder disagrees with your strategy and threatens to quit.",
        question: "What do you do?",
        options: [
          { text: "Tell them it's your way or the highway", score: 0, feedback: "Co-founder relationships require collaboration." },
          { text: "Schedule a proper discussion to align", score: 3, feedback: "Perfect! Address conflicts directly but respectfully." },
          { text: "Give in to avoid conflict", score: 1, feedback: "Avoiding conflict often makes it worse later." }
        ]
      }
    ],
    summary: {
      high: "You have strong entrepreneurial instincts! Your decision-making balances risk and opportunity well.",
      medium: "You show promise as an entrepreneur. Focus on developing negotiation and strategic thinking skills.",
      low: "Entrepreneurship might not suit your style. Consider if you're comfortable with uncertainty and conflict."
    }
  }
};

export default function DayInLifeSimulation({ 
  isOpen, 
  onClose, 
  careerId = 'software_developer' 
}) {
  const [selectedCareer, setSelectedCareer] = useState(careerId);
  const [currentScenario, setCurrentScenario] = useState(-1); // -1 for intro
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const simulation = careerSimulations[selectedCareer];
  const scenario = currentScenario >= 0 ? simulation?.scenarios[currentScenario] : null;

  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const maxScore = simulation ? simulation.scenarios.length * 3 : 0;
  const scorePercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  const handleOptionSelect = (option, index) => {
    setSelectedOption(index);
    setShowFeedback(true);
    setAnswers([...answers, { scenarioId: scenario.id, score: option.score }]);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    
    if (currentScenario < simulation.scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentScenario(-1);
    setAnswers([]);
    setShowResult(false);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleCareerChange = (career) => {
    setSelectedCareer(career);
    handleRestart();
  };

  const getSummary = () => {
    if (scorePercentage >= 75) return simulation.summary.high;
    if (scorePercentage >= 50) return simulation.summary.medium;
    return simulation.summary.low;
  };

  const careers = Object.keys(careerSimulations);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#1e3a5f]">
            <Clock className="w-5 h-5" />
            A Day in the Life: {simulation?.title}
          </DialogTitle>
        </DialogHeader>

        {/* Career Selector */}
        {currentScenario === -1 && !showResult && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {careers.map(career => {
              const sim = careerSimulations[career];
              return (
                <button
                  key={career}
                  onClick={() => handleCareerChange(career)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCareer === career
                      ? 'bg-[#1e3a5f] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{sim.icon}</span>
                  <span className="text-sm font-medium">{sim.title}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Progress */}
        {currentScenario >= 0 && !showResult && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Scenario {currentScenario + 1} of {simulation.scenarios.length}</span>
              <span>{scenario?.time}</span>
            </div>
            <Progress value={((currentScenario + 1) / simulation.scenarios.length) * 100} className="h-2" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* Intro Screen */}
            {currentScenario === -1 && !showResult && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-8"
              >
                <span className="text-6xl mb-4 block">{simulation?.icon}</span>
                <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">
                  A Day as a {simulation?.title}
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {simulation?.intro}
                </p>
                <Button 
                  onClick={() => setCurrentScenario(0)}
                  className="bg-[#1e3a5f] hover:bg-[#2d4a6f]"
                >
                  Start Your Day
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Scenario Screen */}
            {scenario && !showResult && (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    {/* Time Badge */}
                    <Badge className="bg-[#d4a853] text-white mb-4">
                      <Clock className="w-3 h-3 mr-1" />
                      {scenario.time}
                    </Badge>

                    {/* Situation */}
                    <div className="p-4 bg-gray-50 rounded-xl mb-6">
                      <p className="text-gray-700">{scenario.situation}</p>
                    </div>

                    {/* Question */}
                    <h3 className="font-semibold text-[#1e3a5f] mb-4">
                      {scenario.question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3">
                      {scenario.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => !showFeedback && handleOptionSelect(option, idx)}
                          disabled={showFeedback}
                          className={`w-full p-4 rounded-xl text-left transition-all ${
                            showFeedback && selectedOption === idx
                              ? option.score === 3
                                ? 'bg-emerald-100 border-2 border-emerald-500'
                                : option.score === 0
                                ? 'bg-red-100 border-2 border-red-500'
                                : 'bg-amber-100 border-2 border-amber-500'
                              : showFeedback
                              ? 'bg-gray-100 opacity-50'
                              : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm flex items-center justify-center font-medium flex-shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-gray-700">{option.text}</span>
                          </div>
                          
                          {showFeedback && selectedOption === idx && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 pt-3 border-t"
                            >
                              <p className={`text-sm ${
                                option.score === 3 ? 'text-emerald-700' :
                                option.score === 0 ? 'text-red-700' : 'text-amber-700'
                              }`}>
                                {option.feedback}
                              </p>
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    {showFeedback && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 flex justify-end"
                      >
                        <Button onClick={handleNext} className="bg-[#1e3a5f] hover:bg-[#2d4a6f]">
                          {currentScenario < simulation.scenarios.length - 1 ? 'Next Scenario' : 'See Results'}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Results Screen */}
            {showResult && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <Trophy className={`w-16 h-16 mx-auto mb-4 ${
                      scorePercentage >= 75 ? 'text-amber-500' :
                      scorePercentage >= 50 ? 'text-gray-400' : 'text-gray-300'
                    }`} />
                    
                    <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">
                      Day Complete!
                    </h2>
                    
                    <div className="text-5xl font-bold text-[#d4a853] mb-2">
                      {totalScore}/{maxScore}
                    </div>
                    <p className="text-gray-500 mb-6">points earned</p>

                    <div className="w-full max-w-xs mx-auto mb-6">
                      <Progress value={scorePercentage} className="h-3" />
                      <p className="text-sm text-gray-500 mt-1">{Math.round(scorePercentage)}% optimal decisions</p>
                    </div>

                    <div className={`p-4 rounded-xl mb-6 ${
                      scorePercentage >= 75 ? 'bg-emerald-50 border border-emerald-100' :
                      scorePercentage >= 50 ? 'bg-amber-50 border border-amber-100' :
                      'bg-red-50 border border-red-100'
                    }`}>
                      <p className={`text-sm ${
                        scorePercentage >= 75 ? 'text-emerald-700' :
                        scorePercentage >= 50 ? 'text-amber-700' : 'text-red-700'
                      }`}>
                        {getSummary()}
                      </p>
                    </div>

                    <div className="flex gap-3 justify-center">
                      <Button variant="outline" onClick={handleRestart}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Try Again
                      </Button>
                      <Button onClick={onClose} className="bg-[#1e3a5f] hover:bg-[#2d4a6f]">
                        Done
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
