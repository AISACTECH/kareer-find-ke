import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, ArrowRight, ArrowLeft, Heart, Meh, X } from 'lucide-react';

const interestCategories = [
  {
    id: 'technology',
    name: 'Technology & Computing',
    icon: '💻',
    description: 'Software, hardware, AI, cybersecurity, data science',
    examples: ['Software Developer', 'Data Analyst', 'IT Support', 'Cybersecurity Expert']
  },
  {
    id: 'business',
    name: 'Business & Finance',
    icon: '📊',
    description: 'Entrepreneurship, accounting, marketing, management',
    examples: ['Accountant', 'Marketing Manager', 'Entrepreneur', 'Financial Analyst']
  },
  {
    id: 'health',
    name: 'Health & Medicine',
    icon: '🏥',
    description: 'Doctors, nurses, pharmacy, public health',
    examples: ['Doctor', 'Nurse', 'Pharmacist', 'Lab Technician']
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Environment',
    icon: '🌾',
    description: 'Farming, agribusiness, conservation, veterinary',
    examples: ['Agronomist', 'Veterinarian', 'Environmental Scientist', 'Farm Manager']
  },
  {
    id: 'creative',
    name: 'Creative Arts & Media',
    icon: '🎨',
    description: 'Design, film, music, journalism, photography',
    examples: ['Graphic Designer', 'Journalist', 'Architect', 'Film Producer']
  },
  {
    id: 'engineering',
    name: 'Engineering & Construction',
    icon: '🔧',
    description: 'Civil, mechanical, electrical, construction',
    examples: ['Civil Engineer', 'Mechanical Engineer', 'Electrician', 'Surveyor']
  },
  {
    id: 'public_service',
    name: 'Public Service & Law',
    icon: '⚖️',
    description: 'Government, law, diplomacy, social work',
    examples: ['Lawyer', 'Police Officer', 'Social Worker', 'Diplomat']
  },
  {
    id: 'education',
    name: 'Education & Research',
    icon: '📚',
    description: 'Teaching, training, academic research',
    examples: ['Teacher', 'University Lecturer', 'Researcher', 'Education Officer']
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    icon: '✈️',
    description: 'Hotels, travel, events, food service',
    examples: ['Hotel Manager', 'Tour Guide', 'Chef', 'Event Planner']
  }
];

const ratingOptions = [
  { value: 'love', label: 'Love it', icon: Heart, color: 'text-red-500 bg-red-50 border-red-200', emoji: '❤️' },
  { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-amber-500 bg-amber-50 border-amber-200', emoji: '😐' },
  { value: 'avoid', label: 'Avoid', icon: X, color: 'text-gray-500 bg-gray-50 border-gray-200', emoji: '🚫' }
];

export default function InterestsStep({ data, onUpdate, onNext, onBack }) {
  const [interestData, setInterestData] = useState(data || {
    ratings: {}
  });

  const handleRating = (categoryId, rating) => {
    setInterestData(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [categoryId]: rating }
    }));
  };

  const handleNext = () => {
    onUpdate(interestData);
    onNext();
  };

  const ratedCount = Object.keys(interestData.ratings).length;
  const isValid = ratedCount >= 5;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
          <Compass className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Interest Profiling</h2>
        <p className="text-gray-600">Rate each career field based on your interest level</p>
        <p className="text-sm text-gray-400 mt-1">Rate at least 5 categories • {ratedCount}/{interestCategories.length} rated</p>
      </div>

      <div className="grid gap-4">
        {interestCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`border-2 transition-all ${
              interestData.ratings[category.id] 
                ? 'border-[#d4a853]/50 shadow-md' 
                : 'border-gray-100 shadow-sm'
            }`}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Category Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold text-[#1e3a5f]">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-12">
                      {category.examples.map(ex => (
                        <span key={ex} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating Buttons */}
                  <div className="flex gap-2 md:ml-4">
                    {ratingOptions.map(option => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRating(category.id, option.value)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 min-w-[70px] transition-all ${
                          interestData.ratings[category.id] === option.value
                            ? option.color + ' border-current'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl mb-1">{option.emoji}</span>
                        <span className="text-xs font-medium">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="sticky bottom-4 mt-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={onBack}
            className="px-6 h-12 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-sm text-gray-500">
            {isValid ? '✅ Ready to continue' : `Rate ${5 - ratedCount} more categories`}
          </div>
          <Button 
            onClick={handleNext}
            disabled={!isValid}
            className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white px-8 h-12 rounded-xl"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
