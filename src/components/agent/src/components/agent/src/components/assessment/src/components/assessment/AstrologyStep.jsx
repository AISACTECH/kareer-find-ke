import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const zodiacSigns = [
  { sign: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire', traits: 'Leadership, initiative, courage' },
  { sign: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth', traits: 'Reliability, patience, practicality' },
  { sign: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air', traits: 'Adaptability, communication, curiosity' },
  { sign: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water', traits: 'Nurturing, intuition, loyalty' },
  { sign: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire', traits: 'Creativity, confidence, leadership' },
  { sign: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth', traits: 'Analysis, precision, service' },
  { sign: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air', traits: 'Balance, diplomacy, partnership' },
  { sign: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water', traits: 'Intensity, research, transformation' },
  { sign: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire', traits: 'Adventure, philosophy, optimism' },
  { sign: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth', traits: 'Ambition, discipline, management' },
  { sign: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air', traits: 'Innovation, independence, humanitarian' },
  { sign: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water', traits: 'Creativity, empathy, intuition' }
];

const getZodiacSign = (month, day) => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  return null;
};

export default function AstrologyStep({ data, onUpdate, onNext, onBack }) {
  const [astrologyData, setAstrologyData] = useState(data || {
    birthDate: '',
    zodiacSign: null
  });

  useEffect(() => {
    if (astrologyData.birthDate) {
      const date = new Date(astrologyData.birthDate);
      const sign = getZodiacSign(date.getMonth() + 1, date.getDate());
      setAstrologyData(prev => ({ ...prev, zodiacSign: sign }));
    }
  }, [astrologyData.birthDate]);

  const handleNext = () => {
    onUpdate(astrologyData);
    onNext();
  };

  const currentSign = astrologyData.zodiacSign 
    ? zodiacSigns.find(z => z.sign === astrologyData.zodiacSign)
    : null;

  const isValid = astrologyData.birthDate && astrologyData.zodiacSign;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
          <Star className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Astrology Insights</h2>
        <p className="text-gray-600">A supporting factor in understanding your work preferences</p>
      </div>

      <Alert className="mb-6 border-amber-200 bg-amber-50">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Note:</strong> Astrology accounts for only 5% of your career match. 
          Academic performance, interests, and skills remain the primary factors in our recommendations.
        </AlertDescription>
      </Alert>

      <Card className="border-0 shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="max-w-md mx-auto">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Your Date of Birth
            </Label>
            <Input
              type="date"
              value={astrologyData.birthDate}
              onChange={(e) => setAstrologyData(prev => ({ ...prev, birthDate: e.target.value }))}
              className="h-12 text-lg"
            />
          </div>

          {currentSign && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
                <span className="text-6xl mb-4 block">{currentSign.symbol}</span>
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-1">{currentSign.sign}</h3>
                <p className="text-gray-500 text-sm mb-4">{currentSign.dates}</p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-4">
                  <span className="text-sm font-medium text-gray-600">Element:</span>
                  <span className={`font-semibold ${
                    currentSign.element === 'Fire' ? 'text-orange-500' :
                    currentSign.element === 'Earth' ? 'text-green-600' :
                    currentSign.element === 'Air' ? 'text-sky-500' :
                    'text-blue-500'
                  }`}>{currentSign.element}</span>
                </div>
                
                <p className="text-gray-600">
                  <span className="font-medium">Key traits:</span> {currentSign.traits}
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Zodiac Reference */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-semibold text-[#1e3a5f] mb-4">All Zodiac Signs</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {zodiacSigns.map(sign => (
              <div 
                key={sign.sign}
                className={`p-3 rounded-xl text-center transition-all ${
                  astrologyData.zodiacSign === sign.sign
                    ? 'bg-indigo-100 border-2 border-indigo-300'
                    : 'bg-gray-50 border-2 border-transparent'
                }`}
              >
                <span className="text-2xl block mb-1">{sign.symbol}</span>
                <span className="text-xs font-medium text-gray-700">{sign.sign}</span>
                <span className="text-xs text-gray-400 block">{sign.dates}</span>
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
              Get My Results
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
