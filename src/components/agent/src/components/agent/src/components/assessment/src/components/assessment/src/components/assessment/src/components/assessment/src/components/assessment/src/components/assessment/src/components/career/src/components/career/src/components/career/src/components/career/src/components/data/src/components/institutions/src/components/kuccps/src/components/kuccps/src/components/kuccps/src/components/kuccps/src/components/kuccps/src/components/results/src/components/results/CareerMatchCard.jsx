import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronDown, ChevronUp, GraduationCap, Building2,
  CheckCircle, AlertCircle, TrendingUp, Star, ExternalLink,
  BookmarkPlus, Bookmark, MapPin, Info, Brain, Heart
} from 'lucide-react';
import { getInstitution } from '../InstitutionDatabase';
import CompatibilityGauge from './CompatibilityGauge';

export default function CareerMatchCard({
  career,
  rank,
  isExpanded,
  onToggle,
  onViewInstitution,
  savedInstitutions = [],
  onSaveInstitution
}) {
  const score = career.matchScore;

  const scoreLabel = score >= 80 ? 'Excellent Fit' : score >= 65 ? 'Good Fit' : score >= 50 ? 'Possible Fit' : 'Low Fit';
  const scoreLabelColor = score >= 80 ? 'text-emerald-400' : score >= 65 ? 'text-[#d4a853]' : score >= 50 ? 'text-blue-400' : 'text-slate-400';

  // Extract personality & interest scores from breakdown
  const personalityItem = career.breakdown?.find(b => b.factor.startsWith('Personality'));
  const interestItem = career.breakdown?.find(b => b.factor.startsWith('Interests'));
  const personalityScore = personalityItem?.score ?? 0;
  const interestScore = interestItem?.score ?? 0;

  const getBarColor = (s) => s >= 80 ? 'bg-emerald-500' : s >= 60 ? 'bg-[#d4a853]' : 'bg-slate-500';

  const isInstitutionSaved = (uniName) => savedInstitutions.some((s) => s.institution_name === uniName);

  const getInstitutionId = (uniName) => {
    const nameMap = {
      'University of Nairobi': 'uon', 'JKUAT': 'jkuat',
      'Jomo Kenyatta University of Agriculture and Technology': 'jkuat',
      'Kenyatta University': 'ku', 'Moi University': 'moi',
      'Technical University of Kenya': 'tuk', 'TUK': 'tuk',
      'Egerton University': 'egerton', 'Maseno University': 'maseno',
      'Strathmore University': 'strathmore', 'USIU': 'usiu',
      'United States International University': 'usiu', 'USIU-Africa': 'usiu',
      'KCA University': 'kca', 'KCAU': 'kca',
      'Mount Kenya University': 'mku', 'Daystar University': 'daystar',
      'Riara University': 'riara', 'Zetech University': 'zetech',
      'KMTC': 'kmtc', 'Kenya Medical Training College': 'kmtc',
      'Kenya National Polytechnic': 'knp', 'Nyeri National Polytechnic': 'nyeri',
      'Kisumu National Polytechnic': 'kisumu', 'Eldoret National Polytechnic': 'eldoret',
      'Mombasa Technical Training Institute': 'mombasa', 'MTTI': 'mombasa',
      'Kenya Institute of Mass Communication': 'kimc', 'KIMC': 'kimc',
      'Bukura Agricultural College': 'bukura', 'Kenya School of Revenue Administration': 'ksr',
      'KESRA': 'ksr', 'NITA': 'nita', 'National Industrial Training Authority': 'nita',
      'KTTC': 'knp', 'Teachers Training College': 'ku',
      'Kenya School of Revenue': 'ksr', 'Youth Enterprise Fund': 'nita',
      'Buru Buru Institute': 'knp'
    };
    return nameMap[uniName] || null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}>

      <Card className={`overflow-hidden bg-[#0d1526] border transition-all duration-300 ${
        isExpanded
          ? 'border-[#d4a853]/40 shadow-xl shadow-[#d4a853]/5'
          : 'border-[#1e3a5f]/40 hover:border-[#d4a853]/20 hover:shadow-lg'
      }`}>
        <CardContent className="p-0">
          {/* Header */}
          <button
            onClick={onToggle}
            className="w-full p-5 flex items-center gap-4 text-left hover:bg-[#1e3a5f]/10 transition-colors">

            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-[#1e3a5f]/40 border border-[#1e3a5f]/60">
              {career.icon}
            </div>

            {/* Title & Field */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {rank <= 3 && (
                  <Badge className="bg-[#d4a853] text-[#0a0f1e] text-xs font-bold">
                    #{rank} Match
                  </Badge>
                )}
                <h3 className="font-bold text-white truncate">{career.title}</h3>
              </div>
              <p className="text-sm text-slate-400 truncate">{career.field}</p>

              {/* Mini personality + interest pills */}
              <div className="flex gap-2 mt-2">
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-purple-900/40 border border-purple-700/30 text-purple-300">
                  <Brain className="w-3 h-3" />
                  Personality {personalityScore}%
                </span>
                <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-rose-900/40 border border-rose-700/30 text-rose-300">
                  <Heart className="w-3 h-3" />
                  Interest {interestScore}%
                </span>
              </div>
            </div>

            {/* Gauge + chevron */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-0.5">
                <CompatibilityGauge score={score} size={68} />
                <span className={`text-xs font-medium ${scoreLabelColor}`}>{scoreLabel}</span>
              </div>
              {isExpanded
                ? <ChevronUp className="w-5 h-5 text-slate-400" />
                : <ChevronDown className="w-5 h-5 text-slate-400" />
              }
            </div>
          </button>

          {/* Expanded Content */}
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-[#1e3a5f]/40">

              <div className="p-5 space-y-5">

                {/* Compatibility Score Panel */}
                <div className="rounded-xl border border-[#1e3a5f]/40 bg-[#0a0f1e] p-4">
                  <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#d4a853]" />
                    Compatibility Score Breakdown
                  </h4>

                  {/* Personality & Interest highlighted */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-700/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-300">Personality Fit</span>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-purple-300">{personalityScore}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-purple-900/60">
                        <div
                          className="h-2 rounded-full bg-purple-400 transition-all duration-700"
                          style={{ width: `${personalityScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-purple-400/70 mt-1">
                        {personalityScore >= 80 ? 'Excellent personality alignment' :
                         personalityScore >= 60 ? 'Good work-style match' :
                         personalityScore >= 40 ? 'Partial fit — adaptable' : 'Different working style'}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-rose-900/20 border border-rose-700/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-rose-400" />
                        <span className="text-sm font-medium text-rose-300">Interest Alignment</span>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-rose-300">{interestScore}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-rose-900/60">
                        <div
                          className="h-2 rounded-full bg-rose-400 transition-all duration-700"
                          style={{ width: `${interestScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-rose-400/70 mt-1">
                        {interestScore >= 80 ? 'Strongly matches your passions' :
                         interestScore >= 60 ? 'Aligns with your interests' :
                         interestScore >= 40 ? 'Some interest overlap' : 'Different from stated interests'}
                      </p>
                    </div>
                  </div>

                  {/* All factors */}
                  <div className="space-y-2">
                    {career.breakdown.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{item.factor}</span>
                          <span className="font-semibold text-white">{item.score}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#1e3a5f]/50">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-700 ${getBarColor(item.score)}`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why This Career */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-700/30">
                    <h5 className="font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Why It Suits You
                    </h5>
                    <ul className="space-y-1">
                      {career.whyFits.map((reason, idx) => (
                        <li key={idx} className="text-sm text-emerald-300 flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-900/20 border border-amber-700/30">
                    <h5 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Potential Challenges
                    </h5>
                    <ul className="space-y-1">
                      {career.challenges.map((challenge, idx) => (
                        <li key={idx} className="text-sm text-amber-300 flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Requirements */}
                <div className="p-4 rounded-xl bg-[#1e3a5f]/20 border border-[#1e3a5f]/40">
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#d4a853]" />
                    Academic Requirements
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {career.requirements.map((req, idx) => (
                      <Badge key={idx} variant="outline" className="border-[#1e3a5f] text-slate-300 bg-[#0a0f1e]">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Universities */}
                <div>
                  <h5 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#d4a853]" />
                    Recommended Institutions in Kenya
                    <Badge variant="secondary" className="ml-auto text-xs bg-[#1e3a5f] text-slate-300">
                      Click for details
                    </Badge>
                  </h5>
                  <div className="grid md:grid-cols-2 gap-3">
                    {career.universities.map((uni, idx) => {
                      const institutionId = getInstitutionId(uni.name);
                      const institutionData = institutionId ? getInstitution(institutionId) : null;
                      const isSaved = isInstitutionSaved(uni.name);

                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-[#0a0f1e] border border-[#1e3a5f]/40 hover:border-[#d4a853]/40 hover:shadow-md transition-all cursor-pointer group"
                          onClick={() => institutionId && onViewInstitution(institutionId, uni.program)}>

                          <div className="flex items-start gap-3">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                              uni.type === 'public' ? 'bg-blue-900/40 text-blue-400' :
                              uni.type === 'private' ? 'bg-purple-900/40 text-purple-400' :
                              'bg-emerald-900/40 text-emerald-400'
                            }`}>
                              {institutionData?.logo || uni.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <p className="font-medium text-white text-sm group-hover:text-[#d4a853] transition-colors">
                                  {uni.name}
                                </p>
                                {institutionId && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 -mt-1 -mr-1"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onSaveInstitution(institutionId, uni.name, uni.program, career.title);
                                    }}>
                                    {isSaved
                                      ? <Bookmark className="w-4 h-4 text-[#d4a853] fill-current" />
                                      : <BookmarkPlus className="w-4 h-4 text-slate-400 hover:text-[#d4a853]" />
                                    }
                                  </Button>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5">{uni.program}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className={`text-xs ${
                                  uni.type === 'public' ? 'bg-blue-900/30 text-blue-400' :
                                  uni.type === 'private' ? 'bg-purple-900/30 text-purple-400' :
                                  'bg-emerald-900/30 text-emerald-400'
                                }`}>
                                  Min: {uni.cutoff}
                                </Badge>
                                {institutionData && (
                                  <span className="text-xs text-slate-500 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {institutionData.location.split(',')[0]}
                                  </span>
                                )}
                              </div>
                              {institutionId && (
                                <div className="flex items-center gap-1 mt-2 text-xs text-[#d4a853] opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Info className="w-3 h-3" />
                                  Click for campus info, scholarships & more
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Alternative Path */}
                {career.alternativePath && (
                  <div className="p-4 rounded-xl bg-indigo-900/20 border border-indigo-700/30">
                    <h5 className="font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Alternative Pathway
                    </h5>
                    <p className="text-sm text-indigo-300">{career.alternativePath}</p>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
