import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, name: 'Academics' },
  { id: 2, name: 'Hobbies' },
  { id: 3, name: 'Personality' },
  { id: 4, name: 'Interests' },
  { id: 5, name: 'Astrology' }
];

export default function ProgressIndicator({ currentStep }) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: currentStep >= step.id ? 1 : 0.8,
                  backgroundColor: currentStep >= step.id ? '#1e3a5f' : '#e5e7eb'
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep > step.id 
                    ? 'bg-[#1e3a5f]' 
                    : currentStep === step.id 
                      ? 'bg-[#1e3a5f] ring-4 ring-[#d4a853]/30' 
                      : 'bg-gray-200'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className={`text-sm font-semibold ${
                    currentStep >= step.id ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.id}
                  </span>
                )}
              </motion.div>
              <span className={`mt-2 text-xs font-medium hidden sm:block ${
                currentStep >= step.id ? 'text-[#1e3a5f]' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-[#d4a853]"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
