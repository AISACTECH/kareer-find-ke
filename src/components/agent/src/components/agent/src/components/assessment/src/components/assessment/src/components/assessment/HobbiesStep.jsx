import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, ArrowRight, ArrowLeft, Home } from 'lucide-react';

const hobbies = [
  { id: 'fixing', label: 'Fixing machines & gadgets', icon: '🔧', category: 'practical' },
  { id: 'drawing', label: 'Drawing & designing', icon: '🎨', category: 'creative' },
  { id: 'debating', label: 'Debating & public speaking', icon: '🎤', category: 'social' },
  { id: 'farming', label: 'Farming & gardening', icon: '🌱', category: 'nature' },
  { id: 'coding', label: 'Coding & computers', icon: '💻', category: 'tech' },
  { id: 'helping', label: 'Helping & mentoring others', icon: '🤝', category: 'social' },
  { id: 'reading', label: 'Reading & research', icon: '📚', category: 'academic' },
  { id: 'sports', label: 'Sports & fitness', icon: '⚽', category: 'physical' },
  { id: 'music', label: 'Music & performing', icon: '🎵', category: 'creative' },
  { id: 'cooking', label: 'Cooking & food', icon: '👨‍🍳', category: 'practical' },
  { id: 'business', label: 'Buying & selling things', icon: '💰', category: 'business' },
  { id: 'writing', label: 'Writing stories or articles', icon: '✍️', category: 'creative' },
  { id: 'photography', label: 'Photography & video', icon: '📷', category: 'creative' },
  { id: 'organizing', label: 'Planning & organizing events', icon: '📋', category: 'leadership' }
];

const backgroundOptions = [
  { id: 'location', label: 'Where did you grow up?', options: ['Urban/City', 'Suburban/Town', 'Rural/Village'] },
  { id: 'familyBusiness', label: 'Does your family run any business?', options: ['Yes, related to farming', 'Yes, retail/shop', 'Yes, professional services', 'Yes, other business', 'No family business'] },
  { id: 'computerAccess', label: 'Do you have regular access to a computer?', options: ['Yes, at home', 'Yes, at school/cafe', 'Limited access', 'No access'] },
  { id: 'workshopAccess', label: 'Do you have access to tools/workshop?', options: ['Yes, full workshop', 'Basic tools only', 'No access'] }
];

export default function HobbiesStep({ data, onUpdate, onNext, onBack }) {
  const [hobbiesData, setHobbiesData] = useState(data || {
    selectedHobbies: [],
    background: {}
  });

  const toggleHobby = (hobbyId) => {
    setHobbiesData(prev => ({
      ...prev,
      selectedHobbies: prev.selectedHobbies.includes(hobbyId)
        ? prev.selectedHobbies.filter(h => h !== hobbyId)
        : [...prev.selectedHobbies, hobbyId]
    }));
  };

  const handleBackgroundChange = (optionId, value) => {
    setHobbiesData(prev => ({
      ...prev,
      background: { ...prev.background, [optionId]: value }
    }));
  };

  const handleNext = () => {
    onUpdate(hobbiesData);
    onNext();
  };

  const isValid = hobbiesData.selectedHobbies.length >= 2 && 
    Object.keys(hobbiesData.background).length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d4a853]/20 mb-4">
          <Heart className="w-8 h-8 text-[#d4a853]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Hobbies & Background</h2>
        <p className="text-gray-600">What do you enjoy doing? This helps us understand your natural talents.</p>
      </div>

      <Card className="border-0 shadow-lg mb-6">
        <CardContent className="p-6">
          <Label className="text-sm font-medium text-gray-700 mb-4 block">
            Select hobbies you enjoy (at least 2)
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {hobbies.map(hobby => (
              <motion.button
                key={hobby.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleHobby(hobby.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  hobbiesData.selectedHobbies.includes(hobby.id)
                    ? 'border-[#1e3a5f] bg-[#1e3a5f]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{hobby.icon}</span>
                  <span className="text-sm font-medium text-gray-700 leading-tight">
                    {hobby.label}
                  </span>
                </div>
                {hobbiesData.selectedHobbies.includes(hobby.id) && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-[#1e3a5f] rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Home className="w-5 h-5 text-[#1e3a5f]" />
            <Label className="text-sm font-medium text-gray-700">
              Your Background
            </Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {backgroundOptions.map(option => (
              <div key={option.id}>
                <Label className="text-sm text-gray-600 mb-2 block">{option.label}</Label>
                <Select 
                  value={hobbiesData.background[option.id] || ''} 
                  onValueChange={(value) => handleBackgroundChange(option.id, value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {option.options.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
