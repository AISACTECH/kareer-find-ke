import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Scale, Info } from 'lucide-react';

const WEIGHT_LABELS = {
  cluster_points: { label: 'Cluster Points', desc: 'Weight given to calculated cluster subject scores' },
  subject_relevance: { label: 'Subject Relevance', desc: 'How closely subjects match course requirements' },
  mean_grade: { label: 'Mean Grade', desc: 'Overall KCSE performance' },
  course_preference: { label: 'Course Preference', desc: 'Bonus for student preferred career category' }
};

export default function WeightAdjuster({ weights, onChange, onRun, loading, totalWeight }) {
  const isWeightValid = Math.abs(totalWeight - 1) < 0.01;
  return (
    <Card className="border border-[#1e3a5f]/40 bg-[#0d1526] shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <Scale className="w-5 h-5 text-[#d4a853]" />
          <h3 className="font-semibold text-white text-base">Placement Weights</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">Adjust how each factor influences placement scoring</p>

        <div className={`flex items-center gap-2 mb-4 p-2.5 rounded-lg ${isWeightValid ? 'bg-emerald-900/20 border border-emerald-700/30' : 'bg-red-900/20 border border-red-700/30'}`}>
          <Info className="w-4 h-4 flex-shrink-0" />
          <span className={`text-xs font-medium ${isWeightValid ? 'text-emerald-400' : 'text-red-400'}`}>
            Total Weight: <strong>{totalWeight.toFixed(2)}</strong> {isWeightValid ? '✓' : '(must = 1.0)'}
          </span>
        </div>

        <div className="space-y-4">
          {Object.keys(weights).map(key => {
            const info = WEIGHT_LABELS[key] || { label: key, desc: '' };
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-slate-200">{info.label}</label>
                  <Badge variant="outline" className="text-[#d4a853] border-[#d4a853]/30 text-xs">
                    {(weights[key] * 100).toFixed(0)}%
                  </Badge>
                </div>
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={[weights[key]]}
                  onValueChange={(val) => onChange(key, val[0])}
                  className="mb-1"
                />
                <p className="text-xs text-slate-500">{info.desc}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={onRun}
          disabled={loading || !isWeightValid}
          className="w-full mt-5 bg-[#d4a853] hover:bg-[#c49843] disabled:bg-slate-700 disabled:text-slate-500 text-[#0a0f1e] font-semibold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0a0f1e] border-t-transparent rounded-full animate-spin" />
              Calculating...
            </>
          ) : (
            <>Run Cluster Point Filter</>
          )}
        </button>
      </CardContent>
    </Card>
  );
}
