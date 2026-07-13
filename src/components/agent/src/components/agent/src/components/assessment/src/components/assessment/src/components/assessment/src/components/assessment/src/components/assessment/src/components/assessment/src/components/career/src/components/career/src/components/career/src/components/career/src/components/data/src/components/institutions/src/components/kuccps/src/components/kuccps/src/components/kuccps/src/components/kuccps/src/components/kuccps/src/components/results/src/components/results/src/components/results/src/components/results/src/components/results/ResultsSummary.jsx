import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, GraduationCap, Heart, Brain, Compass, Star } from 'lucide-react';

export default function ResultsSummary({ studentName, assessmentSummary }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-[#1e3a5f] to-[#2d4a6f] text-white overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-8 h-8 text-[#d4a853]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{studentName}</h2>
                <p className="text-white/70">Career Assessment Results</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <GraduationCap className="w-5 h-5 mx-auto mb-1 text-[#d4a853]" />
                <p className="text-xs text-white/70">Mean Grade</p>
                <p className="font-bold">{assessmentSummary.meanGrade || 'N/A'}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Heart className="w-5 h-5 mx-auto mb-1 text-red-400" />
                <p className="text-xs text-white/70">Top Interest</p>
                <p className="font-bold text-sm truncate">{assessmentSummary.topInterest || 'N/A'}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Brain className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                <p className="text-xs text-white/70">Work Style</p>
                <p className="font-bold text-sm truncate">{assessmentSummary.workStyle || 'N/A'}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Compass className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <p className="text-xs text-white/70">Hobbies</p>
                <p className="font-bold text-sm truncate">{assessmentSummary.topHobby || 'N/A'}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <Star className="w-5 h-5 mx-auto mb-1 text-indigo-400" />
                <p className="text-xs text-white/70">Zodiac</p>
                <p className="font-bold">{assessmentSummary.zodiac || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm text-white/70 mb-2">Your Key Strengths:</p>
            <div className="flex flex-wrap gap-2">
              {assessmentSummary.strengths?.map((strength, idx) => (
                <Badge key={idx} className="bg-[#d4a853] text-[#1e3a5f] hover:bg-[#d4a853]">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
