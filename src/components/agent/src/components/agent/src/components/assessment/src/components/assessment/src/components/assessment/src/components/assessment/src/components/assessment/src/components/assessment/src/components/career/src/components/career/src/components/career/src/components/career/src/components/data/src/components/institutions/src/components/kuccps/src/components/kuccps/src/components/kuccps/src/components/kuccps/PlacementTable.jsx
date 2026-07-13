import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Building2 } from 'lucide-react';
import { getInstitution } from '@/components/InstitutionDatabase';

const CATEGORY_COLORS = {
  Health: 'text-red-400 bg-red-900/20 border-red-700/30',
  Engineering: 'text-blue-400 bg-blue-900/20 border-blue-700/30',
  Technology: 'text-cyan-400 bg-cyan-900/20 border-cyan-700/30',
  Business: 'text-emerald-400 bg-emerald-900/20 border-emerald-700/30',
  Law: 'text-purple-400 bg-purple-900/20 border-purple-700/30',
  Education: 'text-amber-400 bg-amber-900/20 border-amber-700/30',
  Media: 'text-pink-400 bg-pink-900/20 border-pink-700/30',
  Agriculture: 'text-green-400 bg-green-900/20 border-green-700/30',
  TVET: 'text-orange-400 bg-orange-900/20 border-orange-700/30'
};

export default function PlacementTable({ placements, onSaveInstitution }) {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'eligible'
    ? placements.filter(p => p.eligible)
    : filter === 'not_eligible'
    ? placements.filter(p => !p.eligible)
    : placements;

  return (
    <Card className="border border-[#1e3a5f]/40 bg-[#0d1526]">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 className="text-sm font-semibold text-white">Course Placement Results</h3>
          <div className="flex gap-1.5">
            {[
              { key: 'all', label: 'All' },
              { key: 'eligible', label: 'Eligible' },
              { key: 'not_eligible', label: 'Not Eligible' }
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                  filter === f.key
                    ? 'bg-[#d4a853] text-[#0a0f1e] border-[#d4a853]'
                    : 'bg-[#0a0f1e] text-slate-400 border-[#1e3a5f]/50 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filtered.map((course) => {
            const isExpanded = expanded === course.id;
            const categoryClass = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.TVET;
            return (
              <div
                key={course.id}
                className={`rounded-xl border transition-colors ${
                  course.eligible
                    ? 'border-emerald-700/30 bg-emerald-900/5'
                    : 'border-[#1e3a5f]/30 bg-[#0a0f1e]'
                }`}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : course.id)}
                  className="w-full flex items-center gap-3 p-3 text-left"
                >
                  {course.eligible ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{course.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className={`text-xs border ${categoryClass}`}>
                        {course.category}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        Min: {course.min_points} pts
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-lg font-bold ${course.eligible ? 'text-[#d4a853]' : 'text-slate-500'}`}>
                      {course.match_score}%
                    </p>
                    <p className="text-xs text-slate-500">{course.cluster_score} pts</p>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-[#0d1526] rounded-lg p-2 border border-[#1e3a5f]/30">
                        <p className="text-slate-500">Cluster Score</p>
                        <p className="text-white font-semibold">{course.cluster_score}/48</p>
                      </div>
                      <div className="bg-[#0d1526] rounded-lg p-2 border border-[#1e3a5f]/30">
                        <p className="text-slate-500">Required</p>
                        <p className="text-white font-semibold">{course.min_points}/48</p>
                      </div>
                      <div className={`rounded-lg p-2 border ${course.margin >= 0 ? 'bg-emerald-900/10 border-emerald-700/20' : 'bg-red-900/10 border-red-700/20'}`}>
                        <p className="text-slate-500">Margin</p>
                        <p className={`font-semibold ${course.margin >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {course.margin >= 0 ? '+' : ''}{course.margin}
                        </p>
                      </div>
                    </div>

                    {course.institutions.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-400 mb-1.5 flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> Offering Institutions
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {course.institutions.map(instId => {
                            const inst = getInstitution(instId);
                            return inst ? (
                              <span key={instId} className="text-xs px-2 py-1 rounded-lg bg-[#0d1526] border border-[#1e3a5f]/40 text-slate-300">
                                {inst.shortName}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {course.eligible && onSaveInstitution && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSaveInstitution(course)}
                        className="w-full border-[#d4a853]/30 text-[#d4a853] hover:bg-[#d4a853]/10"
                      >
                        Save Top Institution
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No courses in this filter
          </div>
        )}
      </CardContent>
    </Card>
  );
}
